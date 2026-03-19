"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SiMongodb, SiExpress, SiReact, SiNodedotjs, SiFlask, SiDjango, SiNextdotjs, 
  SiHtml5, SiCss, SiJavascript, SiPython, SiOpenai, 
  SiLinux, SiAndroid, SiGit, SiGithub, SiVercel, SiPostman, 
  SiBlender, SiUnity, SiVite, SiObsstudio, SiVmware, SiFigma,
  SiFirebase, SiArduino, SiLangchain, SiTailwindcss, SiFramer, SiThreedotjs, 
  SiPostgresql, SiRedis, SiMysql, SiSqlite, SiGooglecloud, SiKubernetes, 
  SiNetlify, SiPhp, SiGo, SiSolidity, SiCplusplus, SiTypescript,
  SiTerraform, SiAnsible, SiDocker, SiNginx, SiCloudflare, 
  SiGraphql, SiNestjs, SiVuedotjs, SiSvelte, SiAngular, SiLaravel, SiRubyonrails,
  SiRust, SiWebassembly, SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy,
  SiDavinciresolve, SiAudacity,
  SiIntellijidea, SiVim, SiJira, SiSlack, SiNotion,
  SiWireshark, SiMetasploit, SiApple, SiRaspberrypi,
  SiSolid, SiRemix, SiPreact,
  SiKeras, SiScipy, SiHuggingface, SiAnthropic,
  SiCircleci, SiGitlab, SiHeroku, SiDigitalocean,
  SiZsh, SiWireguard, SiOpenvpn, SiAutodesk, SiFfmpeg, SiKdenlive
} from "react-icons/si";
import { 
  FiGlobe, FiZap, FiImage, FiSearch, 
  FiTarget, FiCpu, FiGrid, FiVideo, FiBox, FiAward, FiActivity, 
  FiFeather, FiMessageCircle, FiTv, FiClock, FiRotateCw,
  FiList, FiGrid as FiGridIcon, FiCode, FiDatabase, FiCloud, FiLayers, FiLink,
  FiTerminal, FiShield, FiWifi, FiServer, FiLock, FiSettings, FiBriefcase,
  FiLayout, FiEdit, FiMonitor
} from "react-icons/fi";

const STATUS = {
    OPERATIONAL: "operational",
    SYNCING: "syncing",
    DORMANT: "dormant"
};

