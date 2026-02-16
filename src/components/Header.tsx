import Link from 'next/link';
import { brandConfig } from '../../brand.config';

export default function Header() {
  const { branding } = brandConfig;

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold" style={{ color: branding.colors.primary }}>
              {branding.name}
            </div>
          </Link>

          {/* Navigation will be added as a separate component */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/resources"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
