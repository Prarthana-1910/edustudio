import React from 'react';
import { RisingSun } from '@/components/ui/CivilMotifs';

/** Dummy image block (her .img-placeholder look). Shows `src` when given. */
export const ImagePlaceholder = ({ src, alt = '', label = 'Image', className = '' }) => (
  <div className={`relative overflow-hidden text-navy img-placeholder ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-60">
        <RisingSun size={72} />
        <span className="font-mono text-[11px] uppercase tracking-widest">{label}</span>
      </div>
    )}
  </div>
);

export default ImagePlaceholder;
