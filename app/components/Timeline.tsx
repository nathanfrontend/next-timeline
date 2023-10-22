"use client";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { GrAdd, GrClose } from "react-icons/gr";
import { TimelineType } from "@/types";
import { initialItems } from "../util/InitialItems";
import GlobalFloatingBar from "./GlobalFloatingBar";
import CustomFloatingBar from "./CustomFloatingBar";
import ProgressLine from "./ProgressLine";

import EventCard from "./EventCard";
import TimeLineEvent from "./TimeLineEvent";
import TimeLineEventMobile from "./TimeLineEventMobile";
import Sliders from "./Sliders";
import RearrageEvents from "./RearrageEvents";
const transition =
  "transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-green-100 duration-300";
const globalSettings = {
  timelineColor: "",
  backgroundImage: "",
  title: "",
};

const Timeline = () => {
  const [items, setItems] = useState<TimelineType[]>(initialItems);
  const [mobileIndex, setMobileIndex] = useState<number>(0);
  const [rearrange, setRearrange] = useState<boolean>(false);

  const handleAddEvent = () => {
    const copiedInitial: TimelineType[] = JSON.parse(
      JSON.stringify(initialItems)
    );
    const idExists = items.some((obj) => obj.id === items.length);
    copiedInitial[0].id = idExists
      ? Math.floor(Math.random() * 900)
      : Math.floor(Math.random() * 900);

    setItems((prevItems) => [...prevItems, copiedInitial[0]]);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex sm:flex-row">
        {" "}
        <div>
          <GlobalFloatingBar setRearrange={setRearrange} />
        </div>
        <div>{rearrange && <RearrageEvents items={items} />}</div>
      </div>

      <div className="flex">
        <h1 className="text-3xl font-bold mx-5">Timeline</h1>
        <button
          className={`px-4 border rounded-full border-blue-100 ${transition}`}
          onClick={() => handleAddEvent()}
        >
          <span className="flex items-center">
            <GrAdd className="mr-2" />{" "}
            <p className="text-sm sm:text-md">Add Event</p>
          </span>
        </button>
      </div>

      <ol className="items-center sm:flex sm:flex-container mt-4 sm:mt-10">
        {items.map((item, index) => (
          // Desktop view: Original component layout
          <TimeLineEvent
            key={item.id}
            items={items}
            item={item}
            transition={transition}
            index={index}
            setItems={setItems}
          />
        ))}
        <TimeLineEventMobile
          items={items}
          transition={transition}
          index={mobileIndex}
          setItems={setItems}
        />
      </ol>
      <Sliders
        items={items}
        setMobileIndex={setMobileIndex}
        index={mobileIndex}
      />
    </div>
  );
};

export default Timeline;
