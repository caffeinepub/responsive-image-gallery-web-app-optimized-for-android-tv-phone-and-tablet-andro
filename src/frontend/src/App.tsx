import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GalleryGrid } from './features/gallery/components/GalleryGrid';
import { AddImagePanel } from './features/gallery/components/AddImagePanel';
import { ImageViewerModal } from './features/viewer/components/ImageViewerModal';
import { useGetAllImages } from './hooks/useQueries';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: images = [], isLoading } = useGetAllImages();

  const handleImageSelect = (index: number) => {
    setActiveIndex(index);
    setViewerOpen(true);
  };

  const handleViewerClose = () => {
    setViewerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/generated/gallery-bg-texture.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <Header />
      
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
          <AddImagePanel />
          
          <div className="mt-8 md:mt-12">
            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-xl md:text-2xl text-muted-foreground">Loading gallery...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
                  No images yet. Add your first image above!
                </p>
              </div>
            ) : (
              <GalleryGrid images={images} onImageSelect={handleImageSelect} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {viewerOpen && images.length > 0 && (
        <ImageViewerModal
          images={images}
          initialIndex={activeIndex}
          onClose={handleViewerClose}
        />
      )}
      
      <Toaster />
    </div>
  );
}

export default App;
