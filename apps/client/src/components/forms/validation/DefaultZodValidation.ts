import { z } from "zod";

export const fieldNameSchema = z
.string()
.regex(/^[a-z]+$/, "Only lowercase letters are allowed")
.min(5, "Minimum length is 5 characters")
.max(30, "Maximum length is 30 characters");

export const formSchema = z.object({name: fieldNameSchema});

export type formFields = z.infer<typeof formSchema>;