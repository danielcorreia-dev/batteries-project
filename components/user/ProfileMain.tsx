import { STRING_LITERAL_DROP_BUNDLE } from 'next/dist/shared/lib/constants';
import Image from 'next/image';
import { string } from 'yup';

interface ProfileProps {
  name: string;
  location: string;
  bio: string;
}

const ProfileMain = () => (
  <div className="p-2 flex justify-center items-center">
    <div className="grid grid-cols-2">
      <div className="rounded-full">
        <Image src={'https://source.unsplash.com/random'} alt={'teste'} width={500} height={500}/>
      </div>
      <div>
        <h2></h2>
        <span className='block'>local</span>
      </div>
    </div>
  </div>
);

export default ProfileMain;
