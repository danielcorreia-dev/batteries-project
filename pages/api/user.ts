import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  location: string;
  bio: string;
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
      bio: '💻🏃‍♂️ Sou desenvolvedor de software e amante da corrida. Além de ajudar o meio ambiente entre os dois!',
    });
}
