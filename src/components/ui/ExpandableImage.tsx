"use client";

import React, { useState } from "react";
import Lightbox from "./Lightbox";

interface ExpandableImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  wrapperClassName?: string;
}

export default function ExpandableImage({ wrapperClassName = "", className = "", src, alt, ...props }: ExpandableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isVideo = src.match(/\.(mp4|webm)$/i);

  return (
    <>
      <div 
        className={`relative cursor-pointer group overflow-hidden ${wrapperClassName}`} 
        onClick={() => setIsOpen(true)}
      >
        {isVideo ? (
          <video 
            src={src} 
            className={`transition-transform duration-500 group-hover:scale-105 object-cover ${className}`}
            autoPlay 
            muted 
            loop 
            playsInline
          />
        ) : (
          <img 
            src={src} 
            alt={alt} 
            className={`transition-transform duration-500 group-hover:scale-105 ${className}`}
            {...props} 
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-purple-600/10 transition-colors duration-300 pointer-events-none flex items-center justify-center">
            {/* Optional expand icon on hover could go here, but kept subtle for now */}
        </div>
      </div>
      <Lightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageSrc={src}
        altText={alt}
      />
    </>
  );
}
