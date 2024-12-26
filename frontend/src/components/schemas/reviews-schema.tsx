import { z } from "zod";

export const ReviewSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters"),
  
    image: z
      .instanceof(File)
      .refine((file) => file.size <= 10 * 1024 * 1024, {
        message: 'File must be less than 10MB',
      })
      .refine(
        (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
        { message: 'Only JPG, JPEG, and PNG files are allowed' }
      ),
      
    description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description cannot exceed 500 characters"),
    
    company: z.string().min(1, "Company name is required").max(100, "Company name cannot exceed 100 characters"),
    
    position: z.string().min(1, "Position is required").max(100, "Position cannot exceed 100 characters"),
    
    ratings: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  });
export type ReviewSchemaType = z.infer<typeof ReviewSchema>;
