import { z } from "zod"

const noteSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Title should at least be 1 character"),
    description: z
    .string()
    .trim()
    .min(1, "Description should at least be 1 character")
});

export default noteSchema;