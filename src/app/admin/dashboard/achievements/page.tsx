"use client";

import React, { useState, useEffect } from "react";
import { Achievement, AchievementType } from "@/types/models";
import { FiPlus, FiTrash2, FiSave, FiEdit2, FiUpload, FiMenu, FiX, FiImage } from "react-icons/fi";
import { Reorder } from "framer-motion";
import ExpandableImage from "@/components/ui/ExpandableImage";

export default function AchievementsDashboard() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/data?type=achievements");
      if (res.ok) setAchievements(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const saveData = async (newData: Achievement[]) => {
    setIsSaving(true);
    try {
      const prioritized = newData.map((a, i) => ({ ...a, priority: newData.length - i }));
      const res = await fetch("/api/admin/data?type=achievements", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prioritized)
      });
      if (res.ok) { setAchievements(prioritized); setEditingId(null); }
      else alert("Failed to save.");
    } catch (e) { console.error(e); }
    finally { setIsSaving(false); }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file); fd.append("category", "achievements");
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
    } catch (e) { console.error(e); }
  };

  const handleCreateNew = () => {
    const na: Achievement = {
      id: `achievement-${Date.now()}`, name: "New Achievement", subtitle: "", description: "",
      type: "Participation", bannerImage: "", complementaryImages: [], priority: 1,
      date: new Date().toISOString().split('T')[0]
    };
    setAchievements([na, ...achievements]);
    setEditingId(na.id); setFormData(na);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this achievement and all its images?")) return;
    const item = achievements.find(a => a.id === id);
    if (item) {
      const allImages = [item.bannerImage, ...(item.complementaryImages || [])].filter(Boolean);
      if (allImages.length > 0) await deleteImageFiles(allImages);
    }
    saveData(achievements.filter(a => a.id !== id));
  };

  const handleEditClick = (a: Achievement) => { setEditingId(a.id); setFormData(a); };

  const handleSaveEdit = () => {
    if (!formData.name || !formData.id) { alert("Name and ID required."); return; }
    saveData(achievements.map(a => a.id === editingId ? { ...a, ...formData } as Achievement : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Achievements Manager</h1>
          <p className="text-zinc-400 text-sm">Drag to reorder. Top = highest priority.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => saveData(achievements)} disabled={isSaving}
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
        <Reorder.Group axis="y" values={achievements} onReorder={setAchievements} className="space-y-3">
          {achievements.map((item) => (
            <Reorder.Item key={item.id} value={item} className="list-none">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {editingId === item.id ? (
                  <div className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Name</label>
                        <input type="text" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">ID (slug)</label>
                        <input type="text" value={formData.id || ""} onChange={e => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Subtitle / Issuer</label>
                        <input type="text" value={formData.subtitle || ""} onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Date</label>
                        <input type="date" value={formData.date || ""} onChange={e => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Description</label>
                      <textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm h-24" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Type</label>
                      <select value={formData.type || "Participation"} onChange={e => setFormData({ ...formData, type: e.target.value as AchievementType })}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="Position + Trophy">Position + Trophy</option>
                        <option value="Positioned">Positioned</option>
                        <option value="Participation">Participation</option>
                      </select>
                    </div>

                    {/* Banner Image */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">Banner Image</label>
                      <div className="flex gap-4 items-start">
                        {formData.bannerImage ? (
                          <div className="w-32 h-20 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                            <ExpandableImage src={formData.bannerImage} alt="" wrapperClassName="w-full h-full" className="w-full h-full object-cover" />
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
                            <ExpandableImage src={img} alt="" wrapperClassName="w-full h-full" className="w-full h-full object-cover" />
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
                    {item.bannerImage ? (
                      <div className="w-14 h-14 rounded-lg bg-zinc-800 shrink-0 overflow-hidden border border-zinc-700">
                        <ExpandableImage src={item.bannerImage} alt="" wrapperClassName="w-full h-full" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-zinc-800 shrink-0 flex items-center justify-center text-zinc-600 border border-zinc-700 text-[10px]">No Img</div>
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base truncate">{item.name}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50 shrink-0">{item.type}</span>
                      </div>
                      <p className="text-xs text-zinc-500 truncate">{item.subtitle} • {item.date}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleEditClick(item)} className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"><FiEdit2 size={15} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><FiTrash2 size={15} /></button>
                    </div>
                  </div>
                )}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
      {achievements.length === 0 && !isLoading && (
        <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">No achievements yet. Create one!</div>
      )}
    </div>
  );
}
