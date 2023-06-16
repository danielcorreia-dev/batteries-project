import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // The 'id' parameter will be available in the 'req.query' object
  const api = process.env.API_URL;

  try {
    const response = await fetch(`${api}/user/${id}/company`);
    const userData = await response.json();

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
