import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

interface UserUpdateProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password, confirmPassword }: UserUpdateProps = req.body;
  const session = await getServerSession(req, res, authOptions);
  const api = process.env.API_URL;

  try {
    const response = await fetch(`${api}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const data = await response.json();
    console.log(data);

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update user',
    });
  }
}
