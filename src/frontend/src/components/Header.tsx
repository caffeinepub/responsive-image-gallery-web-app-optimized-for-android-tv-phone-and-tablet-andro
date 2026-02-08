export function Header() {
  return (
    <header className="relative z-20 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/generated/gallery-logo.dim_512x512.png" 
            alt="Gallery Logo" 
            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight">
              Image Gallery
            </h1>
            <p className="text-sm md:text-base lg:text-xl text-muted-foreground mt-1">
              Your personal photo collection
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
