import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Au moins 8 caractères")
  .regex(/[A-Z]/, "Au moins une majuscule")
  .regex(/[a-z]/, "Au moins une minuscule")
  .regex(/[0-9]/, "Au moins un chiffre");

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nom requis").max(100),
    email: z.string().email("Email invalide").min(1, "Email requis"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirmez le mot de passe"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
