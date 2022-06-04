import { getAnimes } from "../../../api";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) return res.status(200).json([]);

    const arrayId = id.split(",");
    const { data } = await getAnimes(1, 10, arrayId);

    res.status(200).json(data.Page);
  }
}