const skillMatrix = [
    // --- ARCHITECTURAL (WEB & DEV) ---
    { name: "Next.js", icon: SiNextdotjs, sector: "Architectural", status: STATUS.OPERATIONAL, level: 95 },
    { name: "React", icon: SiReact, sector: "Architectural", status: STATUS.OPERATIONAL, level: 98 },
    { name: "Node.js", icon: SiNodedotjs, sector: "Architectural", status: STATUS.OPERATIONAL, level: 92 },
    { name: "TypeScript", icon: SiTypescript, sector: "Architectural", status: STATUS.OPERATIONAL, level: 94 },
    { name: "Tailwind", icon: SiTailwindcss, sector: "Architectural", status: STATUS.OPERATIONAL, level: 98 },
    { name: "GraphQL", icon: SiGraphql, sector: "Architectural", status: STATUS.SYNCING, level: 80 },
    { name: "NestJS", icon: SiNestjs, sector: "Architectural", status: STATUS.OPERATIONAL, level: 85 },
    { name: "Vue.js", icon: SiVuedotjs, sector: "Architectural", status: STATUS.DORMANT, level: 82 },
    { name: "Svelte", icon: SiSvelte, sector: "Architectural", status: STATUS.SYNCING, level: 70 },
    { name: "Laravel", icon: SiLaravel, sector: "Architectural", status: STATUS.DORMANT, level: 88 },
    { name: "Express", icon: SiExpress, sector: "Architectural", status: STATUS.OPERATIONAL, level: 92 },
    { name: "Remix", icon: SiRemix, sector: "Architectural", status: STATUS.SYNCING, level: 72 },
    { name: "SolidJS", icon: SiSolid, sector: "Architectural", status: STATUS.SYNCING, level: 68 },
    { name: "Preact", icon: SiPreact, sector: "Architectural", status: STATUS.DORMANT, level: 85 },
    { name: "Ember", icon: FiLayers, sector: "Architectural", status: STATUS.DORMANT, level: 75 },
    { name: "Backbone", icon: FiGrid, sector: "Architectural", status: STATUS.DORMANT, level: 70 },
    { name: "Vite", icon: SiVite, sector: "Architectural", status: STATUS.OPERATIONAL, level: 95 },
    { name: "Postman", icon: SiPostman, sector: "Architectural", status: STATUS.OPERATIONAL, level: 95 },

    // --- INTELLIGENCE (AI & LANGUAGES) ---
    { name: "Python", icon: SiPython, sector: "Intelligence", status: STATUS.OPERATIONAL, level: 96 },
    { name: "Flask", icon: SiFlask, sector: "Intelligence", status: STATUS.OPERATIONAL, level: 88 },
    { name: "Django", icon: SiDjango, sector: "Intelligence", status: STATUS.OPERATIONAL, level: 85 },
    { name: "LangChain", icon: SiLangchain, sector: "Intelligence", status: STATUS.SYNCING, level: 82 },
    { name: "GPT-4o", icon: SiOpenai, sector: "Intelligence", status: STATUS.OPERATIONAL, level: 95 },
    { name: "Anthropic", icon: SiAnthropic, sector: "Intelligence", status: STATUS.OPERATIONAL, level: 92 },
    { name: "HuggingFace", icon: SiHuggingface, sector: "Intelligence", status: STATUS.SYNCING, level: 78 },
    { name: "Keras", icon: SiKeras, sector: "Intelligence", status: STATUS.SYNCING, level: 70 },
    { name: "PyTorch", icon: SiPytorch, sector: "Intelligence", status: STATUS.SYNCING, level: 75 },
    { name: "TensorFlow", icon: SiTensorflow, sector: "Intelligence", status: STATUS.SYNCING, level: 70 },
    { name: "NumPy", icon: SiNumpy, sector: "Intelligence", status: STATUS.OPERATIONAL, level: 92 },
    { name: "Pandas", icon: SiPandas, sector: "Intelligence", status: STATUS.OPERATIONAL, level: 90 },
    { name: "SciPy", icon: SiScipy, sector: "Intelligence", status: STATUS.SYNCING, level: 75 },
    { name: "CV Logic", icon: FiVideo, sector: "Intelligence", status: STATUS.SYNCING, level: 75 },
    { name: "C++", icon: SiCplusplus, sector: "Intelligence", status: STATUS.SYNCING, level: 78 },
    { name: "Rust", icon: SiRust, sector: "Intelligence", status: STATUS.SYNCING, level: 65 },
    { name: "Go", icon: SiGo, sector: "Intelligence", status: STATUS.SYNCING, level: 72 },

    // --- INFRASTRUCTURE (CLOUD & DEVOPS) ---
    { name: "AWS", icon: FiCloud, sector: "Infrastructure", status: STATUS.SYNCING, level: 75 },
    { name: "Docker", icon: SiDocker, sector: "Infrastructure", status: STATUS.SYNCING, level: 82 },
    { name: "Kubernetes", icon: SiKubernetes, sector: "Infrastructure", status: STATUS.SYNCING, level: 60 },
    { name: "Terraform", icon: SiTerraform, sector: "Infrastructure", status: STATUS.SYNCING, level: 65 },
    { name: "Ansible", icon: SiAnsible, sector: "Infrastructure", status: STATUS.SYNCING, level: 70 },
    { name: "Jenkins", icon: FiSettings, sector: "Infrastructure", status: STATUS.SYNCING, level: 72 },
    { name: "CircleCI", icon: SiCircleci, sector: "Infrastructure", status: STATUS.SYNCING, level: 75 },
    { name: "GitLab CI", icon: SiGitlab, sector: "Infrastructure", status: STATUS.SYNCING, level: 78 },
    { name: "Nginx", icon: SiNginx, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 85 },
    { name: "Cloudflare", icon: SiCloudflare, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 92 },
    { name: "Vercel", icon: SiVercel, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 98 },
    { name: "Netlify", icon: SiNetlify, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 95 },
    { name: "Firebase", icon: SiFirebase, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 92 },
    { name: "MongoDB", icon: SiMongodb, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 95 },
    { name: "PostgreSQL", icon: SiPostgresql, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 88 },
    { name: "Redis", icon: SiRedis, sector: "Infrastructure", status: STATUS.SYNCING, level: 82 },
    { name: "MySQL", icon: SiMysql, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 90 },
    { name: "SQlite", icon: SiSqlite, sector: "Infrastructure", status: STATUS.OPERATIONAL, level: 92 },

    // --- SYSTEMS & HARDWARE ---
    { name: "Linux Arch", icon: SiLinux, sector: "Systems", status: STATUS.OPERATIONAL, level: 92 },
    { name: "Ubuntu", icon: SiLinux, sector: "Systems", status: STATUS.OPERATIONAL, level: 95 },
    { name: "Windows", icon: FiMonitor, sector: "Systems", status: STATUS.OPERATIONAL, level: 98 },
    { name: "macOS", icon: SiApple, sector: "Systems", status: STATUS.OPERATIONAL, level: 92 },
    { name: "Shell Bash", icon: FiTerminal, sector: "Systems", status: STATUS.OPERATIONAL, level: 94 },
    { name: "ZSH", icon: SiZsh, sector: "Systems", status: STATUS.OPERATIONAL, level: 90 },
    { name: "PowerShell", icon: FiTerminal, sector: "Systems", status: STATUS.OPERATIONAL, level: 88 },
    { name: "PCB Design", icon: FiCpu, sector: "Systems", status: STATUS.SYNCING, level: 72 },
    { name: "Arduino", icon: SiArduino, sector: "Systems", status: STATUS.DORMANT, level: 90 },
    { name: "ESP32", icon: FiZap, sector: "Systems", status: STATUS.OPERATIONAL, level: 85 },
    { name: "Raspberry Pi", icon: SiRaspberrypi, sector: "Systems", status: STATUS.OPERATIONAL, level: 88 },
    { name: "Assembly", icon: FiCode, sector: "Systems", status: STATUS.SYNCING, level: 65 },
    { name: "VMware", icon: SiVmware, sector: "Systems", status: STATUS.OPERATIONAL, level: 90 },

    // --- NETWORKING & SECURITY ---
    { name: "TCP/IP", icon: FiWifi, sector: "Networking", status: STATUS.OPERATIONAL, level: 85 },
    { name: "DNS Arch", icon: FiGlobe, sector: "Networking", status: STATUS.OPERATIONAL, level: 90 },
    { name: "SSL/TLS", icon: FiLock, sector: "Networking", status: STATUS.OPERATIONAL, level: 92 },
    { name: "HTTP/3", icon: FiGlobe, sector: "Networking", status: STATUS.SYNCING, level: 85 },
    { name: "WebSockets", icon: FiActivity, sector: "Networking", status: STATUS.OPERATIONAL, level: 92 },
    { name: "gRPC", icon: FiLink, sector: "Networking", status: STATUS.SYNCING, level: 80 },
    { name: "Wireshark", icon: SiWireshark, sector: "Networking", status: STATUS.OPERATIONAL, level: 88 },
    { name: "Metasploit", icon: SiMetasploit, sector: "Networking", status: STATUS.SYNCING, level: 75 },
    { name: "Firewalls", icon: FiShield, sector: "Networking", status: STATUS.OPERATIONAL, level: 90 },
    { name: "VPN Systems", icon: SiOpenvpn, sector: "Networking", status: STATUS.OPERATIONAL, level: 95 },
    { name: "WireGuard", icon: SiWireguard, sector: "Networking", status: STATUS.OPERATIONAL, level: 92 },
    { name: "SSH/Telnet", icon: FiTerminal, sector: "Networking", status: STATUS.OPERATIONAL, level: 92 },

    // --- CREATIVE (ADOBE & DESIGN) ---
    { name: "Figma", icon: SiFigma, sector: "Creative", status: STATUS.OPERATIONAL, level: 98 },
    { name: "Photoshop", icon: FiImage, sector: "Creative", status: STATUS.DORMANT, level: 92 },
    { name: "Illustrator", icon: FiFeather, sector: "Creative", status: STATUS.DORMANT, level: 88 },
    { name: "After Effects", icon: FiZap, sector: "Creative", status: STATUS.DORMANT, level: 85 },
    { name: "Premiere Pro", icon: FiVideo, sector: "Creative", status: STATUS.OPERATIONAL, level: 90 },
    { name: "Lightroom", icon: FiSearch, sector: "Creative", status: STATUS.OPERATIONAL, level: 92 },
    { name: "InDesign", icon: FiBriefcase, sector: "Creative", status: STATUS.DORMANT, level: 80 },
    { name: "Acrobat", icon: FiBox, sector: "Creative", status: STATUS.OPERATIONAL, level: 95 },
    { name: "XD Design", icon: FiImage, sector: "Creative", status: STATUS.DORMANT, level: 82 },
    { name: "UI/UX", icon: FiLayout, sector: "Creative", status: STATUS.OPERATIONAL, level: 95 },
    { name: "Canva Pro", icon: FiImage, sector: "Creative", status: STATUS.OPERATIONAL, level: 98 },

    // --- MEDIA (PROD & VIDEO) ---
    { name: "OBS Studio", icon: SiObsstudio, sector: "Media", status: STATUS.OPERATIONAL, level: 95 },
    { name: "DaVinci", icon: SiDavinciresolve, sector: "Media", status: STATUS.SYNCING, level: 78 },
    { name: "Blender 3D", icon: SiBlender, sector: "Media", status: STATUS.OPERATIONAL, level: 82 },
    { name: "Unity", icon: SiUnity, sector: "Media", status: STATUS.OPERATIONAL, level: 85 },
    { name: "Audacity", icon: SiAudacity, sector: "Media", status: STATUS.OPERATIONAL, level: 90 },
    { name: "Sound Prod", icon: FiActivity, sector: "Media", status: STATUS.DORMANT, level: 88 },
    { name: "VLC Core", icon: FiVideo, sector: "Media", status: STATUS.OPERATIONAL, level: 92 },
    { name: "FFMPEG", icon: SiFfmpeg, sector: "Media", status: STATUS.OPERATIONAL, level: 90 },
    { name: "Kdenlive", icon: SiKdenlive, sector: "Media", status: STATUS.DORMANT, level: 85 },
    { name: "Streaming", icon: FiTv, sector: "Media", status: STATUS.OPERATIONAL, level: 95 },

    // --- SOFTWARE & TOOLS ---
    { name: "VS Code", icon: FiEdit, sector: "Software", status: STATUS.OPERATIONAL, level: 98 },
    { name: "IntelliJ", icon: SiIntellijidea, sector: "Software", status: STATUS.OPERATIONAL, level: 90 },
    { name: "Vim / NeoVim", icon: SiVim, sector: "Software", status: STATUS.OPERATIONAL, level: 85 },
    { name: "Xcode", icon: FiBox, sector: "Software", status: STATUS.OPERATIONAL, level: 82 },
    { name: "Fork Git", icon: FiLink, sector: "Software", status: STATUS.OPERATIONAL, level: 90 },
    { name: "Git / GitHub", icon: SiGithub, sector: "Software", status: STATUS.OPERATIONAL, level: 98 },
    { name: "Jira / Agile", icon: SiJira, sector: "Software", status: STATUS.OPERATIONAL, level: 92 },
    { name: "Slack", icon: SiSlack, sector: "Software", status: STATUS.OPERATIONAL, level: 95 },
    { name: "Notion", icon: SiNotion, sector: "Software", status: STATUS.OPERATIONAL, level: 98 },
    { name: "Obsidian", icon: FiFeather, sector: "Software", status: STATUS.OPERATIONAL, level: 94 }
];

