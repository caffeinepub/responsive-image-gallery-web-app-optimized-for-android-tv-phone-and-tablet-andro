import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 mt-auto">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <p className="text-center text-sm md:text-base lg:text-lg text-muted-foreground">
          © 2026. Built with <Heart className="inline w-4 h-4 md:w-5 md:h-5 text-red-500 fill-red-500" /> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
