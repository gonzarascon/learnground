import { getCategoryById } from '@/lib/airtable';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res) => {
  const { id } = req.query;
  const categorie = await getCategoryById(id);

  res.status(200).json(categorie);
};
