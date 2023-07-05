import type { NextApiRequest, NextApiResponse } from 'next';

interface FormData {
  nick: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, nick, password }: FormData = req.body;
  const api = process.env.API_URL;
  try {
    const response = await fetch(`${api}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nick, password }),
    });
    response.status;

    if (!response.ok) {
      throw new Error('Failed to submit form to external API');
    }

    const data = await response.json();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);

    if (res.status(402)) {
      res.json({ message: 'oi' });
    }

    res
      .status(500)
      .json({ message: 'Failed to submit form', email, nick, password });
  }
}
