import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="h-4 w-4" />
              </div>
              {/* Fix Ora name */}
              <span>Fix<span className="text-primary">O</span>ra</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your trusted home service marketplace. Book skilled technicians for plumbing, electrical, cleaning and more.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Services</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-foreground transition-colors">All Services</Link></li>
              <li><Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link href="/technicians" className="hover:text-foreground transition-colors">Technicians</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Account</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/login" className="hover:text-foreground transition-colors">Log in</Link></li>
              <li><Link href="/register" className="hover:text-foreground transition-colors">Sign up</Link></li>
              <li><Link href="/profile" className="hover:text-foreground transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Support</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="mailto:support@fixora.com" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><span>Help Center</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FixOra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}