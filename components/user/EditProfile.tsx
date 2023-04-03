import classNames from "classnames";
import { FC, forwardRef } from "react";

interface EditProps {
  isActive: boolean;
  forwardRef: any;
}

const EditProfile: FC<EditProps> = ({ isActive, forwardRef}) => {

  return (
  <div className={classNames('flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 bg-neutral-600 bg-opacity-25', {'hidden': isActive === false})}>
    <div ref={forwardRef} className="h-16 w-16 bg-white shadow-md shadow-neutral-300 rounded p-4">
      <h1>oi</h1>
    </div>
  </div>
  );
};

export default EditProfile;
