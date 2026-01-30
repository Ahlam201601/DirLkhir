"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createNeed, type CreateNeedInput } from "@/lib/actions/needs";
import { getCities, getCategories } from "@/lib/constants/needs";
import { toast } from "sonner";
import { FileText, MapPin, Tag, MessageCircle, Sparkles } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Titre requis").max(120, "Titre trop long"),
  description: z
    .string()
    .min(1, "Description requise")
    .max(2000, "Description trop longue"),
  city: z.enum([
    "Casablanca",
    "Agadir",
    "Marrakech",
    "Rabat",
    "Fès",
    "Tanger",
    "Oujda",
    "Tétouan",
    "Lagouira",
  ]),
  category: z.enum(["Nettoyage", "Aide scolaire", "Don urgent", "Autre"]),
  whatsappNumber: z.string().min(1, "Numéro WhatsApp requis"),
});

type FormValues = z.infer<typeof schema>;

const CITIES = getCities();
const CATEGORIES = getCategories();

export function ProposerBesoinForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      city: undefined,
      category: undefined,
      whatsappNumber: "",
    },
  });

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      const input: CreateNeedInput = {
        title: data.title,
        description: data.description,
        city: data.city,
        category: data.category,
        whatsappNumber: data.whatsappNumber,
      };
      const res = await createNeed(input);
      if (res && !res.ok) {
        const msg = Object.values(res.error ?? {}).flat().join(" ") || "Erreur";
        toast.error(msg);
      } else {
        toast.success("Besoin publié avec succès !");
        form.reset();
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Proposer un besoin
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Partagez une initiative d&apos;entraide et mobilisez votre communauté
        </p>
      </div>

      {/* Form Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card/95 to-card/90">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            Détails du besoin
          </CardTitle>
          <CardDescription className="text-base">
            Remplissez les informations ci-dessous pour publier votre demande d&apos;entraide
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Titre du besoin
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Nettoyage de la place du quartier"
                        disabled={isPending}
                        className="h-12 text-base border-primary/20 focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      Description détaillée
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez précisément le besoin, les ressources requises et l'impact attendu..."
                        rows={5}
                        disabled={isPending}
                        className="text-base border-primary/20 focus:border-primary focus:ring-primary/20 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <span className="text-xs text-muted-foreground">
                        {field.value?.length || 0}/2000 caractères
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              {/* City and Category Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Ville
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-primary/20 focus:border-primary focus:ring-primary/20">
                            <SelectValue placeholder="Choisir une ville" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CITIES.map((c) => (
                            <SelectItem key={c} value={c} className="text-base">
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        Catégorie
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-primary/20 focus:border-primary focus:ring-primary/20">
                            <SelectValue placeholder="Choisir une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c} className="text-base">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {c === "Nettoyage" && "🧹"}
                                  {c === "Aide scolaire" && "📚"}
                                  {c === "Don urgent" && "🚨"}
                                  {c === "Autre" && "📋"}
                                </Badge>
                                {c}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* WhatsApp Field */}
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      Numéro WhatsApp
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 0612345678"
                        disabled={isPending}
                        className="h-12 text-base border-primary/20 focus:border-primary focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Publication en cours...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Publier le besoin
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
