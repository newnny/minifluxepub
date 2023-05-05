import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method Not Allowed' });
    return;
  }

  const { userToken, userUrl } = req.body;

  // save input data to database or file
  // ...

  res.status(200).json({ message: 'Data saved successfully' });
}