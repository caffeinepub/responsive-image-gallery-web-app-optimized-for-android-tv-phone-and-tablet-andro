import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import type { Image, ImageId } from '../backend';
import { toast } from 'sonner';

export function useGetAllImages() {
  const { actor, isFetching } = useActor();

  return useQuery<Image[]>({
    queryKey: ['images'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetImage(id: ImageId) {
  const { actor, isFetching } = useActor();

  return useQuery<Image>({
    queryKey: ['image', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getImage(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useAddUrlImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, url }: { title: string; url: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addUrlImage(title, url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast.success('Image added successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to add image: ${error.message}`);
    },
  });
}

export function useAddUploadedImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, blob }: { title: string; blob: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addUploadedImage(title, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast.success('Image uploaded successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to upload image: ${error.message}`);
    },
  });
}
