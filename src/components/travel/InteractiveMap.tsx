"use client";

import React, { useState, useEffect, useRef } from "react";
import { MAP_HOTSPOTS, MapHotspot } from "../../data/mockData";
import "leaflet/dist/leaflet.css";

interface InteractiveMapProps {
  onSelectHotspot?: (hotspot: MapHotspot) => void;
  onOpenInquiry?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectHotspot, onOpenInquiry }) => {
  const [filter, setFilter] = useState<'All' | 'City' | 'Desert' | 'Coast' | 'Mountain'>('All');
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot>(MAP_HOTSPOTS[0]);
  
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  const filteredHotspots = filter === 'All' 
    ? MAP_HOTSPOTS 
    : MAP_HOTSPOTS.filter(h => h.type === filter);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      // Restrict map to Morocco bounds
      const moroccoBounds = L.latLngBounds(
        L.latLng(21.0, -17.5), // South West
        L.latLng(36.5, 0.0)    // North East
      );

      // Center roughly around Morocco
      const map = L.map(mapContainerRef.current!, {
        center: [31.7917, -7.0926],
        zoom: 5,
        minZoom: 5,
        maxBounds: moroccoBounds,
        maxBoundsViscosity: 1.0,
        zoomControl: false,
      });

      // CartoDB Dark Matter — dark, clean, premium aesthetic
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle Markers
  useEffect(() => {
    if (!mapRef.current) return;

    import("leaflet").then((L) => {
      const map = mapRef.current;
      
      // Remove stale markers
      const activeIds = new Set(filteredHotspots.map((h) => h.id));
      markersRef.current.forEach((marker, id) => {
        if (!activeIds.has(id)) {
          map.removeLayer(marker);
          markersRef.current.delete(id);
        }
      });

      // Add new markers
      filteredHotspots.forEach((spot) => {
        if (markersRef.current.has(spot.id)) {
           // Update icon style if selected/unselected
           const marker = markersRef.current.get(spot.id);
           const isSelected = selectedHotspot.id === spot.id;
           const color = spot.type === 'Desert' ? '#f4c36b' : spot.type === 'Coast' ? '#38bdf8' : '#10b981';
           const size = isSelected ? 42 : 32;
           marker.setIcon(createPinMarker(L, color, size, isSelected));
           return;
        }

        const color = spot.type === 'Desert' ? '#f4c36b' : spot.type === 'Coast' ? '#38bdf8' : '#10b981';
        const isSelected = selectedHotspot.id === spot.id;
        
        const marker = L.marker([spot.lat, spot.lng], {
          icon: createPinMarker(L, color, isSelected ? 42 : 32, isSelected),
        }).addTo(map);

        marker.on("click", () => {
          setSelectedHotspot(spot);
          if (onSelectHotspot) onSelectHotspot(spot);
          map.setView([spot.lat, spot.lng], 7, { animate: true });
        });

        markersRef.current.set(spot.id, marker);
      });
    });
  }, [filteredHotspots, selectedHotspot, onSelectHotspot]);

  function createPinMarker(L: any, color: string, size = 32, isSelected = false): any {
    return L.divIcon({
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          transition: all 0.3s ease;
          ${isSelected ? 'box-shadow: 0 0 20px ' + color + '80;' : ''}
        ">
          <div style="
            width: ${size * 0.25}px;
            height: ${size * 0.25}px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.9;
          "></div>
        </div>
      `,
      className: "",
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
    });
  }

  return (
    <div className="bg-[#121a17] text-white rounded-3xl border border-[#2a3a34] p-6 sm:p-8 shadow-2xl relative overflow-hidden zellige-pattern-dark">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f4c36b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header & Category Tabs */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2a3a34]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f4c36b] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#f4c36b]">
              Interactive Morocco Region Atlas
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Explore Places Worth Traveling For
          </h3>
          <p className="text-xs text-white/70 mt-1">
            Click pins to inspect regional highlights, local hosts, and direct lead channels.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5 bg-[#0b110f] p-1.5 rounded-2xl border border-white/10">
          {(['All', 'City', 'Desert', 'Coast', 'Mountain'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-[#c95e3d] text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout Grid */}
      <div className="relative z-10 mt-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-stretch min-h-[480px]">
        
        {/* Visual Map Interface */}
        <div className="relative rounded-2xl bg-[#0b110f] border border-white/10 flex flex-col justify-between overflow-hidden min-h-[400px]">
          <div ref={mapContainerRef} className="absolute inset-0 z-0" />
          
          <div className="absolute bottom-4 left-4 z-10 bg-[#0b110f]/80 backdrop-blur-md px-3 py-2 rounded-xl flex flex-col gap-2 shadow-lg border border-white/10">
            <span className="flex items-center gap-2 text-[10px] font-bold text-white/90 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> City
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-white/90 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f4c36b]" /> Desert
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-white/90 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" /> Coast
            </span>
          </div>
        </div>

        {/* Hotspot Drawer Inspector */}
        <div className="rounded-2xl bg-[#0b110f] border border-white/15 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 space-y-4">
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <img 
                src={selectedHotspot.thumbnail} 
                alt={selectedHotspot.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#c95e3d] text-white text-[10px] font-bold uppercase tracking-widest">
                {selectedHotspot.type} Destination
              </span>
              <span className="absolute bottom-3 left-3 text-2xl font-serif font-bold text-white tracking-wide">
                {selectedHotspot.name}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-[#f4c36b]">
                📍 {selectedHotspot.shortTag}
              </span>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                Highlights: <strong className="text-white">{selectedHotspot.topHighlight}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 font-bold uppercase block tracking-wider">Verified Hosts</span>
                <span className="text-lg font-bold tracking-wide text-[#f4c36b]">{selectedHotspot.listingCount} Active</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 font-bold uppercase block tracking-wider">Inquiry Speed</span>
                <span className="text-lg font-bold tracking-wide text-[#10b981]">Instant</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-white/10 space-y-2">
            <button
              onClick={onOpenInquiry}
              className="w-full py-3.5 rounded-2xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-bold tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Connect with {selectedHotspot.name} Hosts</span>
            </button>
          </div>
        </div>

      </div>
      
      <style>{`
        /* Leaflet minimal styling to match aesthetics */
        .leaflet-container {
          font-family: inherit;
          background: #0b110f !important;
        }
        .leaflet-control-zoom a {
          background: #0b110f !important;
          color: #f4c36b !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #121a17 !important;
        }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.5) !important;
          color: rgba(255,255,255,0.4);
        }
        .leaflet-control-attribution a {
          color: rgba(255,255,255,0.6);
        }
      `}</style>
    </div>
  );
};

