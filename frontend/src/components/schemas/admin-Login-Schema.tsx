import { z } from "zod";

export const AdminloginSchema = z.object({
    email: z.string()
    .min(1, {message: "username must not be empty"})
    .min(5, {message: 'username must be at least 5 characters'}),
    password: z.string()
    .min(1, {message: "Password must not be empty"})
    .min(5, {message: "Password must be 5 character long"})
    
});

export type AdminloginSchemaType = z.infer<typeof AdminloginSchema>

 