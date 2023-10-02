export default async function fetcher(url: RequestInfo | URL, options: RequestInit | undefined) {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

  const res = await fetch(`${baseUrl}${url}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    ...options
  });

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
}
