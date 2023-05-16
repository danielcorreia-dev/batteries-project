import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const response = await fetch(`http://localhost:3000/user/${id}`);
    const userData = await response.json();

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
