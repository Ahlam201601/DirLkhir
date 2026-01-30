import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProposerBesoinForm } from "./form";

export default async function ProposerBesoinPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className="container mx-auto max-w-xl px-4 py-10">
      <h1 className="text-primary mb-6 text-2xl font-bold">
        Proposer un besoin
      </h1>
      <ProposerBesoinForm />
      <Button variant="ghost" asChild className="mt-6">
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
