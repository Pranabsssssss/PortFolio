"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import projectsData from "@/data/projects.json";
import { Project } from "@/types/models";

const allProjects: Project[] = projectsData as Project[];
const featuredProjects = [...allProjects].sort((a, b) => b.priority - a.priority).slice(0, 6);

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full group bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-colors duration-500"
      >
        {/* Immersive Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10" />
          {project.bannerImage ? (
            <motion.img 
              src={project.bannerImage} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ transformStyle: "preserve-3d", translateZ: "20px" }}
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">No Image</div>
          )}

          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4 z-20">
             <span className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                {project.tags?.[0] || 'Feature'}
             </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between h-[calc(100%-16rem)]" style={{ transformStyle: "preserve-3d" }}>
          <div style={{ transform: "translateZ(30px)" }}>
            <div className="flex justify-between items-start mb-4">
               {project.startDate && (
                 <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                   {new Date(project.startDate).getFullYear()}
                 </span>
               )}
               <div className="flex -space-x-2">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <img key={i} src={tech.iconUrl} alt={tech.name} className="w-6 h-6 rounded-full border-2 border-[#09090b] bg-zinc-800 object-cover" />
                  ))}
               </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight">
              {project.title}
            </h3>
            
            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
              {project.subtitle}
            </p>
          </div>

          <div 
            className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            style={{ transform: "translateZ(40px)" }}
          >
            <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">View Case Study</span>
            <FiArrowRight className="text-white group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const FeaturedProjects = () => {
  return (
    <section className="py-32 relative bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Selected <span className="text-purple-400 italic font-serif">Works</span>
            </h2>
            <p className="text-zinc-500 max-w-xl text-lg">
              A curated collection of projects where design meets complex engineering and artificial intelligence.
            </p>
          </motion.div>

          <Link href="/projects" className="group flex items-center gap-4 text-white text-sm font-bold uppercase tracking-widest hover:text-purple-400 transition-colors">
            View Archive
            <div className="w-10 h-px bg-zinc-800 group-hover:w-16 group-hover:bg-purple-500 transition-all duration-500" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
