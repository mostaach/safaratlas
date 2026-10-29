import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SafarAtlas | Official Links & Resources",
  description:
    "Official SafarAtlas links: WhatsApp, email, social profiles, partner platform and press resources.",
  alternates: {
    canonical: "https://safaratlas.com/links",
  },
  // Link hub pages add no search value and compete with the homepage.
  robots: {
    index: false,
    follow: true,
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
