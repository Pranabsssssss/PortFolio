"use client";

import React, { useEffect, useRef, useState } from "react";

// Full-screen WebGL shader background
// No particles, no geometry — just a single fragment shader creating
// smooth, living visuals directly on the GPU.

const VERTEX = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  // ─── Noise functions ───────────────────────────────
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 perm(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float noise(vec3 p) {
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0/41.0));
    vec4 o2 = fract(k4 * (1.0/41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // ─── Main ──────────────────────────────────────────
  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = (gl_FragCoord.xy - uResolution.xy * 0.5) / min(uResolution.x, uResolution.y);

    float t = uTime * 0.08;
    float scroll = uScroll * 0.0003;

    // Mouse influence (normalized)
    vec2 mouse = uMouse / uResolution.xy;
    mouse = mouse * 2.0 - 1.0;

    // Domain warping: fbm of fbm for complex organic shapes
    vec3 q = vec3(p * 1.8, t + scroll);
    float f1 = fbm(q + vec3(1.7, 9.2, 0.0));
    float f2 = fbm(q + vec3(8.3, 2.8, 0.0) + mouse.x * 0.3);

    // Second layer of warping
    vec3 r = vec3(p * 1.8, t * 0.7 + scroll * 0.5);
    float f3 = fbm(r + 4.0 * vec3(f1, f2, f1 * f2));

    // Mouse proximity creates additional distortion
    float mouseDist = length(p - mouse * 0.5);
    float mouseWarp = smoothstep(0.8, 0.0, mouseDist) * 0.3;
    f3 += mouseWarp * fbm(q * 3.0 + t);

    // Base color: exact match to site CSS --background: #09090b
    vec3 baseBg = vec3(0.035, 0.035, 0.043);
    vec3 color = baseBg;

    // Layer 1: deep purple nebula regions
    color = mix(color, vec3(0.08, 0.03, 0.14), smoothstep(0.15, 0.55, f3));

    // Layer 2: blue undertone in different noise zones
    color = mix(color, vec3(0.04, 0.05, 0.14), smoothstep(0.3, 0.65, f1 * f3));

    // Layer 3: brighter purple peaks — subtle, not glowing
    color = mix(color, vec3(0.16, 0.06, 0.28), smoothstep(0.5, 0.85, f3 * f3));

    // Layer 4: cyan accent near mouse — very subtle shift
    float cyanMask = smoothstep(0.55, 0.9, f3) * smoothstep(1.0, 0.0, mouseDist);
    color = mix(color, vec3(0.05, 0.12, 0.20), cyanMask * 0.5);

    // Vignette — push edges back to pure base color
    float vignette = 1.0 - length(uv - 0.5) * 1.0;
    vignette = smoothstep(0.0, 0.65, vignette);
    color = mix(baseBg, color, vignette);

    // Final output — already dark, no global multiplier needed
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile: touch device or narrow viewport
    const checkMobile = () => {
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const narrow = window.innerWidth < 768;
      setIsMobile(touch || narrow);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip WebGL on mobile
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    // ─── Compile shaders ─────────────────────────────
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full-screen quad
    const vertices = new Float32Array([-1,-1,  1,-1,  -1,1,  1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "uTime");
    const uRes = gl.getUniformLocation(program, "uResolution");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uScroll = gl.getUniformLocation(program, "uScroll");

    let mouseX = 0, mouseY = 0;
    let scrollY = 0;
    let raf: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onScroll = () => { scrollY = window.scrollY; };

    const startTime = performance.now();

    const render = () => {
      const t = (performance.now() - startTime) / 1000;
      
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseX * (canvas.width / parseFloat(canvas.style.width)), 
                           canvas.height - mouseY * (canvas.height / parseFloat(canvas.style.height)));
      gl.uniform1f(uScroll, scrollY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [isMobile]);

  // ─── Mobile: static CSS fallback (no WebGL, no battery drain) ───
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[-1]" style={{ background: '#09090b' }}>
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(124,58,237,0.08), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 70% 60%, rgba(99,102,241,0.06), transparent 60%)',
          }}
        />
      </div>
    );
  }

  // ─── Desktop: full WebGL shader ────────────────────────────────
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}
