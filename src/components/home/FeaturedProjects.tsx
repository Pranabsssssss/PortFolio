"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import projectsData from "@/data/projects.json";
import { Project } from "@/types/models";

const allProjects: Project[] = projectsData as Project[];
const featuredProjects = [...allProjects].sort((a, b) => b.priority - a.priority).slice(0, 3);

const FeaturedProjects = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Featured <span className="text-purple-400">Projects</span>
            </h2>
            <p className="text-zinc-400 max-w-xl">
              A selection of my recent work spanning software development, artificial intelligence, and physical engineering.
            </p>
          </motion.div>

          <Link href="/projects" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group">
            View All Projects
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all group cursor-pointer h-full flex flex-col"
              >
                <div className="w-full h-48 bg-zinc-800 relative overflow-hidden">
                  {project.bannerImage ? (
                    <img src={project.bannerImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1 line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{project.subtitle}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/projects" className="flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group">
            View All Projects
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
