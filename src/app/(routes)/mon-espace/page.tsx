import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, PlusCircle, Users, HandHeart, Home, MapPin, CheckCircle, Clock } from "lucide-react";
import {
  getNeedsCreatedByUser,
  getNeedsUserParticipatedIn,
} from "@/lib/db/needs";
import { MarkResolvedButton } from "./mark-resolved-button";

export default async function MonEspacePage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const [created, participated] = await Promise.all([
    getNeedsCreatedByUser(session.user.id),
    getNeedsUserParticipatedIn(session.user.id),
  ]);

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Advanced Page Header */}
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">Mon espace</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Gérez vos besoins créés et suivez vos engagements solidaires
        </p>
      </div>

      {/* Created Needs Section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Mes besoins créés</h2>
            <p className="text-muted-foreground">Initiatives que vous avez proposées</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        
        {created.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl border border-primary/10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <PlusCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Aucun besoin créé</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Lancez votre première initiative d&apos;entraide dans votre communauté
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 h-12 px-8">
              <Link href="/proposer-un-besoin" className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Proposer un besoin
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {created.map((n) => (
              <Card key={n.id} className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-card/90 hover:-translate-y-1">
                {/* Status Indicator */}
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${n.status === "open" ? "bg-green-500" : "bg-gray-400"} animate-pulse`} />
                
                {/* Moroccan Pattern Background */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c34a36' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                
                <CardHeader className="relative pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-3">
                      <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {n.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
                          <MapPin className="w-3 h-3" />
                          {n.city}
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full text-xs font-medium">
                          <span className="w-3 h-3 bg-primary/30 rounded-full" />
                          {n.category}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={n.status === "open" ? "open" : "resolved"}
                      className="shrink-0 px-3 py-1.5 text-xs font-semibold shadow-sm"
                    >
                      {n.status === "open" ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Ouvert
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          Résolu
                        </div>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="relative pb-4 space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {n.description}
                  </p>
                  
                  {n.status === "open" && (
                    <div className="flex gap-2">
                      <MarkResolvedButton needId={n.id} />
                      <Button size="sm" variant="outline" asChild className="flex-1 h-10 border-primary/20 hover:border-primary hover:bg-primary/5">
                        <a
                          href={`https://wa.me/${n.whatsappNumber.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Participated Needs Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <HandHeart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Mes engagements</h2>
            <p className="text-muted-foreground">Besoins auxquels vous participez</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        
        {participated.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl border border-primary/10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Aucun engagement</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Découvrez les besoins de votre communauté et participez aux initiatives
            </p>
            <Button variant="outline" asChild className="border-primary/30 hover:border-primary hover:bg-primary/5 h-12 px-8 group/btn">
              <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <Home className="w-5 h-5 group-hover/btn:text-primary transition-colors" />
                <span className="group-hover/btn:text-primary transition-colors">Voir les besoins</span>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {participated.map((n) => {
              const wa = n.whatsappNumber.replace(/\D/g, "");
              const waUrl = `https://wa.me/${wa}`;
              return (
                <Card key={n.id} className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-card/90 hover:-translate-y-1">
                  {/* Status Indicator */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${n.status === "open" ? "bg-green-500" : "bg-gray-400"} animate-pulse`} />
                  
                  {/* Moroccan Pattern Background */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c34a36' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                  
                  <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-3">
                        <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {n.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
                            <MapPin className="w-3 h-3" />
                            {n.city}
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full text-xs font-medium">
                            <span className="w-3 h-3 bg-primary/30 rounded-full" />
                            {n.category}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={n.status === "open" ? "open" : "resolved"}
                        className="shrink-0 px-3 py-1.5 text-xs font-semibold shadow-sm"
                      >
                        {n.status === "open" ? (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Ouvert
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            Résolu
                          </div>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative pb-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      asChild
                      className="w-full h-11 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 group/btn"
                    >
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Contacter sur WhatsApp"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
                        <span className="font-medium group-hover/btn:text-primary transition-colors">Contacter via WhatsApp</span>
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Back Button */}
      <div className="mt-16 text-center">
        <Button variant="ghost" asChild className="hover:bg-primary/5 hover:text-primary transition-all duration-200 h-12 px-8">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}
