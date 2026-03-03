import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lion Tech",
  description: "Lion Tech is a research-driven AI company founded by Prashant Chauhan. We build autonomous AI systems including the Virtual Desktop Assistant (VDA) and Gate Thinking Engine (GTE). Expert in autonomous agents, computer vision, and intelligent automation.",
  metadataBase: new URL("https://lionglobal.in/"),
  authors: [{ name: "Prashant Chauhan", url: "https://lionglobal.in/" }],
  keywords: "Prashant Chauhan, Lion Tech, AI Researcher, Data Scientist, Autonomous AI, Virtual Desktop Assistant, VDA, Gate Thinking Engine, GTE, Intelligent Automation, Computer Vision, LLM, Machine Learning, Prashant Chauhan AI Researcher, Lion Tech Founder",
  robots: "index, follow",
  openGraph: {
    title: "Lion Tech — Engineering Autonomous Intelligence | Prashant Chauhan",
    description: "Research-driven AI company building autonomous systems — VDA and Gate Thinking Engine. Founded by Prashant Chauhan, AI Researcher & Data Scientist.",
    url: "https://liontech/",
    siteName: "Lion Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lion Tech — Engineering Autonomous Intelligence",
    description: "Autonomous AI systems by Prashant Chauhan. VDA & Gate Thinking Engine research.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* meta and links that are not covered by the metadata API */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lionglobal.in/#org",
      "name": "Lion Tech",
      "url": "https://lionglobal.in",
      "description": "Research-driven global technology company building autonomous AI systems",
      "founder": {
        "@type": "Person",
        "name": "Prashant Chauhan",
        "jobTitle": "Founder & Chief AI Architect",
        "description": "AI Researcher, Data Scientist, Intelligent Systems Developer"
      },
      "sameAs": []
    },
    {
      "@type": "Person",
      "@id": "https://lionglobal.in/#prashant",
      "name": "Prashant Chauhan",
      "jobTitle": "AI Researcher & Founder",
      "worksFor": {"@id": "https://lionglobal.in/#org"},
      "knowsAbout": ["Artificial Intelligence","Machine Learning","Computer Vision","Autonomous Systems","Large Language Models","Data Science"],
      "email": "pc113123456@gmail.com"
    }
  ]
}`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
