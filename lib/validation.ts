import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(500),
  category: z.string().min(3).max(20),
  link: z.string()
    .url()
    .refine(url => {
      // Check for common image file extensions in the URL
      const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'];
      return imageExtensions.some(ext => url.toLowerCase().includes(ext));
    }, {
      message: 'URL must point to a valid image file (png, jpg, jpeg, gif, webp, bmp, svg)'
    }),
  pitch: z.string().min(10)
});