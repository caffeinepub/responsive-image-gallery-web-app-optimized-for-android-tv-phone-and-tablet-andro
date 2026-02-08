import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link, Upload } from 'lucide-react';
import { useAddUrlImage, useAddUploadedImage } from '../../../hooks/useQueries';
import { ExternalBlob } from '../../../backend';

export function AddImagePanel() {
  const [urlInput, setUrlInput] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [fileTitle, setFileTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const addUrlMutation = useAddUrlImage();
  const addUploadMutation = useAddUploadedImage();

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    await addUrlMutation.mutateAsync({
      title: urlTitle.trim() || 'Untitled Image',
      url: urlInput.trim(),
    });

    setUrlInput('');
    setUrlTitle('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await addUploadMutation.mutateAsync({
        title: fileTitle.trim() || file.name,
        blob,
      });

      setFileTitle('');
      setUploadProgress(0);
      e.target.value = '';
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl">Add New Image</CardTitle>
        <CardDescription className="text-base md:text-lg lg:text-xl">
          Add images by URL or upload from your device
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="url" className="text-base md:text-lg lg:text-xl py-3 md:py-4">
              <Link className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              URL
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-base md:text-lg lg:text-xl py-3 md:py-4">
              <Upload className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="mt-6">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-input" className="text-base md:text-lg lg:text-xl">
                  Image URL
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="text-base md:text-lg lg:text-xl h-12 md:h-14 lg:h-16"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url-title" className="text-base md:text-lg lg:text-xl">
                  Title (optional)
                </Label>
                <Input
                  id="url-title"
                  type="text"
                  placeholder="My Image"
                  value={urlTitle}
                  onChange={(e) => setUrlTitle(e.target.value)}
                  className="text-base md:text-lg lg:text-xl h-12 md:h-14 lg:h-16"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={addUrlMutation.isPending || !urlInput.trim()}
                className="w-full text-base md:text-lg lg:text-xl h-12 md:h-14 lg:h-16"
              >
                {addUrlMutation.isPending ? 'Adding...' : 'Add Image'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-title" className="text-base md:text-lg lg:text-xl">
                  Title (optional)
                </Label>
                <Input
                  id="file-title"
                  type="text"
                  placeholder="My Image"
                  value={fileTitle}
                  onChange={(e) => setFileTitle(e.target.value)}
                  className="text-base md:text-lg lg:text-xl h-12 md:h-14 lg:h-16"
                  disabled={isUploading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file-input" className="text-base md:text-lg lg:text-xl">
                  Select Image
                </Label>
                <Input
                  id="file-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileUpload}
                  className="text-base md:text-lg lg:text-xl h-12 md:h-14 lg:h-16 cursor-pointer"
                  disabled={isUploading}
                />
              </div>
              {isUploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-3 md:h-4" />
                  <p className="text-sm md:text-base lg:text-lg text-center text-muted-foreground">
                    Uploading: {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
