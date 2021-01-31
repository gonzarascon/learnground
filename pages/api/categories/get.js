import { getAllCategories } from '@/lib/airtable';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res) => {
  const categories = await getAllCategories();

  res.status(200).json(categories);
};
