import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Home className="h-4 w-4 text-accent-foreground" />
            </div>
            PropSmart
          </Link>
          <p className="mt-3 text-sm text-primary-foreground/60">
            Intelligent property recommendations tailored to your lifestyle and preferences.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold">Quick Links</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/60">
            <Link to="/properties" className="hover:text-accent transition-colors">Browse Properties</Link>
            <Link to="/recommendations" className="hover:text-accent transition-colors">Recommendations</Link>
            <Link to="/login" className="hover:text-accent transition-colors">Login</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold">Property Types</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/60">
            <span>Apartments</span>
            <span>Villas</span>
            <span>Houses</span>
            <span>PG / Co-Living</span>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold">Contact</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-primary-foreground/60">
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> hello@propsmart.in</span>
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Mumbai, India</span>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
        © 2026 PropSmart. All rights reserved. Intelligent Property Recommendation System — Final Year Project.
      </div>
    </div>
  </footer>
);

export default Footer;
