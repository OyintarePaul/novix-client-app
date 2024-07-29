import { type ClassValue, clsx } from "clsx";
import { QueryFieldFilterConstraint, where } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | undefined) {
  if (!price) return "";
  const formattedPrice = new Intl.NumberFormat().format(parseInt(price));
  return "₦" + formattedPrice;
}

export function getQueriesFromSearchParams(
  params: URLSearchParams | undefined
) {
  const queries: QueryFieldFilterConstraint[] = [];
  if (!params) return queries;
  if (params.has("type")) {
    queries.push(where("type", "==", params.get("type")));
  }
  if (params.has("has_water")) {
    queries.push(where("has_water", "==", params.get("has_water")));
  }
  if (params.has("has_light")) {
    queries.push(where("has_light", "==", params.get("has_light")));
  }
  if (params.has("price")) {
    const [from, to] = params.get("price")?.split("-") as [string, string];
    queries.push(where("price", ">=", parseInt(from)));
    queries.push(where("price", "<=", parseInt(to)));
  }
  return queries;
}
