"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities, getCategories } from "@/lib/constants/needs";
import { useCallback } from "react";

const CITIES = getCities();
const CATEGORIES = getCategories();

export function HomeFilters() {
  const router = useRouter();
  const sp = useSearchParams();

  const setFilter = useCallback(
    (key: "city" | "category", value: string) => {
      const next = new URLSearchParams(sp);
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`/?${next.toString()}`);
    },
    [router, sp],
  );

  const city = sp.get("city") ?? "";
  const category = sp.get("category") ?? "";

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select value={city || "_all"} onValueChange={(v) => setFilter("city", v === "_all" ? "" : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ville" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">Toutes les villes</SelectItem>
          {CITIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={category || "_all"} onValueChange={(v) => setFilter("category", v === "_all" ? "" : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">Toutes les catégories</SelectItem>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
