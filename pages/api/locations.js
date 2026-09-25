import { baseUrl, fetchApi } from "../../utils/fetchApi";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const query = Array.isArray(req.query.query) ? req.query.query[0] : req.query.query;

  if (!query || !query.trim()) {
    return res.status(200).json({ ok: true, data: { hits: [] }, error: null });
  }

  const result = await fetchApi(
    `${baseUrl}/auto-complete?query=${encodeURIComponent(query.trim())}`
  );

  return res.status(result.ok ? 200 : result.status).json(result);
}
