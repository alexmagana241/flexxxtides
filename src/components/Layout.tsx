import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ResearchUseNotice } from "./ResearchUseNotice";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ResearchUseNotice variant="banner" />
      <Navbar />
      <main className="flex-1 animate-fade-up">{children}</main>
      <Footer />
    </div>
  );
}
