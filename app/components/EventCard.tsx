import { TimelineType } from "@/types";
import Image from "next/image";
import React from "react";
import { GrClose } from "react-icons/gr";
interface Props {
  item: TimelineType;
  handleCustomiseEvent: Function;
  handleRemoveEvent: Function;
  handleImageUpload: Function;
  handleTextChange: Function;
}
const EventCard: React.FC<Props> = ({
  item,
  handleCustomiseEvent,
  handleRemoveEvent,
  handleImageUpload,
  handleTextChange,
}) => {
  return (
    <div
      className={`relative h-[350px] border rounded-sm border-blue-100 m-5  overflow-hidden ${
        item.customise && "mt-14"
      } sm:mt-10 flex flex-col cursor-pointer ${
        !item.image && "hover:bg-gray-300 "
      }`}
      onClick={(e) => handleCustomiseEvent(e, item)}
    >
      <div className="flex justify-center  w-full h-2/4">
        {item.image ? (
          <div>
            <Image
              src={item.image}
              alt="Burberry"
              className="w-full"
              width={200}
              height={100}
            />
          </div>
        ) : (
          <>
            <div className="w-full ">
              <GrClose
                className="  m-2 absolute flex justify-end items-end right-0 text-gray-500 dark:text-gray-400"
                onClick={() => handleRemoveEvent(item.id)}
              />
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-start w-full h-full p-1 border-gray-300  cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center ">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    MVP - Use files in public folder
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  onChange={(event) => handleImageUpload(event, item.id)}
                />
              </label>
            </div>
          </>
        )}
      </div>
      <textarea
        name="title"
        className=" text-md flex h-1/3 m:pr-8 p-1 hover:cursor-text  border-t border-blue-100  hover:bg-red-300 resize-none   "
        value={item.title}
        onChange={(event) => handleTextChange(event, item.id)}
        placeholder="Title"
      />
      <textarea
        placeholder="Description"
        name="description"
        className=" text-sm flex h-2/3 m:pr-8 p-1 hover:cursor-text border-t border-blue-100  hover:bg-red-300 resize-none   "
        value={item.description}
        onChange={(event) => handleTextChange(event, item.id)}
      />
    </div>
  );
};

export default EventCard;
