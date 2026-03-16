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
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {project.subtitle}
                </p>
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
