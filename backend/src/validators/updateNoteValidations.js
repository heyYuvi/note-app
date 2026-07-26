import { z } from "zod";

const updateNoteSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Title should be at least 1 character")
    .optional(),
    description:  z
    .string()
    .trim()
    .min(1, "Description should be at least 1 character")
    .optional()
});

export default updateNoteSchema;