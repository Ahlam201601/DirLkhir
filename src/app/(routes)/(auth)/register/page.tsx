import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./form";
import { UserPlus, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Rejoignez-nous
          </h1>
          <p className="text-muted-foreground text-lg">
            Créez votre compte et participez à la solidarité
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card/95 to-card/90">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-center">
              Inscription
            </CardTitle>
            <CardDescription className="text-center text-base">
              Remplissez les informations pour créer votre compte
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <RegisterForm />
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button variant="ghost" asChild className="hover:bg-primary/5 hover:text-primary transition-all duration-200">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
