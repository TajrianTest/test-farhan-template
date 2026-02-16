import Link from 'next/link';
import { brandConfig } from '../../brand.config';

export default function Footer() {
  const { branding } = brandConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold mb-4" style={{ color: branding.colors.primary }}>
              {branding.name}
            </div>
            <p className="text-gray-600 text-sm">
              Your trusted source for brand assets and guidelines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guidelines" className="text-gray-600 hover:text-primary transition-colors">
                  Brand Guidelines
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-gray-600 hover:text-primary transition-colors">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {currentYear} {branding.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
