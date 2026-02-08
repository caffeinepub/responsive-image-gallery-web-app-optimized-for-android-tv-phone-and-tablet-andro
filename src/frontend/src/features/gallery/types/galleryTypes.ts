import type { Image, ImageType } from '../../../backend';

export interface GalleryImage extends Image {
  displayUrl: string;
  createdAt: Date;
}

export function toGalleryImage(image: Image): GalleryImage {
  let displayUrl = '';
  
  if (image.imageType.__kind__ === 'url') {
    displayUrl = image.imageType.url;
  } else if (image.imageType.__kind__ === 'externalBlob') {
    displayUrl = image.imageType.externalBlob.getDirectURL();
  }

  return {
    ...image,
    displayUrl,
    createdAt: new Date(),
  };
}
