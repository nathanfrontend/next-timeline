import React from "react";
import { TimelineType } from "../../types";
interface Props {
  items: TimelineType[];
}
const RearrageEvents: React.FC<Props> = ({ items }) => {
  return (
    <div className="flex mb-8 ">
      <div className="mx-5 border rounded-full border-blue-100 ">
        <ul className="flex  justify-center items-center">
          {items.map(({ title, id }, index) => (
            <li
              key={id}
              className={`flex w-full justify-center items-center ${
                index === items.length - 1 ? "" : "border-r"
              } p-2 s text-sm hover:cursor-pointer hover:bg-gray-100`}
            >
              {title === "" ? index : title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RearrageEvents;
