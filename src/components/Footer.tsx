import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center">
              <FlaskConical className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display font-semibold">Flex Peptide Research</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            An independent educational resource organizing peptide research literature, reconstitution
            mathematics, and beginner-friendly explanations of peptide science.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/catalog" className="hover:text-foreground">Peptide Catalog</Link></li>
            <li><Link to="/reconstitution" className="hover:text-foreground">Reconstitution Center</Link></li>
            <li><Link to="/learning" className="hover:text-foreground">Learning Center</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">Educational Help</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Flex Peptide Research. Educational content only.</p>
          <p>Not for human consumption. Not medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
