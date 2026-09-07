"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type * as Leaflet from "leaflet";
import { MAP_HOTSPOTS, MapHotspot } from "../../data/mockData";
import { Sparkles, MapPin, Navigation, Compass, Layers, RotateCcw } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface InteractiveMapProps {
  onSelectHotspot?: (hotspot: MapHotspot) => void;
  onOpenInquiry?: () => void;
}

type MapTheme = "satellite" | "topo" | "dark";

const TILE_LAYERS: Record<MapTheme, { url: string; label: string; attribution: string }> = {
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a> &copy; Maxar, Earthstar Geographics',
  },
  topo: {
    label: "Topographic",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a> &copy; OpenStreetMap',
  },
  dark: {
    label: "Midnight",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a> &copy; OpenStreetMap',
  },
};

function createPinMarker(L: typeof Leaflet, color: string, name: string, size = 34, isSelected = false): Leaflet.DivIcon {
  return L.divIcon({
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2.5px solid white;
          box-shadow: ${isSelected ? `0 0 20px 4px ${color}` : "0 4px 14px rgba(0,0,0,0.6)"};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        ">
          <div style="
            width: ${size * 0.32}px;
            height: ${size * 0.32}px;
            background: #121a17;
            border-radius: 50%;
          "></div>
        </div>
        <div style="
          margin-top: 4px;
          background: rgba(11, 17, 15, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 2px 7px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          pointer-events: none;
          text-transform: uppercase;
        ">${name}</div>
      </div>
    `,
    className: "custom-leaflet-marker",
    iconSize: [size * 2, size + 28],
    iconAnchor: [size, size],
  });
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectHotspot,
  onOpenInquiry,
}) => {
  const [filter, setFilter] = useState<"All" | "City" | "Desert" | "Coast" | "Mountain">("All");
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot>(MAP_HOTSPOTS[0]);
  const [theme, setTheme] = useState<MapTheme>("topo");
  const [mapReady, setMapReady] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const tileLayerRef = useRef<Leaflet.TileLayer | null>(null);
  const markersRef = useRef<Map<string, Leaflet.Marker>>(new Map());
  const leafletLibRef = useRef<typeof Leaflet | null>(null);

  const filteredHotspots =
    filter === "All"
      ? MAP_HOTSPOTS
      : MAP_HOTSPOTS.filter((h) => h.type === filter);

  // Initialize Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      leafletLibRef.current = L;

      // Restrict map to Morocco region
      const moroccoBounds = L.latLngBounds(
        L.latLng(26.5, -13.5),
        L.latLng(36.5, -1.0)
      );

      const map = L.map(mapContainerRef.current!, {
        center: [31.7917, -7.0926],
        zoom: 6,
        minZoom: 5,
        maxZoom: 14,
        maxBounds: moroccoBounds,
        maxBoundsViscosity: 0.7,
        zoomControl: false,
      });

      // Fit bounds to show Morocco completely
      map.fitBounds([
        [29.5, -10.5],
        [35.8, -2.5],
      ], { padding: [20, 20] });

      // Add Base Tile Layer
      const initialLayer = L.tileLayer(TILE_LAYERS[theme].url, {
        attribution: TILE_LAYERS[theme].attribution,
        maxZoom: 16,
      }).addTo(map);

      tileLayerRef.current = initialLayer;

      // Add zoom control
      L.control.zoom({ position: "bottomright" }).addTo(map);

      mapRef.current = map;
      setMapReady(true);

      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapReady(false);
      }
    };
  }, []);

  // Switch Tile Layer on Theme Change
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletLibRef.current;
    if (!map || !L) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(TILE_LAYERS[theme].url, {
      attribution: TILE_LAYERS[theme].attribution,
      maxZoom: 16,
    }).addTo(map);

    tileLayerRef.current = newLayer;
  }, [theme]);

  // Handle Markers
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletLibRef.current;
    if (!map || !L || !mapReady) return;

    const activeIds = new Set(filteredHotspots.map((h) => h.id));

    // Remove obsolete markers
    markersRef.current.forEach((marker, id) => {
      if (!activeIds.has(id)) {
        map.removeLayer(marker);
        markersRef.current.delete(id);
      }
    });

    // Add or update markers
    filteredHotspots.forEach((spot) => {
      const isSelected = selectedHotspot.id === spot.id;
      const color =
        spot.type === "Desert"
          ? "#f4c36b"
          : spot.type === "Coast"
          ? "#38bdf8"
          : spot.type === "Mountain"
          ? "#a855f7"
          : "#10b981";
      const size = isSelected ? 38 : 28;

      if (markersRef.current.has(spot.id)) {
        const existingMarker = markersRef.current.get(spot.id);
        existingMarker?.setIcon(createPinMarker(L, color, spot.name, size, isSelected));
        if (isSelected) {
          existingMarker?.setZIndexOffset(1000);
        } else {
          existingMarker?.setZIndexOffset(100);
        }
        return;
      }

      const marker = L.marker([spot.lat, spot.lng], {
        icon: createPinMarker(L, color, spot.name, size, isSelected),
        zIndexOffset: isSelected ? 1000 : 100,
      }).addTo(map);

      marker.on("click", () => {
        setSelectedHotspot(spot);
        if (onSelectHotspot) onSelectHotspot(spot);
        map.setView([spot.lat, spot.lng], 7, { animate: true });
      });

      markersRef.current.set(spot.id, marker);
    });
  }, [filteredHotspots, selectedHotspot, onSelectHotspot, mapReady]);

  const handleResetView = () => {
    if (!mapRef.current) return;
    mapRef.current.fitBounds([
      [29.5, -10.5],
      [35.8, -2.5],
    ], { padding: [20, 20] });
  };

  return (
    <div id="map-explorer" className="bg-[#121a17] text-white rounded-3xl border border-[#2a3a34] p-6 sm:p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)] relative overflow-hidden zellige-pattern-dark">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#16375A]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c95e3d]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f4c36b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header & Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2a3a34]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16375A]/80 border border-[#C4A258]/30 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#f4c36b] animate-ping" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f4c36b]">
              Interactive Route Atlas · Live Morocco Map
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight">
            Explore Morocco as one connected journey
          </h3>
          <p className="text-xs sm:text-sm text-white/75 mt-1.5 max-w-2xl leading-relaxed">
            The map is the planning surface: pick a region, explore what belongs there, and let SafarAtlas connect your stays, transfers and experiences.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#0b110f] p-1.5 rounded-2xl border border-white/10 shrink-0">
          {(["All", "City", "Desert", "Coast", "Mountain"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#c95e3d] text-white shadow-md"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout Grid */}
      <div className="relative z-10 mt-6 grid lg:grid-cols-[1.55fr_0.85fr] gap-6 items-stretch min-h-[520px]">
        
        {/* Real Leaflet Map Viewport */}
        <div className="relative rounded-2xl bg-[#0b110f] border border-white/10 flex flex-col justify-between overflow-hidden min-h-[520px] shadow-2xl">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" style={{ minHeight: "520px" }} />

          {/* Top Floating Controls: Basemap Mode + Reset View */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-auto">
            <div className="bg-[#0b110f]/90 backdrop-blur-md px-1.5 py-1 rounded-xl flex items-center gap-1 border border-white/15 shadow-xl">
              <span className="flex items-center gap-1 px-2 text-[10px] font-bold text-white/60 uppercase">
                <Layers className="w-3 h-3 text-[#f4c36b]" /> Map View
              </span>
              {(["topo", "satellite", "dark"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    theme === t
                      ? "bg-[#16375A] text-[#f4c36b] border border-[#C4A258]/40 shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {TILE_LAYERS[t].label}
                </button>
              ))}
            </div>

            <button
              onClick={handleResetView}
              title="Reset to Full Morocco View"
              className="bg-[#0b110f]/90 backdrop-blur-md p-2 rounded-xl border border-white/15 text-white/80 hover:text-[#f4c36b] hover:bg-[#16375A]/50 transition-all shadow-xl cursor-pointer flex items-center gap-1.5 text-[10px] font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fit Morocco</span>
            </button>
          </div>

          {/* Bottom Legend */}
          <div className="absolute bottom-4 left-4 z-10 bg-[#0b110f]/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl flex flex-wrap items-center gap-3.5 shadow-xl border border-white/15 pointer-events-auto">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/90 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] ring-2 ring-[#10b981]/30" /> City
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/90 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f4c36b] ring-2 ring-[#f4c36b]/30" /> Desert
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/90 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] ring-2 ring-[#38bdf8]/30" /> Coast
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/90 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] ring-2 ring-[#a855f7]/30" /> Mountain
            </span>
          </div>
        </div>

        {/* Hotspot Drawer Inspector */}
        <div className="rounded-2xl bg-[#0b110f] border border-white/15 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 space-y-4">
            <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 shadow-md">
              <Image 
                src={selectedHotspot.thumbnail} 
                alt={selectedHotspot.name}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b110f] via-[#0b110f]/35 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      selectedHotspot.type === "Desert"
                        ? "#f4c36b"
                        : selectedHotspot.type === "Coast"
                        ? "#38bdf8"
                        : selectedHotspot.type === "Mountain"
                        ? "#a855f7"
                        : "#10b981",
                  }}
                />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
                  {selectedHotspot.type}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#f4c36b] block">
                  Featured Destination
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight drop-shadow-lg">
                  {selectedHotspot.name}
                </h4>
              </div>
            </div>

            <div className="space-y-3 px-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f4c36b]">
                <MapPin className="w-4 h-4 text-[#f4c36b] shrink-0" />
                <span>{selectedHotspot.shortTag}</span>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <Sparkles className="w-4 h-4 text-[#f4c36b] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] uppercase font-extrabold tracking-widest text-white/50 block mb-0.5">
                    Signature Highlight
                  </span>
                  <span className="text-xs font-semibold text-white/90 leading-tight block">
                    {selectedHotspot.topHighlight}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#16375A]/70 to-[#0b110f] border border-[#C4A258]/20">
                <span className="text-[10px] text-white/60 font-black uppercase block tracking-widest mb-1">
                  SafarAtlas Coordination
                </span>
                <p className="text-xs font-medium text-white/90 leading-relaxed">
                  We coordinate private transfers, vetted boutique riad courtyards, and local licensed guides for this region.
                </p>
              </div>
            </div>

          </div>

          {/* Action CTA */}
          <div className="relative z-10 pt-4 mt-4 border-t border-white/10">
            <button
              onClick={onOpenInquiry}
              className="relative overflow-hidden w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c95e3d] to-[#b34f31] hover:from-[#aa4a2c] hover:to-[#933d22] text-white text-xs font-black tracking-widest transition-all shadow-[0_6px_20px_rgba(201,94,61,0.4)] flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
            >
              <Navigation className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300" />
              <span>Add {selectedHotspot.name} to Route</span>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .leaflet-container {
          font-family: inherit;
          background: #101815 !important;
          width: 100%;
          height: 100%;
        }
        .custom-leaflet-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-control-zoom a {
          background: #0b110f !important;
          color: #f4c36b !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #121a17 !important;
        }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.6) !important;
          color: rgba(255,255,255,0.45) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a {
          color: rgba(255,255,255,0.65) !important;
        }
      `}</style>
    </div>
  );
};
