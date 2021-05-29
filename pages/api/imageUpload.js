import { UploadAsset } from '@/lib/firebase/dataFunctionsNode';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res) => {
  const data = await new Promise(function (resolve, reject) {
    const form = new IncomingForm({ keepExtensions: true });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const URL = await UploadAsset(data.files.upload)
    .then((data) => data)
    .catch((err) => console.error('Failed to upload', err));

  res
    .status(200)
    .json({ uploaded: 1, fileName: data.files.upload.name, url: URL });
};
