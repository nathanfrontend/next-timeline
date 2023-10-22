import React from "react";
import { GrPaint } from "react-icons/gr";
import { HiDocumentDuplicate } from "react-icons/hi";
import { RiDeleteBin5Line, RiDragMove2Fill, RiSave3Fill } from "react-icons/ri";
import { TbReorder } from "react-icons/tb";
interface Props {
  setRearrange: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
const GlobalFloatingBar: React.FC<Props> = ({ setRearrange }) => {
  const handleToggleRearrange = () => setRearrange((prev: boolean) => !prev);

  return (
    <div className="flex mb-8 ">
      <div className="mx-5 border rounded-full border-blue-100 ">
        <ul className="flex justify-center items-center">
          <li className="block  border-r p-2 s text-sm hover:cursor-pointer hover:bg-gray-100">
            <RiDragMove2Fill />
          </li>
          <li className="block  border-r p-2 s text-sm hover:cursor-pointer hover:bg-gray-100">
            <GrPaint />
          </li>{" "}
          <li className="block  border-r p-2 s text-sm hover:cursor-pointer hover:bg-gray-100 ">
            <RiSave3Fill />
          </li>
          <li className="block border-r  p-2 s text-sm hover:cursor-pointer hover:bg-gray-100">
            <HiDocumentDuplicate />
          </li>
          <li className="block border-r  p-2 s text-sm hover:cursor-pointer hover:bg-gray-100">
            <button onClick={handleToggleRearrange}>
              <TbReorder />
            </button>
          </li>
          <li className="block  p-2 text-sm hover:cursor-pointer hover:bg-gray-100">
            <RiDeleteBin5Line />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GlobalFloatingBar;
