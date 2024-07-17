import { type ClassValue, clsx } from "clsx"
import { QueryFieldFilterConstraint, where } from "firebase/firestore"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string) {
  const formattedPrice = new Intl.NumberFormat().format(parseInt(price))
  return "₦" + formattedPrice
}

export function getQueriesFromSearchParams(params: URLSearchParams) {
  const queries: QueryFieldFilterConstraint[] = []
  if (!params) return queries;
  if(params.has("type")) {
    queries.push(where("type", "==", params.get("type")))
  }
  if (params.has("has_water")) {
    queries.push(where("has_water", "==", params.get("has_water")))
  }
  if (params.has("has_light")) {
    queries.push(where("has_light", "==", params.get("has_light")))
  }
  return queries;
}