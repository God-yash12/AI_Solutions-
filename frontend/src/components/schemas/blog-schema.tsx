import { z } from 'zod';

export const BlogSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Blog title is required' }), 
  content: z
    .string()
    .nonempty({ message: 'Blog content is required' }), 
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File must be less than 5MB', 
    })
    .refine(
      (file) =>
        ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type), // Check MIME type
      { message: 'Only JPG, JPEG, and PNG files are allowed' }
    ),
});

export type BlogFormInputs = z.infer<typeof BlogSchema>;
