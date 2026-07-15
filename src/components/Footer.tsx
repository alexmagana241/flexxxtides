import { Link } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import { ResearchUseNotice } from "./ResearchUseNotice";
import { FOOTER_NOTICE, POLICY_LINKS } from "@/lib/compliance";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="text-primary"><BrandMark className="h-9 w-9" /></span>
            <span className="font-display font-bold tracking-[0.18em] text-sm">BIOHACKERS</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            {FOOTER_NOTICE}
          </p>
          <div className="mt-6">
            <ResearchUseNotice variant="inline" />
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">Catalog</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/catalog" className="hover:text-foreground">Research Materials</Link></li>
            <li><Link to="/research-library" className="hover:text-foreground">Research Library</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact & Compliance</Link></li>
            <li><Link to="/eligibility" className="hover:text-foreground">Research Eligibility</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">Policies</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {POLICY_LINKS.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="hover:text-foreground">{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BIOHACKERS. All rights reserved.</p>
          <p>Not for human or veterinary use. Not medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
