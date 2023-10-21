"use client";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";
import { GrAdd, GrClose, GrFormCheckmark, GrPaint } from "react-icons/gr";
import { RiDeleteBin5Line, RiDragMove2Fill, RiSave3Fill } from "react-icons/ri";
import { HiDocumentDuplicate } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { initialItems } from "../util/initialItems";
const transition =
  "transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-green-300 duration-300";
const globalSettings = {
  timelineColor: "",
  backgroundImage: "",
  title: "",
};

const Timeline = () => {
  const [items, setItems] = useState(initialItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleTextChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) => {
    const newValue = event.target.value;

    const { name } = event.target;
    if (name === "description") {
      setItems((prevTextAreas) =>
        prevTextAreas.map((area) =>
          area.id === id ? { ...area, description: newValue } : area
        )
      );
    }
    if (name === "date") {
      setItems((prevTextAreas) =>
        prevTextAreas.map((area) =>
          area.id === id ? { ...area, date: newValue } : area
        )
      );
    }
    if (name === "title") {
      setItems((prevTextAreas) =>
        prevTextAreas.map((area) =>
          area.id === id ? { ...area, title: newValue } : area
        )
      );
    }
  };
  const handleAddEvent = () => {
    const copiedInitial = JSON.parse(JSON.stringify(initialItems));
    const idExists = items.some((obj) => obj.id === items.length);
    copiedInitial[0].id = idExists
      ? Math.floor(Math.random() * 900)
      : Math.floor(Math.random() * 900);

    setItems((prevItems) => [...prevItems, copiedInitial[0]]);
  };
  const handleImageUpload = async (event: any, id: number) => {
    const files = await event.target.files[0];

    if (files?.length !== 0) {
      setItems((prevTextAreas) =>
        prevTextAreas.map((area) =>
          area.id === id ? { ...area, image: "/" + `${files.name}` } : area
        )
      );
    }
  };

  const handleRemoveEvent = (idToRemove: number) => {
    const updatedItems = items.filter((item) => item.id !== idToRemove);
    setItems(updatedItems);
  };

  function handleCustomiseEvent(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    { id, customise }: any
  ) {
    const isClose = e.currentTarget.localName === "svg" ? true : false;

    setItems((prevTextAreas) =>
      prevTextAreas.map((area) =>
        area.id === id ? { ...area, customise: !isClose ? true : false } : area
      )
    );
  }

  function handleComplete(item: any) {
    setItems((prevTextAreas) =>
      prevTextAreas.map((area) =>
        area.id === item.id ? { ...area, complete: !item.complete } : area
      )
    );
  }

  return (
    <div>
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
            <li className="block  p-2 text-sm hover:cursor-pointer hover:bg-gray-100">
              <RiDeleteBin5Line />
            </li>
          </ul>
        </div>
      </div>

      <div className="flex">
        <h1 className="text-3xl font-bold mx-5">Timeline</h1>
        <button
          className={`px-4 border rounded-full border-blue-100 ${transition}`}
          onClick={() => handleAddEvent()}
        >
          <span className="flex items-center">
            <GrAdd className="mr-2" /> <p className="text-md">Add Event</p>
          </span>
        </button>
      </div>

      <ol className="items-center sm:flex mt-10">
        {items.map((item, index) => (
          <li
            key={index}
            className="relative mb-6 sm:mb-0  w-auto sm:w-[300px]"
          >
            <div className="px-5 mb-5  relative ">
              <input
                type="date"
                name="date"
                min={items[index - 1]?.date}
                className="mt-3 w-full sm:pr-8 hover:cursor-text hover:bg-red-300 resize-none rounded-lg border p-1 border-blue-100"
                value={item.date}
                onChange={(event) => handleTextChange(event, item.id)}
              />
            </div>
            <div className="flex items-center ">
              <div
                className={`z-10 ${
                  item.complete ? "flex" : "hidden"
                }  items-center justify-center w-6 h-6 bg-green-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0 ${transition}`}
              >
                <svg
                  className="w-2.5 h-2.5 text-green-800 dark:text-green-300 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                </svg>
              </div>

              <div
                className={`hidden sm:flex w-full  ${
                  item.complete ? "bg-green-800" : "bg-gray-200"
                } h-0.5 dark:bg-gray-700 hover:bg-gray-700 hover:cursor-pointer`}
              />
            </div>
            <div
              className={`${
                item.customise ? "flex items-center justify-center " : "hidden"
              }  absolute mt-2`}
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
                  <li className="block  p-2 text-sm hover:cursor-pointer hover:bg-gray-100">
                    <RiDeleteBin5Line
                      onClick={() => handleRemoveEvent(item.id)}
                    />
                  </li>
                </ul>
              </div>
              <div className="border rounded-full border-blue-100 flex justify-center items-center p-2  text-sm hover:cursor-pointer hover:bg-gray-100">
                <GrClose
                  name="close"
                  onClick={(
                    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
                  ) => handleCustomiseEvent(e, item)}
                />
              </div>
            </div>
            <div
              className={`relative h-[350px] border rounded-sm border-blue-100 m-5 mt-14 flex flex-col cursor-pointer ${
                !item.image && "hover:bg-gray-300 "
              }`}
              onClick={(e) => handleCustomiseEvent(e, item)}
            >
              <div className="flex justify-center  w-full h-2/4">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt="Burberry"
                    className="w-full"
                    width={200}
                    height={100}
                  />
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
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
                          onChange={(event) =>
                            handleImageUpload(event, item.id)
                          }
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
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
