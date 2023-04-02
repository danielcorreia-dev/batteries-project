import Link from 'next/link';
import { FunctionComponent } from 'react';

interface Props {
  Icon: React.ElementType;
  title: string;
  content: string;
  btn?: string;
  href?: string;
}

const Card: FunctionComponent<Props> = ({
  Icon,
  title,
  content,
  btn,
  href,
}) => {
  return (
    <div className="border border-gray-300 rounded p-6 hover:shadow-lg hover:scale-105 transition-all">
      <div>{Icon && <Icon className="h-8 w-8 text-purple-500 mb-6" />}</div>
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      <p>{content}</p>
      <Link
        href={`${href}`}
        className={`${
          btn ? 'block' : 'hidden'
        } mt-6 hover:text-purple-700 text-purple-600 `}
      >
        {btn}
      </Link>
    </div>
  );
};

export default Card;
