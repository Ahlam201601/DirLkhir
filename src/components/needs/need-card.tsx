import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Users, Flame, CheckCircle, Clock } from "lucide-react";
import type { NeedWithCount } from "@/lib/db/needs";
import { ParticipateButton } from "./participate-button";

type Props = {
  need: NeedWithCount;
  isLoggedIn: boolean;
  userParticipatedNeedIds: Set<string>;
};

export function NeedCard({
  need,
  isLoggedIn,
  userParticipatedNeedIds,
}: Props) {
  const isParticipating = userParticipatedNeedIds.has(need.id);
  const wa = need.whatsappNumber.replace(/\D/g, "");
  const waUrl = `https://wa.me/${wa}`;

  return (
    <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-card/90 hover:-translate-y-1">
      {/* Advanced Moroccan Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c34a36' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          suppressHydrationWarning
        />
      </div>
      
      {/* Status Indicator */}
      <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${need.status === "open" ? "bg-green-500" : "bg-gray-400"} animate-pulse`} />
      
      {/* Card Header */}
      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {need.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
                <MapPin className="w-3 h-3" />
                {need.city}
              </div>
              <div className="inline-flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full text-xs font-medium">
                <span className="w-3 h-3 bg-primary/30 rounded-full" />
                {need.category}
              </div>
            </div>
          </div>
          <Badge
            variant={need.status === "open" ? "open" : "resolved"}
            className="shrink-0 px-3 py-1.5 text-xs font-semibold shadow-sm"
          >
            {need.status === "open" ? (
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
          {need.description}
        </p>
        
        {/* Advanced Participation Counter */}
        <div className="relative bg-gradient-to-r from-primary/8 via-primary/5 to-transparent rounded-2xl p-4 border border-primary/10">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-10 -mt-10" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-primary text-base">
                    {need.participationCount} citoyen{need.participationCount !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">engagé{need.participationCount !== 1 ? "s" : ""}</p>
                </div>
              </div>
              {need.participationCount > 0 && (
                <div className="flex -space-x-2">
                  {[...Array(Math.min(3, need.participationCount))].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full border-2 border-background flex items-center justify-center shadow-sm"
                    >
                      <Users className="w-3 h-3 text-primary/60" />
                    </div>
                  ))}
                  {need.participationCount > 3 && (
                    <div className="w-7 h-7 bg-muted rounded-full border-2 border-background flex items-center justify-center text-xs font-bold shadow-sm">
                      +{need.participationCount - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative pt-2">
        <div className="flex gap-3 w-full">
          <Button 
            size="sm" 
            variant="outline" 
            asChild
            className="flex-1 h-11 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 group/btn"
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter sur WhatsApp"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
              <span className="font-medium group-hover/btn:text-primary transition-colors">WhatsApp</span>
            </a>
          </Button>
          <ParticipateButton
            needId={need.id}
            isLoggedIn={isLoggedIn}
            isParticipating={isParticipating}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
