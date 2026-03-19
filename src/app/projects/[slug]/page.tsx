"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import ImageSlider from "@/components/ui/ImageSlider";
import ExpandableImage from "@/components/ui/ExpandableImage";

import projectsData from "@/data/projects.json";
import { Project } from "@/types/models";

const allProjects: Project[] = projectsData as Project[];

// ─── SHARED ──────────────────────────────────────────────────────────

const Links = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-3">
    {project.githubUrl && (
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 hover:bg-purple-600 text-zinc-300 hover:text-white rounded-xl border border-zinc-700 transition-all">
        <FiGithub size={18} />
      </a>
    )}
    {project.liveUrl && (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 hover:bg-purple-600 text-zinc-300 hover:text-white rounded-xl border border-zinc-700 transition-all">
        <FiExternalLink size={18} />
      </a>
    )}
  </div>
);

const Tags = ({ project }: { project: Project }) => {
  if (!project.tags || project.tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-4 pointer-events-auto">
      {project.tags.map(tag => (
        <span key={tag} className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-full font-semibold text-xs transition-colors">
          {tag}
        </span>
      ))}
    </div>
  );
};

const ProjectMeta = ({ project }: { project: Project }) => {
  const hasDates = project.startDate || project.endDate;
  const hasTech = project.technologies && project.technologies.length > 0;
  
  if (!hasDates && !hasTech) return null;

  return (
    <div className="flex flex-col gap-8 w-full">
      {hasDates && (
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Timeline</h4>
          <p className="text-base text-zinc-200 font-medium">
            {project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : ''}
            {project.startDate && project.endDate ? " - " : ""}
            {project.endDate === "Present" ? "Present" : project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : ''}
          </p>
        </div>
      )}
      
      {hasTech && (
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Technologies Built With</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies!.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/40 rounded-xl border border-zinc-700/50 shadow-sm transition-colors hover:bg-zinc-800">
                <div className="w-5 h-5 rounded-sm overflow-hidden shrink-0">
                  <img src={tech.iconUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm text-zinc-300 font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SINGLE PREMIUM LAYOUT ──────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = allProjects.find(p => p.id === slug);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-zinc-400">
        <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <Link href="/projects" className="mt-8 text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors">
          <FiArrowLeft /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
    >
      {/* Top Navigation */}
      <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-10 group bg-zinc-900/50 px-5 py-2.5 rounded-full border border-zinc-800 backdrop-blur-sm">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
      </Link>

      <article className="space-y-16">
        {/* HERO SECTION */}
        <div className="w-full h-[60vh] min-h-[500px] rounded-[2.5rem] overflow-hidden border border-zinc-800/80 relative shadow-2xl group">
          {project.bannerImage ? (
            <ExpandableImage src={project.bannerImage} alt={project.title} wrapperClassName="w-full h-full absolute inset-0" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 text-lg absolute inset-0">No Banner Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pointer-events-none flex flex-col justify-end">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl"
            >
              {project.title}
            </motion.h1>
            {(project.title !== project.subtitle) && (
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="text-xl md:text-2xl text-purple-200/90 max-w-3xl drop-shadow-lg font-medium"
              >
                {project.subtitle}
              </motion.p>
            )}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <Tags project={project} />
            </motion.div>
          </div>
        </div>

        {/* CONTENT & META GRID */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 lg:gap-20 items-start">
          
          {/* Main Description */}
          <div className="prose prose-invert prose-zinc max-w-none text-lg leading-[2] text-zinc-300">
            <p className="whitespace-pre-line">{project.description}</p>
          </div>
          
          {/* Sidebar Meta */}
          <div className="sticky top-28 space-y-8 bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-8 shadow-xl backdrop-blur-md">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Project Details</h3>
              <ProjectMeta project={project} />
            </div>
            
            {(project.githubUrl || project.liveUrl) && (
              <div className="pt-4 mt-8 border-t border-zinc-800">
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">External Links</h4>
                <div className="flex flex-col gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-3 bg-zinc-800/50 hover:bg-purple-600 text-zinc-300 hover:text-white rounded-xl border border-zinc-700/50 transition-all font-medium">
                      <FiGithub size={20} className="shrink-0" />
                      View Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-3 bg-cyan-900/20 hover:bg-cyan-600 text-cyan-400 hover:text-white rounded-xl border border-cyan-800/30 transition-all font-medium">
                      <FiExternalLink size={20} className="shrink-0" />
                      Live Preview / Demo
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* GALLERY */}
        {project.complementaryImages && project.complementaryImages.length > 0 && (
          <div className="pt-16 border-t border-zinc-800/50">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Project Gallery</h3>
            <ImageSlider images={project.complementaryImages} />
          </div>
        )}

      </article>
    </motion.div>
  );
}
