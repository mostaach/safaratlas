---
name: framer-buttons
description: "A reusable skill for creating highly polished, interactive buttons using Framer Motion and Tailwind CSS. Includes gradient buttons with hover effects, pulsing icons, and scale animations."
---

# Framer Motion Buttons (framer-buttons)

This skill provides ready-to-use, polished button components built with React, Framer Motion, and Tailwind CSS. Use this when you need premium, high-converting CTAs or social interaction buttons (like WhatsApp, Contact, etc.).

## Key Design Principles
- **Tactile Feedback:** Use `whileHover={{ scale: 1.05 }}` and `whileTap={{ scale: 0.95 }}` for natural interactions.
- **Visual Depth:** Combine gradient backgrounds (`bg-gradient-to-r`) with colored shadows (`shadow-[color]/30`).
- **Micro-Animations:** Use a subtle `animate-ping` effect behind icons to draw attention without being overwhelming.
- **Gradient Sweeps:** Add a pseudo-element or absolute overlay that slides in on hover (`translate-y-full group-hover:translate-y-0`) for a premium gloss effect.

## Reusable Component: WhatsApp Gradient Button

Use this pattern for a premium WhatsApp or Messaging CTA.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  phoneNumber: string;
  defaultMessage?: string;
  label?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  defaultMessage = "Hello!",
  label = "WhatsApp"
}) => {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white shadow-sm shadow-[#25D366]/30 hover:shadow-md hover:shadow-[#25D366]/50 transition-shadow duration-300 overflow-hidden cursor-pointer group"
      title={`Chat on ${label}`}
    >
      {/* Glossy sweep effect */}
      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      
      {/* Icon with ping effect */}
      <div className="relative flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/40 group-hover:animate-ping opacity-0 group-hover:opacity-100 duration-300" />
        <svg className="w-4 h-4 sm:w-4 sm:h-4 fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </div>

      <span className="relative z-10 text-[11px] sm:text-xs font-bold tracking-wide">
        {label}
      </span>
    </motion.a>
  );
};
```
