import React from "react";
import { TimelineType } from "../../types";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
interface Props {
  setMobileIndex: (value: number | ((prevVar: number) => number)) => void;
  index: number;
  items: TimelineType[];
}
const Sliders: React.FC<Props> = ({ items, setMobileIndex, index }) => {
  const handleNextEvent = () => {
    const isLastSlide = index === items.length - 1;
    const newIndex = isLastSlide ? items.length - 1 : index + 1;
    setMobileIndex(newIndex);
  };
  const handleEventEnd = () => {
    setMobileIndex(items.length - 1);
  };
  const handleEventStart = () => {
    setMobileIndex(0);
  };
  const handlePreviousEvent = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? 0 : index - 1;
    setMobileIndex(newIndex);
  };
  return (
    <div className="flex justify-center px-4 mb-4 sm:hidden">
      {/* Left arrow */}
      <div className={`${index === 0 && "hidden"}`}>
        <button
          disabled={index === 0}
          className="text-2xl rounded-full mx-2 bg-black/20 text-white cursor-pointer"
          onClick={handleEventStart}
        >
          <MdKeyboardDoubleArrowLeft size={30} />
        </button>
        <button
          disabled={index === 0}
          className="text-2xl rounded-full mx-2 bg-black/20 text-white cursor-pointer"
          onClick={handlePreviousEvent}
        >
          {" "}
          <MdKeyboardArrowLeft size={30} />
        </button>
      </div>
      {/* Right Arrow */}
      <div className={`${index === items.length - 1 && "hidden"}`}>
        <button
          className={` text-2xl rounded-full mx-2 bg-black/20 text-white cursor-pointer`}
          onClick={handleNextEvent}
        >
          <MdKeyboardArrowRight size={30} />
        </button>
        <button
          disabled={index === items.length - 1}
          className="text-2xl rounded-full mx-2 bg-black/20 text-white cursor-pointer"
          onClick={handleEventEnd}
        >
          <MdKeyboardDoubleArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Sliders;
