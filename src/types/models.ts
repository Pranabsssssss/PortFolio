export type ProjectPriority = 1 | 2 | 3 | 4 | 5;

export interface Project {
  id: string; // URL-friendly slug
  title: string;
  subtitle: string;
  description: string; // Long-form description for the individual page
  bannerImage: string; // Main image for SEO and Hero area of project page
  complementaryImages: string[]; // Additional gallery images
  priority: ProjectPriority; // For sorting on homepage (higher is more important)
  tags: string[]; // e.g., ["AI", "Hardware", "React"]
  githubUrl?: string;
  liveUrl?: string;
}

export type AchievementType = "Participation" | "Positioned" | "Position + Trophy";

export interface Achievement {
  id: string; // URL-friendly slug
  type: AchievementType;
  name: string;
  subtitle: string;
  description: string;
  bannerImage: string; // Image showing the certificate or trophy
  complementaryImages: string[]; // E.g., pictures at the event
  priority: number; // To determine order of rendering
  date: string; // YYYY-MM-DD
}
