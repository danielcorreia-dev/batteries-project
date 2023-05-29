import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  try {
    const response = await fetch(
      `https://batteries-backend.up.railway.app/user/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    if (response.ok) {
      res.status(204).end();
    } else {
      res.status(response.status).json({ error: 'Failed to delete user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
