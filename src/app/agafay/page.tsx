"use client";

import React from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "212698017323"; // Official WhatsApp concierge number
const DISPLAY_PHONE = "+212 698 017 323"; // SafarAtlas official phone line

export default function AgafayPage() {
  const pricePerPerson = 34; // €34 Launch Price

  const waMessage = encodeURIComponent(
    `Hi SafarAtlas! I'd like to reserve the Agafay Desert Full Experience at €${pricePerPerson}/person.\n` +
      `Includes: Marrakech Transfer + Quad Biking + Camel Ride + Mint Tea + Sunset View + Tagine Dinner & Gnaoua Show.\n` +
      `Can you confirm availability for our travel dates?`
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&display=swap');

        :root {
          --atlas-navy: #0D2239;
          --warm-sand: #D6B78A;
          --desert-gold: #C89A4E;
          --soft-cream: #F6F2EC;
          --glass-bg: rgba(13, 34, 57, 0.78);
          --glass-card: rgba(18, 38, 60, 0.65);
          --glass-border: rgba(255, 255, 255, 0.22);
          --gold-gradient: linear-gradient(135deg, #D6B78A 0%, #C89A4E 100%);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          background-color: #080c10; 
          color: var(--soft-cream); 
          font-family: 'Montserrat', system-ui, -apple-system, sans-serif; 
          overflow-x: hidden; 
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          body { padding: 0.5rem; }
        }

        /* ── OUTER GLASS POSTER CONTAINER ── */
        .glass-poster-frame {
          position: relative;
          min-height: 92vh;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.82);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: radial-gradient(circle at 28% 58%, rgba(7, 11, 15, 0.78) 0%, rgba(7, 11, 15, 0.46) 28%, rgba(7, 11, 15, 0) 54%),
                      linear-gradient(90deg, rgba(8, 12, 16, 0.62) 0%, rgba(8, 12, 16, 0.16) 48%, rgba(8, 12, 16, 0.34) 100%),
                      linear-gradient(180deg, rgba(8, 12, 16, 0.18) 0%, rgba(8, 12, 16, 0.76) 100%),
                      url('/agafay-hero-quads.jpg') center/cover no-repeat;
          padding: 2.5rem;
        }

        @media (max-width: 768px) {
          .glass-poster-frame { padding: 1.25rem; border-radius: 20px; }
        }

        /* CLEAN HEADER NAVBAR */
        .poster-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          z-index: 20;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .brand-header-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .brand-logo-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          background: transparent;
          opacity: 1;
          border: none;
          box-shadow: none;
          transition: transform 0.25s ease;
        }

        .brand-logo-img:hover {
          transform: scale(1.08);
        }

        .brand-title-main {
          font-family: 'Playfair Display', serif;
          font-size: 1.18rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #ffffff;
        }

        .brand-title-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--warm-sand);
          text-transform: uppercase;
        }

        .header-actions-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-phone-link {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(214, 183, 138, 0.12);
          border: 1px solid rgba(214, 183, 138, 0.35);
          border-radius: 999px;
          padding: 0.45rem 1.1rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--warm-sand);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .header-phone-link:hover {
          background: rgba(214, 183, 138, 0.25);
          border-color: var(--warm-sand);
          color: #ffffff;
        }

        .header-wa-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          padding: 0.45rem 1.1rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--soft-cream);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .header-wa-link:hover {
          background: rgba(37, 211, 102, 0.2);
          border-color: #25D366;
          color: #ffffff;
        }

        /* MAIN POSTER GRID LAYOUT */
        .poster-grid-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 290px;
          gap: clamp(1.75rem, 6vw, 5.5rem);
          align-items: end;
          margin: auto 0;
          padding: 2.5rem 0 1.25rem;
          z-index: 10;
        }

        @media (max-width: 900px) {
          .poster-grid-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* QUIET EXPERIENCE RAIL */
        .vertical-glass-pillar {
          background: rgba(10, 25, 39, 0.42);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 22px;
          padding: 1.05rem 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.78rem;
          align-items: center;
          width: 78px;
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.34);
        }

        .rail-kicker {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: 'Playfair Display', serif;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(214, 183, 138, 0.9);
          text-transform: uppercase;
          margin-bottom: 0.15rem;
        }

        @media (max-width: 900px) {
          .vertical-glass-pillar {
            flex-direction: row;
            width: 100%;
            border-radius: 16px;
            justify-content: space-around;
            padding: 0.58rem;
          }

          .rail-kicker { display: none; }
        }

        .nav-node-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.66);
          cursor: pointer;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-align: center;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }

        .nav-node-btn.active, .nav-node-btn:hover {
          color: var(--soft-cream);
        }

        .nav-circle-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.11);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }

        .nav-node-btn.active .nav-circle-icon {
          background: rgba(214, 183, 138, 0.16);
          border-color: rgba(214, 183, 138, 0.55);
          color: var(--warm-sand);
          box-shadow: none;
        }

        /* HERO EDITORIAL TYPOGRAPHY */
        .hero-editorial-box {
          max-width: 560px;
          align-self: end;
          padding-bottom: 0.45rem;
        }

        .hero-editorial-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 6vw, 5.1rem);
          font-weight: 700;
          line-height: 1.05;
          color: #ffffff;
          margin-bottom: 0.75rem;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .hero-editorial-subtitle {
          font-size: clamp(0.95rem, 1.55vw, 1.18rem);
          font-weight: 800;
          color: var(--warm-sand);
          margin-bottom: 1rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-editorial-text {
          font-size: 1rem;
          line-height: 1.58;
          color: rgba(246, 242, 236, 0.88);
          max-width: 470px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        /* FLOATING GLASS PRICE CARD */
        .glass-price-card {
          background: rgba(13, 34, 57, 0.7);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 20px;
          padding: 1.7rem;
          width: 290px;
          box-shadow: 0 22px 44px -14px rgba(0, 0, 0, 0.72);
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        @media (max-width: 900px) {
          .glass-price-card { width: 100%; }
        }

        .price-label-sm {
          font-size: 0.7rem;
          font-weight: 800;
          color: rgba(214, 183, 138, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .price-display-big {
          font-size: 2.85rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1;
          letter-spacing: 0;
        }
        .price-display-big span {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--warm-sand);
        }

        .price-sub-pax {
          font-size: 0.85rem;
          color: rgba(246, 242, 236, 0.75);
          margin-top: 0.25rem;
        }

        .btn-glass-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--gold-gradient);
          color: var(--atlas-navy);
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 0.95rem 1.35rem;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 10px 25px rgba(214, 183, 138, 0.4);
          transition: all 0.25s ease;
          width: 100%;
        }

        .btn-glass-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(214, 183, 138, 0.6);
        }

        .traveler-counter-mini {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 0.4rem 0.75rem;
        }

        .counter-btn-mini {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #fff;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 700;
        }

        /* BOTTOM FEATURE & TRUST BARS */
        .poster-footer-bars {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          width: 100%;
          z-index: 10;
          margin-top: 1rem;
        }

        .glass-feature-bar {
          background: rgba(13, 34, 57, 0.62);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 1rem 1.4rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          box-shadow: 0 15px 32px rgba(0, 0, 0, 0.38);
        }

        @media (max-width: 768px) {
          .glass-feature-bar {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            padding: 1rem;
          }
        }

        .feature-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.32rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding-right: 0.5rem;
        }

        .feature-node:last-child {
          border-right: none;
        }

        .feature-node-icon {
          font-size: 1.28rem;
          color: var(--warm-sand);
        }

        .feature-node-title {
          font-size: clamp(0.82rem, 1vw, 0.95rem);
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #ffffff;
        }

        .feature-node-sub {
          font-size: 0.68rem;
          color: rgba(246, 242, 236, 0.72);
          font-style: italic;
        }

        .glass-trust-bar {
          background: rgba(13, 34, 57, 0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.48rem 1.25rem;
          display: flex;
          justify-content: center;
          gap: 1.35rem;
          font-size: 0.68rem;
          font-weight: 600;
          color: rgba(246, 242, 236, 0.72);
        }

        @media (max-width: 600px) {
          .glass-trust-bar { flex-direction: column; gap: 0.4rem; align-items: center; }
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* EXPANDED SECTIONS BELOW THE FOLD */
        .content-section-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3.75rem 1.5rem 6rem;
        }

        .section-badge-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-sand);
          background: rgba(214, 183, 138, 0.1);
          border: 1px solid var(--glass-border);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }

        .section-editorial-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.75rem;
        }

        .glass-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        @media (max-width: 768px) {
          .glass-cards-grid { grid-template-columns: 1fr; }
        }

        .glass-card-item {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(13, 34, 57, 0.75) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(214, 183, 138, 0.06);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card-item:hover {
          transform: translateY(-5px);
          border-color: rgba(214, 183, 138, 0.45);
          box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.4), 0 25px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(214, 183, 138, 0.2);
        }

        /* TIMELINE & REVIEWS GRID STYLES */
        .timeline-grid, .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 900px) {
          .timeline-grid, .reviews-grid { grid-template-columns: 1fr; }
        }

        .timeline-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(13, 34, 57, 0.75) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 22px;
          padding: 1.65rem;
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(214, 183, 138, 0.06);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .timeline-card:hover {
          transform: translateY(-5px);
          border-color: rgba(214, 183, 138, 0.45);
          box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.4), 0 25px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(214, 183, 138, 0.2);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.9rem;
        }

        .timeline-badge {
          background: transparent;
          border: none;
          color: var(--warm-sand);
          font-size: 1.7rem;
          font-weight: 800;
          padding: 0;
          border-radius: 0;
          letter-spacing: 0;
          box-shadow: none;
          line-height: 1;
        }

        .timeline-icon {
          font-size: 1.8rem;
        }

        .timeline-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .timeline-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(246, 242, 236, 0.8);
        }

        .review-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(13, 34, 57, 0.75) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 22px;
          padding: 1.85rem;
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(214, 183, 138, 0.06);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .review-card:hover {
          transform: translateY(-5px);
          border-color: rgba(214, 183, 138, 0.45);
          box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.4), 0 25px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(214, 183, 138, 0.2);
        }

        .review-stars {
          color: #FFD700;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }

        .review-quote {
          font-size: 0.88rem;
          font-style: italic;
          line-height: 1.6;
          color: rgba(246, 242, 236, 0.85);
          margin-bottom: 1.25rem;
        }

        .review-author-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 0.85rem;
        }

        .review-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--gold-gradient);
          color: var(--atlas-navy);
          font-weight: 800;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .review-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
        }

        .review-meta {
          font-size: 0.7rem;
          color: rgba(246, 242, 236, 0.6);
        }

        /* REASSURANCE BLOCK STYLES */
        .reassurance-glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(13, 34, 57, 0.82) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 26px;
          padding: 2.5rem;
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 25px 60px rgba(0, 0, 0, 0.6);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .reassurance-glass-card {
            grid-template-columns: 1fr;
            gap: 1.75rem;
            padding: 1.5rem;
          }
          .reassurance-divider { display: none; }
        }

        .reassurance-divider {
          width: 1px;
          height: 100%;
          background: rgba(255, 255, 255, 0.15);
        }

        .reassurance-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .reassurance-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .reassurance-list li {
          font-size: 0.88rem;
          line-height: 1.5;
          color: rgba(246, 242, 236, 0.9);
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        .check-icon {
          color: #25D366;
          font-weight: 900;
        }

        /* RATING SCORE BANNER */
        .rating-score-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(214, 183, 138, 0.12);
          border: 1px solid rgba(214, 183, 138, 0.3);
          border-radius: 16px;
          padding: 0.85rem 1.4rem;
          margin-bottom: 2rem;
          width: fit-content;
        }

        .rating-score-stars {
          color: #FFD700;
          font-size: 1.2rem;
          letter-spacing: 0.1em;
        }

        .rating-score-number {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }

        .rating-score-sub {
          font-size: 0.78rem;
          color: rgba(246, 242, 236, 0.75);
        }

        /* FINAL CTA SECTION */
        .final-cta-section {
          margin-top: 3rem;
          margin-bottom: 5rem;
          text-align: center;
        }

        .final-cta-glass-box {
          background: linear-gradient(135deg, rgba(214, 183, 138, 0.15) 0%, rgba(13, 34, 57, 0.92) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(214, 183, 138, 0.4);
          border-radius: 32px;
          padding: 3.5rem 2rem;
          box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.3), 0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(214, 183, 138, 0.12);
        }

        .final-cta-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #ffffff;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .final-cta-subtext {
          font-size: 1.05rem;
          color: rgba(246, 242, 236, 0.85);
          margin-bottom: 2rem;
        }

        .btn-glass-cta-large {
          display: inline-block;
          background: var(--gold-gradient);
          color: #0D2239;
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: 0.05em;
          padding: 1.15rem 2.5rem;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.35);
          transition: all 0.3s ease;
        }

        .btn-glass-cta-large:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.5);
        }

        .final-cta-guarantee {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          font-size: 0.78rem;
          color: rgba(246, 242, 236, 0.65);
          margin-top: 1.25rem;
        }

        @media (max-width: 600px) {
          .final-cta-guarantee { flex-direction: column; gap: 0.4rem; }
        }

        /* MOBILE STICKY BAR */
        .sticky-bar-lux {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(13, 34, 57, 0.94);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--glass-border);
          padding: 0.85rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
        }

        @media (min-width: 768px) {
          .sticky-bar-lux { display: none; }
        }
      `}</style>

      {/* ── OUTER GLASS POSTER FRAME ── */}
      <div className="glass-poster-frame" id="overview">
        {/* CLEAN BRAND HEADER NAVBAR */}
        <header className="poster-header-top">
          <div className="brand-header-left">
            <Image 
              src="/safaratlas-brand-logo.png" 
              alt="SafarAtlas Logo" 
              className="brand-logo-img" 
              width={38}
              height={38}
            />
            <div>
              <div className="brand-title-main">SAFARATLAS</div>
              <div className="brand-title-sub">AGAFAY DESERT ESCAPE</div>
            </div>
          </div>

          <div className="header-actions-right">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="header-phone-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{DISPLAY_PHONE}</span>
            </a>

            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`} target="_blank" rel="noreferrer" className="header-wa-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </header>

        {/* MAIN POSTER GRID LAYOUT */}
        <main className="poster-grid-layout">
          {/* HERO EDITORIAL TYPOGRAPHY */}
          <div className="hero-editorial-box">
            <h1 className="hero-editorial-title">
              Escape to<br />
              Agafay Desert
            </h1>
            <div className="hero-editorial-subtitle">Just outside Marrakech</div>
            <p className="hero-editorial-text">
              Desert adventure, Moroccan tradition and sunset dining in one unforgettable Agafay evening.
            </p>
          </div>

          {/* FLOATING GLASS PRICE CARD */}
          <div className="glass-price-card">
            <div className="price-label-sm">Opening offer</div>
            <div className="price-display-big">
              €34 <span>/ person</span>
            </div>
            <div className="price-sub-pax" style={{ marginBottom: "0.55rem" }}>Premium desert evening. Accessible early-access price.</div>

            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-glass-cta"
            >
              BOOK YOUR ESCAPE →
            </a>
          </div>
        </main>

        {/* BOTTOM FEATURE & TRUST BARS */}
        <footer className="poster-footer-bars">
          <div className="glass-feature-bar">
            <div className="feature-node">
              <div className="feature-node-icon">🏎️</div>
              <div className="feature-node-title">Quad Adventure</div>
              <div className="feature-node-sub">1-Hour Guided</div>
            </div>

            <div className="feature-node">
              <div className="feature-node-icon">🐪</div>
              <div className="feature-node-title">Camel Ride</div>
              <div className="feature-node-sub">20-Min Sunset</div>
            </div>

            <div className="feature-node">
              <div className="feature-node-icon">🍵</div>
              <div className="feature-node-title">Moroccan Tea</div>
              <div className="feature-node-sub">Atlas Viewpoint</div>
            </div>

            <div className="feature-node">
              <div className="feature-node-icon">🕯️</div>
              <div className="feature-node-title">Sunset & Dinner</div>
              <div className="feature-node-sub">Gnaoua Fire Show</div>
            </div>
          </div>

          <div className="glass-trust-bar">
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6B78A" strokeWidth="2.5">
                <path d="M5 17h14l-1.5-6h-11L5 17z"/>
                <path d="M7 17v2"/>
                <path d="M17 17v2"/>
                <path d="M7 11V7h10v4"/>
              </svg>
              <span>Hotel transfer included</span>
            </div>

            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6B78A" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <span>Safe & insured</span>
            </div>

            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6B78A" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>Small groups</span>
            </div>

            <a href={`tel:+${WHATSAPP_NUMBER}`} className="trust-item" style={{ color: "inherit", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6B78A" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{DISPLAY_PHONE}</span>
            </a>
          </div>
        </footer>
      </div>

      {/* ── EXPANDED CONTENT SECTIONS ── */}
      <div className="content-section-container">
        {/* ACTIVITIES SECTION (Editorial Punchy Format) */}
        <section id="activities" style={{ marginBottom: "3.75rem" }}>
          <span className="section-badge-pill">The Experience</span>
          <h2 className="section-editorial-title">What Makes Agafay Unforgettable</h2>

          <div className="glass-cards-grid">
            <div className="glass-card-item">
              <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>🏎️</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>QUAD BIKING</h3>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--warm-sand)", fontStyle: "italic", marginBottom: "0.75rem" }}>1 Hour · Guided Safari</div>
              <p style={{ fontSize: "0.86rem", lineHeight: 1.5, color: "rgba(246, 242, 236, 0.78)" }}>
                Navigate Agafay&apos;s rocky desert terrain with a local guide and full safety gear.
              </p>
            </div>

            <div className="glass-card-item">
              <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>🐪</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>SUNSET CAMEL TREK</h3>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--warm-sand)", fontStyle: "italic", marginBottom: "0.75rem" }}>20 Min · Nomad Dress</div>
              <p style={{ fontSize: "0.86rem", lineHeight: 1.5, color: "rgba(246, 242, 236, 0.78)" }}>
                Cross the desert at golden hour in nomad dress with the Atlas Mountains ahead.
              </p>
            </div>

            <div className="glass-card-item">
              <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>🕯️</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>CANDLELIT TAGINE FEAST</h3>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--warm-sand)", fontStyle: "italic", marginBottom: "0.75rem" }}>3 Courses · Camp Tent</div>
              <p style={{ fontSize: "0.86rem", lineHeight: 1.5, color: "rgba(246, 242, 236, 0.78)" }}>
                Sit down to a warm Moroccan dinner in an atmospheric desert camp.
              </p>
            </div>

            <div className="glass-card-item">
              <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>🔥</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>GNAWA MUSIC & FIRE SHOW</h3>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--warm-sand)", fontStyle: "italic", marginBottom: "0.75rem" }}>Live Show · Campfire</div>
              <p style={{ fontSize: "0.86rem", lineHeight: 1.5, color: "rgba(246, 242, 236, 0.78)" }}>
                Close the evening with live Gnawa music, fire performance and campfire energy.
              </p>
            </div>
          </div>
        </section>

        {/* TIMELINE CARDS SECTION */}
        <section id="timeline" style={{ marginBottom: "3.75rem" }}>
          <span className="section-badge-pill">Your Evening</span>
          <h2 className="section-editorial-title">Step-by-Step Desert Timeline</h2>

          <div className="timeline-grid">
            <div className="timeline-card">
              <div>
                <div className="timeline-header">
                  <span className="timeline-badge">16:30</span>
                  <span className="timeline-icon">🚐</span>
                </div>
                <h3 className="timeline-title">Hotel Pickup</h3>
                <p className="timeline-desc">
                  A/C transfer from your Marrakech hotel or Riad to Agafay (~45 min scenic drive).
                </p>
              </div>
            </div>

            <div className="timeline-card">
              <div>
                <div className="timeline-header">
                  <span className="timeline-badge">17:30</span>
                  <span className="timeline-icon">🏎️</span>
                </div>
                <h3 className="timeline-title">Quad Biking Safari</h3>
                <p className="timeline-desc">
                  Gear up and launch into a 1-hour guided quad session across rocky desert canyons.
                </p>
              </div>
            </div>

            <div className="timeline-card">
              <div>
                <div className="timeline-header">
                  <span className="timeline-badge">18:45</span>
                  <span className="timeline-icon">🐪</span>
                </div>
                <h3 className="timeline-title">Sunset Camel & Mint Tea</h3>
                <p className="timeline-desc">
                  Golden hour camel ride in Nomad robes followed by mint tea at High Atlas viewpoint.
                </p>
              </div>
            </div>

            <div className="timeline-card">
              <div>
                <div className="timeline-header">
                  <span className="timeline-badge">19:45</span>
                  <span className="timeline-icon">🕯️</span>
                </div>
                <h3 className="timeline-title">Candlelit Tagine Dinner</h3>
                <p className="timeline-desc">
                  3-course traditional Moroccan feast served inside our atmospheric camp tent.
                </p>
              </div>
            </div>

            <div className="timeline-card">
              <div>
                <div className="timeline-header">
                  <span className="timeline-badge">20:45</span>
                  <span className="timeline-icon">🔥</span>
                </div>
                <h3 className="timeline-title">Gnaoua & Fire Show</h3>
                <p className="timeline-desc">
                  Live Berber drumming, Gnaoua chanting, and fire-breathing performance around bonfire.
                </p>
              </div>
            </div>

            <div className="timeline-card">
              <div>
                <div className="timeline-header">
                  <span className="timeline-badge">21:30</span>
                  <span className="timeline-icon">✨</span>
                </div>
                <h3 className="timeline-title">Return to Marrakech</h3>
                <p className="timeline-desc">
                  Relax on comfortable return drive, arriving back at your hotel by ~22:15.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section id="reviews" style={{ marginBottom: "3.75rem" }}>
          <span className="section-badge-pill">Early Guest Promise</span>
          <h2 className="section-editorial-title">Be Among Our First Guests</h2>

          <div className="rating-score-banner">
            <div className="rating-score-number">Direct WhatsApp confirmation</div>
            <div className="rating-score-sub">• Clear itinerary • Pay on arrival • Local coordination</div>
          </div>

          <div className="reviews-grid">
            <div className="review-card">
              <div>
                <div className="review-stars">01</div>
                <p className="review-quote">
                  A full Agafay evening designed for travelers who want adventure, dinner and sunset atmosphere without planning stress.
                </p>
              </div>
              <div className="review-author-box">
                <div className="review-avatar">WA</div>
                <div>
                  <div className="review-name">WhatsApp Concierge</div>
                  <div className="review-meta">Fast answers before you book</div>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div>
                <div className="review-stars">02</div>
                <p className="review-quote">
                  Your evening is structured around the moments that matter: quad terrain, camel photos, mint tea, dinner and a live show.
                </p>
              </div>
              <div className="review-author-box">
                <div className="review-avatar">EV</div>
                <div>
                  <div className="review-name">Planned Evening Flow</div>
                  <div className="review-meta">Pickup to return, clearly sequenced</div>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div>
                <div className="review-stars">03</div>
                <p className="review-quote">
                  The opening offer keeps the entry price accessible while the experience stays visually and operationally premium.
                </p>
              </div>
              <div className="review-author-box">
                <div className="review-avatar">€</div>
                <div>
                  <div className="review-name">From €34 / Person</div>
                  <div className="review-meta">Confirm details before payment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INCLUDED + GOOD TO KNOW REASSURANCE BLOCK ── */}
        <section id="reassurance" style={{ marginBottom: "3.75rem" }}>
          <div className="reassurance-glass-card">
            <div className="reassurance-col">
              <h3 className="reassurance-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warm-sand)" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                What&apos;s Included
              </h3>
              <ul className="reassurance-list">
                <li><span className="check-icon">✓</span> Roundtrip hotel pickup</li>
                <li><span className="check-icon">✓</span> 1-hour guided quad biking</li>
                <li><span className="check-icon">✓</span> 20-minute sunset camel ride</li>
                <li><span className="check-icon">✓</span> Moroccan mint tea</li>
                <li><span className="check-icon">✓</span> 3-course traditional dinner</li>
                <li><span className="check-icon">✓</span> Gnawa music & fire performance</li>
              </ul>
            </div>

            <div className="reassurance-divider"></div>

            <div className="reassurance-col">
              <h3 className="reassurance-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warm-sand)" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                Good to Know
              </h3>
              <ul className="reassurance-list">
                <li><span style={{ color: "var(--warm-sand)", fontWeight: 700 }}>•</span> <strong>Duration:</strong> ~5 Hours total (16:30 – 21:30)</li>
                <li><span style={{ color: "var(--warm-sand)", fontWeight: 700 }}>•</span> <strong>Pickup:</strong> Direct from your Marrakech Hotel or Riad</li>
                <li><span style={{ color: "var(--warm-sand)", fontWeight: 700 }}>•</span> <strong>Group Size:</strong> Small groups for an intimate experience</li>
                <li><span style={{ color: "var(--warm-sand)", fontWeight: 700 }}>•</span> <strong>Guides:</strong> English & French speaking local guides</li>
                <li><span style={{ color: "var(--warm-sand)", fontWeight: 700 }}>•</span> <strong>Payment:</strong> Pay on arrival / Direct WhatsApp confirmation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── FINAL BOOKING CTA SECTION ── */}
        <section className="final-cta-section">
          <div className="final-cta-glass-box">
            <span className="section-badge-pill">Ready for Agafay?</span>
            <h2 className="final-cta-headline">Book Your Agafay Desert Evening</h2>
            <p className="final-cta-subtext">
              From <strong>€34 / person</strong> · Instant confirmation via WhatsApp Concierge
            </p>

            <div className="final-cta-actions">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-glass-cta-large"
              >
                BOOK NOW →
              </a>
              <div className="final-cta-guarantee">
                <span>⚡ 2-Minute Direct Booking</span>
                <span>•</span>
                <span>🛡️ Free Cancellation up to 24h</span>
                <span>•</span>
                <span>💳 Pay on Arrival</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── STICKY BAR MOBILE ── */}
      <div className="sticky-bar-lux">
        <div>
          <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--warm-sand)" }}>€34 <span style={{ fontSize: "0.75rem", color: "rgba(246,242,236,0.7)" }}>/ pax</span></div>
          <div style={{ fontSize: "0.7rem", color: "rgba(246,242,236,0.7)" }}>Instant WhatsApp confirmation</div>
        </div>
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`} 
          target="_blank" 
          rel="noreferrer" 
          className="btn-glass-cta" 
          style={{ width: "auto", padding: "0.7rem 1.25rem", fontSize: "0.85rem" }}
        >
          Book Now
        </a>
      </div>
    </>
  );
}
