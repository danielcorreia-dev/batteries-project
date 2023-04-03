import classNames from 'classnames';
import { FC, forwardRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
interface EditProps {
  isActive: boolean;
  forwardRef: any;
  avatar?: string;
  name?: string;
  location?: string;
  bio?: string;
}

const EditProfile: FC<EditProps> = ({ isActive, forwardRef }) => {
  

  return (
    <div
      className={classNames(
        'flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 bg-neutral-600 bg-opacity-25',
        { hidden: isActive === false }
      )}
    >
      <div
        ref={forwardRef}
        // Temporary width
        className="h-16 w-[400px] max-w-2xl bg-white shadow-md shadow-neutral-300 rounded p-4"
      >
        <RiCloseLine size={24}/>
      </div>
    </div>
  );
};

export default EditProfile;
