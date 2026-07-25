import { z } from "zod";

const loginSchema = z.object({
    email: z.
    string()
    .trim()
    .email("INvalid Email Address"),
    password: z
    .string()
    .min(8, "Password must at least be 8 characters")
});

export default loginSchema;