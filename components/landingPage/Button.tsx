import Link from 'next/link';

const Button = ({ content, link }: { content: string; link: string }) => {
  return <Link className='py-3 px-4 text-xl bg-indigo-800 text-white rounded font-semibold hover:bg-indigo-700 transition-colors' href={link}>{content}</Link>;
};

export default Button;
