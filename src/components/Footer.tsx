
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-1">
          &copy; {new Date().getFullYear()} HireGlance. All rights reserved.
        </p>
        <p className="text-sm">
          <span className="inline-block hover:animate-pop-subtle font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-200% animate-text-gradient-flow bg-clip-text text-transparent">
            Developed with
          </span>
          {' '}
          <span
            role="img"
            aria-label="heart"
            className="inline-block text-accent animate-pulse-heart mx-1"
          >
            ❤️
          </span>
          {' '}
          <span className="inline-block hover:animate-pop-subtle font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-200% animate-text-gradient-flow bg-clip-text text-transparent">
            by
          </span>
          {' '}
          <Link
            href="https://github.com/ayshafidhakr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:animate-pop-subtle font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-200% animate-text-gradient-flow bg-clip-text text-transparent"
          >
            Fidhaysha
          </Link>
        </p>
      </div>
    </footer>
  );
}

