import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SafarAtlas",
  description:
    "The terms that apply when you request a quote or book a managed journey with SafarAtlas, including payments, changes and cancellations.",
  alternates: {
    canonical: "https://safaratlas.com/legal/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
