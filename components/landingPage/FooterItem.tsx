import Link from 'next/link';

const FooterItem = ({ title, link }: { title: string; link: string }) => {
  return (
    <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
      <Link href={link}>{title}</Link>
    </li>
  );
};

export default FooterItem;
