import FooterItem from './FooterItem';

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row justify-around flex-col items-start p-20">
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Product</p>
            <FooterItem title="team" link="/about"></FooterItem>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">About</p>
            <FooterItem title="oie" link="/about"></FooterItem>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Team</p>
            <FooterItem title="oie" link="/about"></FooterItem>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50">
        <h1 className='text-gray-800 font-semibold'>© 2022-2023 All rights reserved</h1>
      </div>
    </footer>
  );
};

export default Footer;
