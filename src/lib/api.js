export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://exam-site-backend-theta.vercel.app";
5000
export function apiUrl(path) {
  if (!path) return API_BASE_URL;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
}
