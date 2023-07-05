import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const token = session?.user.accessToken;

  const { query } = req.query;

  try {
    const response = await fetch(
      `https://batteries-backend.up.railway.app/company/by-title?title=${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const companiesData = await response.json();

    res.status(200).json(companiesData);
  } catch (error) {
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(500).json({ error: 'Failed to fetch companies data' });
  }
}
