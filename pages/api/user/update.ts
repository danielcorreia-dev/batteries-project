import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import * as Yup from 'yup';

interface UserUpdateProps {
  email: string;
  password: string;
  newPassword: string;
}

const userUpdateSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
  newPassword: Yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const session = await getServerSession(req, res, authOptions);
  const requestBody = req.body;

  try {
    console.log('Received request body:', requestBody);

    const { email, password, newPassword }: UserUpdateProps =
      await userUpdateSchema.validate(requestBody);

    const session = await getServerSession(req, res, authOptions);
    const api = process.env.API_URL;

    const response = await fetch(`${api}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({ email, password, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user');
    }

    const data = await response.json();
    console.log(data);

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: `Failed to update user: ${error.message}`,
      requestBody, // Include the request body in the error response
    });
  }
}
