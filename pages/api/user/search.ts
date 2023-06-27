import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { q } = req.query; // The 'q' parameter will be available in the 'req.query' object
  const api = process.env.API_URL;

  try {
    const response = await fetch(`${api}/user/by-nick-or-email?nick=${q}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    const userData = await response.json();

    res.status(200).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch user data`, q, session });
  }
}
