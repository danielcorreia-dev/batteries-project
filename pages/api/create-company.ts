import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

interface CompanyFormData {
  title: string;
  address: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { title, address }: CompanyFormData = req.body;
  const session = await getServerSession(req, res, authOptions);

  try {
    const response = await fetch('http://localhost:3000/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${session?.user.accessToken}`
      },
      body: JSON.stringify({ title, address }),
    });
    response.status;

    if (!response.ok) {
      throw new Error('Failed to submit form to external API');
    }

    const data = await response.json();
    console.log(data);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);

    if (res.status(402)) {
      res.json({ message: 'oi' });
    }

    res
      .status(500)
      .json({ message: 'Failed to submit form', title, address});
  }
}
