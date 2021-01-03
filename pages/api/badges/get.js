import { getAllBadges } from '@/lib/airtable';

export default async (req, res) => {
  const badges = await getAllBadges();

  res.status(200).json({ badges });
};
