import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  location: string;
  bio: string;
  avatar: string;
  points: number;
  achievments: number;
  savedPlaces: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res
    .status(200)
    .json({
      name: 'Bruno Golveia',
      location: 'São Paulo, SP',
      bio: '💻🏃‍♂️ Sou desenvolvedor de software e amante do ciclismo. Tenho como meta ajudar o meio ambiente entre os dois!',
      avatar: 'https://source.unsplash.com/random?guy',
      points: 12,
      achievments: 2,
      savedPlaces: 3,
    });
}
