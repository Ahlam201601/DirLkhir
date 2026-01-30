import { getServerSession } from "@/lib/auth/get-session";
import {
  getNeedsWithCounts,
  getUserParticipationNeedIds,
} from "@/lib/db/needs";
import { HomeFilters } from "@/components/needs/home-filters";
import { NeedCard } from "@/components/needs/need-card";
import { HandHeart, Users, MapPin, ArrowDown } from "lucide-react";

type Props = {
  searchParams: Promise<{ city?: string; category?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const session = await getServerSession();
  const [needs, userParticipatedNeedIds] = await Promise.all([
    getNeedsWithCounts({ city: params.city, category: params.category }),
    session?.user?.id
      ? getUserParticipationNeedIds(session.user.id)
      : Promise.resolve(new Set<string>()),
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Advanced Hero Section */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/image/home.png"
            alt="Architecture marocaine traditionnelle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-2xl">
                Dir-Lkhir
              </h1>
              <p className="text-2xl md:text-4xl font-light mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-lg">
                La solidarité de quartier, de Tanger à Lagouira
              </p>
            </div>
            
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Plateforme d&apos;entraide citoyenne qui connecte Marocains pour des actions de solidarité locale
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Solidarité</h3>
                <p className="text-sm text-white/80">Entraide et soutien mutuel</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Local</h3>
                <p className="text-sm text-white/80">Actions de proximité</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Communauté</h3>
                <p className="text-sm text-white/80">Citoyens engagés</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Découvrir les besoins</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Needs Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Besoins de la communauté</h2>
              <p className="text-muted-foreground text-lg">Découvrez et participez aux initiatives locales</p>
            </div>
            <HomeFilters />
          </div>
        </div>

        {needs.length === 0 ? (
          <div className="text-center py-24 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl border border-primary/10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Aucun besoin pour le moment</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Soyez le premier à proposer une initiative d&apos;entraide dans votre quartier
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((need) => (
              <NeedCard
                key={need.id}
                need={need}
                isLoggedIn={!!session}
                userParticipatedNeedIds={userParticipatedNeedIds}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
