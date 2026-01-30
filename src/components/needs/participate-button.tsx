"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { participateInNeed } from "@/lib/actions/needs";
import { toast } from "sonner";

type Props = {
  needId: string;
  isLoggedIn: boolean;
  isParticipating: boolean;
};

export function ParticipateButton({
  needId,
  isLoggedIn,
  isParticipating,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const disabled = !isLoggedIn || isParticipating || isPending;

  function handleClick() {
    if (disabled) return;
    startTransition(async () => {
      const res = await participateInNeed({ needId });
      if (res?.ok) {
        router.refresh();
        return;
      }
      toast.error(res?.error ?? "Erreur");
    });
  }

  const btn = (
    <Button
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      aria-label={
        !isLoggedIn
          ? "Connectez-vous pour participer"
          : isParticipating
            ? "Vous participez déjà"
            : "Je participe"
      }
    >
      {isParticipating ? "Vous participez déjà" : "Je participe"}
    </Button>
  );

  if (!isLoggedIn) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{btn}</TooltipTrigger>
          <TooltipContent>Connectez-vous pour participer</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return btn;
}
