import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  const api = process.env.API_URL;

  const responseCompany = await fetch(
    `${api}/user/${session?.user.id}/company`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  if (!responseCompany.ok) {
    throw new Error('Failed to submit form to external API');
  }

  const dataCompanyId = await responseCompany.json();
  const companyId = dataCompanyId.id;

  const body = JSON.parse(req.body);
  const { userId, score } = body;

  try {
    const response = await fetch(`${api}/company/${companyId}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        companyId,
        userId,
        score,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form to external API');
    }

    const data = await response.json();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to submit form',
      userId,
      companyId,
      score,
    });
  }
}
