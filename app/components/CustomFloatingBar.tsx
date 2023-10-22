"use client";

import { MouseEvent, useRef } from "react";
import {
  GrClose,
  GrFormCheckmark,
  GrPaint,
  GrBold,
  GrMultimedia,
} from "react-icons/gr";
import { RiDeleteBin5Line, RiSave3Fill } from "react-icons/ri";
import { HiDocumentDuplicate } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { TimelineType } from "../../types";

const CustomFloatingBar = ({
  item,
  setItems,
  handleRemoveEvent,
  handleCustomiseEvent,
  handleImageUpload,
  items,
}: any) => {
  function handleComplete(item: TimelineType) {
    setItems((prevTextAreas: TimelineType[]) =>
      prevTextAreas.map((area) =>
        area.id === item.id ? { ...area, complete: !item.complete } : area
      )
    );
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div
      className={`${
        item.customise ? "flex items-start justify-start" : "hidden"
      }  absolute`}
    >
      <div className="mx-5 border rounded-full border-blue-100 ">
        <ul className="flex justify-center items-center">
          <li
            onClick={() => handleComplete(item)}
            className="block  border-r p-2 s text-sm hover:cursor-pointer hover:bg-gray-100"
          >
            {item.complete ? <FcCancel /> : <GrFormCheckmark />}
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
            <GrBold />
          </li>
          <li
            className={`block ${
              items.length === 1 ? "" : "border-r "
            }  p-2 s text-sm hover:cursor-pointer hover:bg-gray-100`}
          >
            <GrMultimedia onClick={handleIconClick} />

            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              ref={fileInputRef}
              onChange={(event) => handleImageUpload(event, item.id)}
            />
          </li>
          <li
            className={`   ${
              items.length === 1 && "hidden"
            } block  p-2 text-sm hover:cursor-pointer hover:bg-gray-100`}
          >
            <RiDeleteBin5Line onClick={() => handleRemoveEvent(item.id)} />
          </li>
        </ul>
      </div>
      <div className="border rounded-full border-blue-100 flex justify-center items-center p-2  text-sm hover:cursor-pointer hover:bg-gray-100">
        <GrClose
          onClick={(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) =>
            handleCustomiseEvent(e, item)
          }
        />
      </div>
    </div>
  );
};

export default CustomFloatingBar;
