import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { q } = req.query; // The 'id' parameter will be available in the 'req.query' object
  try {
    const response = await fetch(
      `${process.env.API_URL}/user/${session?.user.id}/company`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    res.status(200).json(await response.json());
  } catch (e: any) {
    res
      .status(500)
      .json({ error: e.message, session: session?.user.accessToken, q });
  }
}
