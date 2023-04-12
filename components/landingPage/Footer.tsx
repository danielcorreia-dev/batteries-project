import Link from 'next/link';

const Footer = () => {
  interface FooterItems {
    title: string;
    link?: string;
  }

  const contactItems: FooterItems[] = [
    { title: 'Time', link: '/time' },
    { title: 'Contato', link: '/contato' },
    { title: 'Suporte', link: '/suporte' },
    { title: 'FAQ', link: '/FAQ' },
  ];

  const appItems: FooterItems[] = [
    { title: 'Sobre nós', link: '/sobre-nos' },
    { title: 'Parceiros', link: '/parceiros' },
    { title: 'Projeto', link: '/projeto' },
  ];

  const policiesItems: FooterItems[] = [
    { title: 'Política de Privacidade', link: '/politica-de-privacidade' },
    { title: 'Termos e Condições', link: '/termos-e-condicoes' },
  ];

  const links = (items: FooterItems[]) =>
    items.map((item) => (
      <li key={item.link} className="mb-2">
        {item.link ? (
          <Link
            href={item.link}
            className="hover:text-neutral-400 transition-colors"
          >
            {item.title}
          </Link>
        ) : (
          <Link href="/" className="hover:text-neutral-400 transition-colors">
            {item.title}
          </Link>
        )}
      </li>
    ));

  return (
    <footer>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row justify-around flex-col items-start p-20 border-t border-neutral-200">
        <div className="p-2">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Recursos</p>
            {links(contactItems)}
          </ul>
        </div>
        <div className="p-2">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Web-app</p>
            {links(appItems)}
          </ul>
        </div>
        <div className="p-2">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Políticas</p>
            {links(policiesItems)}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50 border-t border-neutral-200">
        <h1 className="text-gray-800 font-semibold">
          © 2022-2023 Batteries Project - Todos os direitos reservados
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
