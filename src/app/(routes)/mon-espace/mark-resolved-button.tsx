"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { markNeedAsResolved } from "@/lib/actions/needs";
import { toast } from "sonner";

type Props = { needId: string };

export function MarkResolvedButton({ needId }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      const res = await markNeedAsResolved({ needId });
      if (res?.ok) {
        router.refresh();
        return;
      }
      toast.error(res?.error ?? "Erreur");
    });
  }

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleClick}
      disabled={isPending}
    >
      Marquer comme résolu
    </Button>
  );
}
