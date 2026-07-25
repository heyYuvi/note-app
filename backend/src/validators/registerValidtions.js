import { email, z } from "zod";

const registerSchema = z.object({
    name: z.
    string().
    min(3, "Name must at least be 3 characters").
    trim(),
    email: z.
    string().
    trim().
    email("Invalid Email Address"),
    password: z.
    string().
    min(8, "Password must at least be 8 characters")
});

export default registerSchema;