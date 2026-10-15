import { createContext } from "react";

export const RouterContext = createContext(null);

// Normalize path to clean standard format (e.g. "/privacy-policy" or "/")
export function normalizePath(path = "/") {
  if (!path) return "/";
  let clean = path.split("#")[0].split("?")[0];
  if (!clean.startsWith("/")) clean = "/" + clean;
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  return clean.toLowerCase();
}
