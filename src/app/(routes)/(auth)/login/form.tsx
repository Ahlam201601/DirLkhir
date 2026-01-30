"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { loginSchema, type LoginValues } from "./validate";
import InputPasswordContainer from "../components/input-password";
import InputStartIcon from "../components/input-start-icon";
import { cn } from "@/lib/utils";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: LoginValues) {
    startTransition(async () => {
      try {
        const res = await signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/",
        });
        if (res.error) {
          toast.error(res.error.message ?? "Erreur de connexion");
          return;
        }
        toast.success("Connexion réussie !");
        router.push("/");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Erreur de connexion");
      }
    });
  }

  const getInputClassName = (field: keyof LoginValues) =>
    cn(
      "h-12 text-base border-primary/20 focus:border-primary focus:ring-primary/20 transition-all duration-200",
      form.formState.errors[field] &&
        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20",
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </FormLabel>
              <FormControl>
                <InputStartIcon icon={Mail}>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    className={cn("peer ps-9", getInputClassName("email"))}
                    disabled={isPending}
                    {...field}
                  />
                </InputStartIcon>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Mot de passe
              </FormLabel>
              <FormControl>
                <InputPasswordContainer>
                  <Input
                    className={cn("pe-9 text-base", getInputClassName("password"))}
                    placeholder="••••••••"
                    disabled={isPending}
                    {...field}
                  />
                </InputPasswordContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isPending} 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Connexion en cours...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Se connecter
            </div>
          )}
        </Button>
        
        <p className="text-muted-foreground text-center text-sm">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-primary hover:underline underline-offset-4 transition-all duration-200 font-medium">
            Créer un compte
          </Link>
        </p>
      </form>
    </Form>
  );
}
