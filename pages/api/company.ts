import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  location: string;
  bio: string;
  trashType: 1 | 2 | 3;
  avatar: string;
  points: number;
  businessHours: string;
  contact: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: 'Quintadaria Plus',
    location: 'Recife, PE',
    bio: 'Quintadaria de vendas de legumes e verduras totalmente orgânicos de renda familiar.',
    trashType: 1,
    avatar: 'https://source.unsplash.com/random?stores',
    points: 12,
    businessHours: '6 AM - 6 PM',
    contact: '3338-8954',
  });
}
