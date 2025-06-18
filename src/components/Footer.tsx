import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-1">
          &copy; {new Date().getFullYear()} HireGlance. All rights reserved.
        </p>
        <p className="text-sm">
          Developed with <span role="img" aria-label="heart" className="text-red-500">❤️</span> by{' '}
          <Link href="https://github.com/ayshafidhakr" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
            Fidhaysha
          </Link>
        </p>
      </div>
    </footer>
  );
}
