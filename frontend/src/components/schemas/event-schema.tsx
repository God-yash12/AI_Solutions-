import { z } from 'zod';

const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
const ImageSize = 1000000;
// Zod validation schema for the event form
export const EventSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  date: z
    .date()
    .refine((value) => value instanceof Date && !isNaN(value.getTime()), {
      message: "Invalid date. Please select a valid date.",
    }),
  images: z
    .array(z.instanceof(File))
    .refine(
      (files) =>
        files.every(
          (file) => file.size <= ImageSize && ACCEPTED_MIME_TYPES.includes(file.type)
        ),
      {
        message: 'Each file must be 10 MB or smaller and in JPG, PNG, or GIF format',
      }
    ),
  location: z.string().min(1, { message: 'Location is required' }),
  eventDetails: z.string().min(1, { message: 'Event details are required' }),
});

export type EventSchemaType = z.infer<typeof EventSchema>;
