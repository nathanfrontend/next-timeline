"use client";

import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { TimelineType } from "@/types";
import { initialItems } from "../../util/InitialItems";
import GlobalFloatingBar from "../../components/GlobalFloatingBar";

import TimeLineEvent from "../../components/TimeLineEvent";
import TimeLineEventMobile from "../../components/TimeLineEventMobile";
import Sliders from "../../components/Sliders";
import RearrageEvents from "../../components/RearrageEvents";
const transition =
  "transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-green-100 duration-300";
const globalSettings = {
  timelineColor: "",
  backgroundImage: "",
  title: "",
};

const Timeline = () => {
  const [items, setItems] = useState<TimelineType[]>(initialItems);
  const [mobileIndex, setIndex] = useState<number>(0);
  const [rearrange, setRearrange] = useState<boolean>(false);
  const [isMobile, setIsmobile] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsmobile(false);
      } else if (window.innerWidth < 767) {
        setIsmobile(true);
      }
    };
    handleResize();
  }, []);
  console.log(isMobile);
  const handleAddEvent = () => {
    const copiedInitial: TimelineType[] = JSON.parse(
      JSON.stringify(initialItems)
    );

    copiedInitial[0].id = Math.floor(Math.random() * 900);

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
            setIndex={setIndex}
          />
        ))}
        {isMobile && (
          <TimeLineEventMobile
            items={items}
            transition={transition}
            index={mobileIndex}
            setItems={setItems}
            setIndex={setIndex}
          />
        )}
      </ol>
      <Sliders items={items} setIndex={setIndex} index={mobileIndex} />
    </div>
  );
};

export default Timeline;
