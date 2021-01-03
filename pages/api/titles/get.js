import { getTitlesByIDs } from '@/lib/airtable';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res) => {
  const reqTitles = req.query.titles ? JSON.parse(req.query.titles) : [];
  const titles = await getTitlesByIDs(reqTitles);

  res.status(200).json({ titles });
};
