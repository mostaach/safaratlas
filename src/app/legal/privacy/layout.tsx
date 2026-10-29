import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SafarAtlas",
  description:
    "How SafarAtlas collects, uses and stores the details you share in a travel enquiry, and how to exercise your data-protection rights.",
  alternates: {
    canonical: "https://safaratlas.com/legal/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
