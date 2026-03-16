"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import ImageSlider from "@/components/ui/ImageSlider";

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

// ─── 5 LAYOUT VARIANTS ──────────────────────────────────────────────

const Layout1 = ({ project }: { project: Project }) => (
  <div className="space-y-12">
    <div className="w-full h-[50vh] min-h-[400px] rounded-3xl overflow-hidden border border-zinc-800 relative">
      {project.bannerImage ? (
        <img src={project.bannerImage} alt={project.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 text-lg">No Banner Image</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">{project.title}</h1>
        <p className="text-xl text-zinc-300 max-w-2xl">{project.subtitle}</p>
      </div>
    </div>
    <div className="max-w-3xl mx-auto space-y-8">
      <p className="text-lg text-zinc-300 leading-relaxed">{project.description}</p>
      <Links project={project} />
      <ImageSlider images={project.complementaryImages} />
    </div>
  </div>
);

const Layout2 = ({ project }: { project: Project }) => (
  <div className="space-y-12">
    <div className="grid md:grid-cols-2 gap-8 items-center min-h-[400px]">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{project.title}</h1>
        <p className="text-xl text-purple-400 font-medium">{project.subtitle}</p>
        <p className="text-zinc-400 leading-relaxed">{project.description}</p>
        <Links project={project} />
      </div>
      <div className="h-[400px] rounded-3xl overflow-hidden border border-zinc-800">
        {project.bannerImage ? (
          <img src={project.bannerImage} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">No Image</div>
        )}
      </div>
    </div>
    <ImageSlider images={project.complementaryImages} />
  </div>
);

const Layout3 = ({ project }: { project: Project }) => (
  <div className="space-y-12">
    <div className="text-center max-w-3xl mx-auto space-y-6">
      <h1 className="text-5xl md:text-7xl font-bold text-white">{project.title}</h1>
      <p className="text-xl text-purple-400">{project.subtitle}</p>
      <div className="flex justify-center"><Links project={project} /></div>
    </div>
    <div className="w-full h-[50vh] min-h-[350px] rounded-3xl overflow-hidden border border-zinc-800">
      {project.bannerImage ? (
        <img src={project.bannerImage} alt={project.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">No Image</div>
      )}
    </div>
    <div className="max-w-3xl mx-auto">
      <p className="text-lg text-zinc-300 leading-relaxed">{project.description}</p>
    </div>
    <ImageSlider images={project.complementaryImages} />
  </div>
);

const Layout4 = ({ project }: { project: Project }) => (
  <div className="space-y-12">
    <div className="relative rounded-3xl overflow-hidden border border-zinc-800 min-h-[500px] flex items-end">
      {project.bannerImage ? (
        <img src={project.bannerImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-zinc-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
      <div className="relative z-10 p-8 md:p-12 space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{project.title}</h1>
        <p className="text-lg text-purple-300 font-medium">{project.subtitle}</p>
        <p className="text-zinc-300 leading-relaxed">{project.description}</p>
        <Links project={project} />
      </div>
    </div>
    <ImageSlider images={project.complementaryImages} />
  </div>
);

const Layout5 = ({ project }: { project: Project }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 h-[400px] rounded-3xl overflow-hidden border border-zinc-800">
        {project.bannerImage ? (
          <img src={project.bannerImage} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">No Image</div>
        )}
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center space-y-4">
        <h1 className="text-3xl font-bold text-white">{project.title}</h1>
        <p className="text-purple-400 font-medium">{project.subtitle}</p>
        <Links project={project} />
      </div>
    </div>
    <div className="max-w-3xl mx-auto">
      <p className="text-lg text-zinc-300 leading-relaxed">{project.description}</p>
    </div>
    <ImageSlider images={project.complementaryImages} />
  </div>
);

const layouts = [Layout1, Layout2, Layout3, Layout4, Layout5];

// ─── PAGE ────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = allProjects.find(p => p.id === slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const LayoutComponent = useMemo(() => layouts[Math.floor(Math.random() * layouts.length)], []);

  if (!mounted) return null; // Avoids hydration mismatch between SSR and client

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-zinc-400 mb-8">The project you are looking for does not exist.</p>
        <Link href="/projects" className="text-purple-400 hover:text-purple-300 transition-colors">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-8 group">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
      </Link>
      <LayoutComponent project={project} />
    </motion.div>
  );
}
