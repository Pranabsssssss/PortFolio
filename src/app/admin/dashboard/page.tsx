"use client";

import React, { useState, useEffect } from "react";
import { Project, ProjectPriority } from "@/types/models";
import { FiPlus, FiTrash2, FiSave, FiEdit2, FiGithub, FiUpload, FiMenu, FiX, FiImage } from "react-icons/fi";
import { Reorder } from "framer-motion";

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [hasGithub, setHasGithub] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/data?type=projects");
      if (res.ok) setProjects(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const saveProjects = async (newProjects: Project[]) => {
    setIsSaving(true);
    try {
      const prioritized = newProjects.map((p, i) => ({ ...p, priority: (newProjects.length - i) as ProjectPriority }));
      const res = await fetch("/api/admin/data?type=projects", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prioritized)
      });
      if (res.ok) { setProjects(prioritized); setEditingId(null); }
      else alert("Failed to save.");
    } catch (e) { console.error(e); alert("Error saving."); }
    finally { setIsSaving(false); }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file); fd.append("category", "projects");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) { const { url } = await res.json(); return url; }
    return null;
  };

  const handleBannerUpload = async (file: File) => {
    setIsUploading(true);
    const url = await uploadFile(file);
    if (url) setFormData(prev => ({ ...prev, bannerImage: url }));
    else alert("Upload failed.");
    setIsUploading(false);
  };

  const handleComplementaryUpload = async (files: FileList) => {
    setIsUploading(true);
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i]);
      if (url) newUrls.push(url);
    }
    setFormData(prev => ({
      ...prev,
      complementaryImages: [...(prev.complementaryImages || []), ...newUrls]
    }));
    setIsUploading(false);
  };

  const removeComplementaryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      complementaryImages: (prev.complementaryImages || []).filter((_, i) => i !== index)
    }));
  };

  const deleteImageFiles = async (urls: string[]) => {
    try {
      await fetch("/api/admin/delete-files", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls })
      });
    } catch (e) { console.error("Failed to delete files:", e); }
  };

  const handleCreateNew = () => {
    const np: Project = {
      id: `project-${Date.now()}`, title: "New Project", subtitle: "", description: "",
      bannerImage: "", complementaryImages: [], priority: 1, tags: [], githubUrl: "", liveUrl: ""
    };
    setProjects([np, ...projects]);
    setEditingId(np.id); setFormData(np); setHasGithub(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project and all its images?")) return;
    const project = projects.find(p => p.id === id);
    if (project) {
      const allImages = [project.bannerImage, ...(project.complementaryImages || [])].filter(Boolean);
      if (allImages.length > 0) await deleteImageFiles(allImages);
    }
    saveProjects(projects.filter(p => p.id !== id));
  };

  const handleEditClick = (p: Project) => {
    setEditingId(p.id); setFormData(p); setHasGithub(!!p.githubUrl);
  };

  const handleSaveEdit = () => {
    if (!formData.title || !formData.id) { alert("Title and ID required."); return; }
    saveProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } as Project : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Projects Manager</h1>
          <p className="text-zinc-400 text-sm">Drag items to reorder priority. Top = highest.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => saveProjects(projects)} disabled={isSaving}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl font-medium transition-colors text-sm">
            <FiSave /> {isSaving ? "Saving..." : "Save Order"}
          </button>
          <button onClick={handleCreateNew}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">
            <FiPlus /> New
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-zinc-400 text-center py-12">Loading...</div>
      ) : (
        <Reorder.Group axis="y" values={projects} onReorder={setProjects} className="space-y-3">
          {projects.map((project) => (
            <Reorder.Item key={project.id} value={project} className="list-none">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {editingId === project.id ? (
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Title</label>
                        <input type="text" value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">ID (slug)</label>
                        <input type="text" value={formData.id || ""} onChange={e => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Subtitle</label>
                      <input type="text" value={formData.subtitle || ""} onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Description</label>
                      <textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm h-24" />
                    </div>

                    {/* Banner Image */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">Banner Image</label>
                      <div className="flex gap-4 items-start">
                        {formData.bannerImage ? (
                          <div className="w-32 h-20 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                            <img src={formData.bannerImage} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-32 h-20 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-600 text-xs shrink-0">No Image</div>
                        )}
                        <label className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg cursor-pointer transition-colors text-sm">
                          <FiUpload /> {isUploading ? "Uploading..." : "Upload"}
                          <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleBannerUpload(e.target.files[0]); }} />
                        </label>
                      </div>
                    </div>

                    {/* Complementary Images */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">Complementary Images (Slider)</label>
                      <div className="flex flex-wrap gap-3 mb-3">
                        {(formData.complementaryImages || []).map((img, i) => (
                          <div key={i} className="relative w-24 h-16 rounded-lg overflow-hidden border border-zinc-700 group">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button onClick={() => removeComplementaryImage(i)}
                              className="absolute top-1 right-1 p-0.5 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                              <FiX size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <label className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg cursor-pointer transition-colors text-sm">
                        <FiImage /> Add Images
                        <input type="file" accept="image/*" multiple className="hidden" onChange={e => { if (e.target.files?.length) handleComplementaryUpload(e.target.files); }} />
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Live URL</label>
                      <input type="text" value={formData.liveUrl || ""} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>

                    {/* GitHub Toggle */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input type="checkbox" checked={hasGithub} onChange={(e) => { setHasGithub(e.target.checked); if (!e.target.checked) setFormData({ ...formData, githubUrl: "" }); }}
                          className="w-4 h-4 rounded accent-purple-600" />
                        <span className="text-sm text-zinc-300 flex items-center gap-2"><FiGithub /> Has GitHub Repository</span>
                      </label>
                      {hasGithub && (
                        <input type="text" value={formData.githubUrl || ""} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                          placeholder="https://github.com/username/repo" className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                      <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                      <button onClick={handleSaveEdit} disabled={isSaving}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <FiSave /> {isSaving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5 flex items-center gap-4">
                    <div className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400 shrink-0"><FiMenu size={20} /></div>
                    {project.bannerImage ? (
                      <div className="w-14 h-14 rounded-lg bg-zinc-800 shrink-0 overflow-hidden border border-zinc-700">
                        <img src={project.bannerImage} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-zinc-800 shrink-0 flex items-center justify-center text-zinc-600 border border-zinc-700 text-[10px]">No Img</div>
                    )}
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-white text-base truncate">{project.title}</h3>
                      <p className="text-xs text-zinc-500 truncate">{project.subtitle}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleEditClick(project)} className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"><FiEdit2 size={15} /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><FiTrash2 size={15} /></button>
                    </div>
                  </div>
                )}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
      {projects.length === 0 && !isLoading && (
        <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">No projects yet. Create one!</div>
      )}
    </div>
  );
}
