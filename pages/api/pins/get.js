import { getPinsByIDs } from '@/lib/airtable';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res) => {
  const reqPins = req.query.pins ? JSON.parse(req.query.pins) : [];
  const pins = await getPinsByIDs(reqPins);

  res.status(200).json({ pins });
};
