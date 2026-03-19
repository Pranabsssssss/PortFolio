"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import projectsData from "@/data/projects.json";
import { Project } from "@/types/models";

const projects: Project[] = (projectsData as Project[]).sort((a, b) => b.priority - a.priority);

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          My <span className="text-purple-400">Projects</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          A comprehensive gallery of my hardware builds, AI models, and software applications.
        </p>
      </motion.div>

      {/* Projects Grid — Simplified Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all group cursor-pointer h-full flex flex-col"
            >
              {/* Banner Image */}
              <div className="w-full h-48 bg-zinc-800 relative overflow-hidden">
                {project.bannerImage ? (
                  <img src={project.bannerImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex flex-col gap-1 mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <p className="text-xs text-purple-400/80 font-medium">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : ''}
                      {project.startDate && project.endDate ? " - " : ""}
                      {project.endDate === "Present" ? "Present" : project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : ''}
                    </p>
                  )}
                  <p className="text-sm text-zinc-400 line-clamp-2 mt-1">
                    {project.subtitle}
                  </p>
                </div>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex -space-x-2 mt-2 mb-2">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                      <div key={idx} className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-900 overflow-hidden shrink-0 shadow-sm" title={tech.name}>
                        <img src={tech.iconUrl} alt={tech.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {project.technologies.length > 5 && (
                      <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] text-zinc-400 font-bold shrink-0 z-10">
                        +{project.technologies.length - 5}
                      </div>
                    )}
                  </div>
                )}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-800/50">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded-md text-[10px] font-medium border border-zinc-700/50">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 bg-zinc-800/50 text-zinc-500 rounded-md text-[10px] font-medium border border-zinc-800/50">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          No projects yet. Add some from the admin panel!
        </div>
      )}
    </div>
  );
}
