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
import { MapPin, Tag } from "lucide-react";

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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville
          </label>
          <Select value={city || "_all"} onValueChange={(v) => setFilter("city", v === "_all" ? "" : v)}>
            <SelectTrigger className="w-full h-10 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Sélectionner une ville" />
              </div>
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
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <Select value={category || "_all"} onValueChange={(v) => setFilter("category", v === "_all" ? "" : v)}>
            <SelectTrigger className="w-full h-10 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Sélectionner une catégorie" />
              </div>
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
      </div>
      
      {(city || category) && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Filtres appliqués: 
              <span className="font-medium text-gray-900 ml-2">
                {[city, category].filter(Boolean).join(", ")}
              </span>
            </div>
            <button
              onClick={() => {
                setFilter("city", "");
                setFilter("category", "");
              }}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Effacer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