const sectorIcons: Record<string, any> = {
    "Architectural": FiLayers,
    "Intelligence": FiTarget,
    "Infrastructure": FiDatabase,
    "Systems": FiCpu,
    "Networking": FiWifi,
    "Creative": FiImage,
    "Media": FiVideo,
    "Software": FiBriefcase
};

const TechStack = () => {
    const [activeSector, setActiveSector] = useState("Architectural");
    const [hoveredSkill, setHoveredSkill] = useState<any>(null);

    const sectors = Object.keys(sectorIcons);

    const currentSkills = useMemo(() => 
        skillMatrix.filter(s => s.sector === activeSector),
    [activeSector]);

    return (
        <section className="py-32 bg-[#050505] min-h-[900px] flex items-center relative overflow-hidden font-mono">
            {/* Minimalist Background Layout */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-24 relative z-10">
                
                {/* Left Panel */}
                <div className="flex flex-col justify-center gap-12 lg:gap-16 order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-[2px] bg-purple-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Technical Intelligence v6.0</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-8 lg:mb-12">
                            STACK <br />
                            <span className="font-serif italic text-purple-500">MATRIX.</span>
                        </h2>
                    </motion.div>
                    
                    <div className="flex flex-col gap-1 border-l border-white/5 pl-6 lg:pl-8">
                        {sectors.map(sector => {
                            const Icon = sectorIcons[sector];
                            return (
                                <button
                                    key={sector}
                                    onClick={() => setActiveSector(sector)}
                                    className={`group flex items-center justify-between py-2 sm:py-3 text-left border-b border-white/5 transition-all ${
                                        activeSector === sector ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Icon size={14} className={activeSector === sector ? "text-purple-500" : "text-zinc-700"} />
                                        <span className="text-xs font-black uppercase tracking-widest">{sector}</span>
                                    </div>
                                    <AnimatePresence>
                                        {activeSector === sector && (
                                            <motion.div 
                                                layoutId="sector-pip"
                                                className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]" 
                                            />
                                        )}
                                    </AnimatePresence>
                                </button>
                            );
                        })}
                    </div>

                    <div className="h-32 mt-8 lg:mt-12 border-t border-white/5 pt-8 lg:pt-12">
                        <AnimatePresence mode="wait">
                            {hoveredSkill ? (
                                <motion.div
                                    key={hoveredSkill.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                                            <span className="font-black text-zinc-600">Relevance</span>
                                            <span className="font-serif italic text-purple-400">
                                                {hoveredSkill.status === STATUS.DORMANT ? "Archived" : 
                                                 hoveredSkill.level >= 95 ? "Apex" : 
                                                 "Proficient"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest border-t border-white/5 pt-2">
                                            <span className="font-black text-zinc-600">Mastery Level</span>
                                            <span className="font-serif italic text-white">
                                                {hoveredSkill.level >= 90 ? "Professional" : 
                                                 hoveredSkill.level >= 75 ? "Functional" : 
                                                 "Learning"}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em] mt-4 italic">
                                    // SELECT_NODE_FOR_TELEMETRY
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex flex-col justify-center order-2">
                    <div className="aspect-auto sm:aspect-[16/9] min-h-[500px] sm:min-h-0 w-full bg-white/[0.01] border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 relative overflow-hidden group/container shadow-2xl">
                        
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
                            <span className="text-[16rem] font-black tracking-tighter uppercase whitespace-nowrap">{activeSector}</span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeSector}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 h-full relative z-10 overflow-y-auto pr-4 scrollbar-hide"
                            >
                                {currentSkills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        onMouseEnter={() => setHoveredSkill(skill)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                        className="relative group cursor-none h-fit"
                                    >
                                        <div className="flex flex-col items-center justify-center p-4 lg:p-6 rounded-2xl lg:rounded-3xl border border-white/5 bg-zinc-900/10 hover:bg-white/[0.03] hover:border-purple-500/30 transition-all duration-500">
                                            <div className={`mb-3 lg:mb-4 p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-zinc-900 shadow-xl border border-white/5 transition-transform group-hover:-translate-y-2 duration-500 ${
                                                skill.status === STATUS.OPERATIONAL ? "text-emerald-500" :
                                                skill.status === STATUS.SYNCING ? "text-cyan-400" :
                                                "text-zinc-600"
                                            }`}>
                                                <skill.icon size={20} className="lg:size-6" />
                                            </div>
                                            <span className="text-[8px] lg:text-[9px] font-black tracking-widest text-zinc-400 group-hover:text-white transition-colors text-center uppercase leading-tight px-2">
                                                {skill.name}
                                            </span>
                                            
                                            <div className={`absolute top-3 right-3 lg:top-4 lg:right-4 w-1 h-1 rounded-full ${
                                                skill.status === STATUS.OPERATIONAL ? "bg-emerald-500 animate-pulse" :
                                                skill.status === STATUS.SYNCING ? "bg-cyan-400 animate-pulse" :
                                                "bg-zinc-700"
                                            }`} />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Metadata Footer */}
                    <div className="mt-8 flex justify-between items-center opacity-30">
                        <div className="flex gap-12">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-zinc-600 uppercase mb-1">Architecture</span>
                                <span className="text-xs text-white">Pranab Saini // Global Intelligence Matrix</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.5em]">Sector Sync v6.0</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TechStack;
