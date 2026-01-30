export const CITIES = [
  "Casablanca",
  "Agadir",
  "Marrakech",
  "Rabat",
  "Fès",
  "Tanger",
  "Oujda",
  "Tétouan",
  "Lagouira",
] as const;

export const CATEGORIES = [
  "Nettoyage",
  "Aide scolaire",
  "Don urgent",
  "Autre",
] as const;

export type NeedCity = (typeof CITIES)[number];
export type NeedCategory = (typeof CATEGORIES)[number];

export function getCities(): readonly NeedCity[] {
  return CITIES;
}

export function getCategories(): readonly NeedCategory[] {
  return CATEGORIES;
}
