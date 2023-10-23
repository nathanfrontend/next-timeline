import { TimelineType } from "@/types";

import CustomFloatingBar from "./CustomFloatingBar";

import ProgressLine from "./ProgressLine";
import { ChangeEvent, MouseEvent } from "react";
import EventCard from "./EventCard";
interface Props {
  item: TimelineType;
  items: TimelineType[];
  index: number;
  transition: string;
  setIndex: (
    prevTextAreas: number | ((prevTextAreas: number) => number)
  ) => void;
  setItems: (
    prevTextAreas:
      | TimelineType[]
      | ((prevTextAreas: TimelineType[]) => TimelineType[])
  ) => void;
}
const TimeLineEvent: React.FC<Props> = ({
  setItems,
  items,
  item,
  transition,
  index,
  setIndex,
}) => {
  const handleTextChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) => {
    const newValue = event.target.value;

    const { name } = event.target;

    setItems((prevTextAreas) =>
      prevTextAreas.map((area: TimelineType) =>
        area.id === id ? { ...area, [name]: newValue } : area
      )
    );
  };
  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement | Event>,
    id: number
  ) => {
    // const files = await event?.target?.files[0];

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      setItems((prevTextAreas) =>
        prevTextAreas.map((area: TimelineType) =>
          area.id === id ? { ...area, image: "/" + `${file.name}` } : area
        )
      );
    } else {
      console.log("No file selected");
    }
  };

  const handleRemoveEvent = (idToRemove: number) => {
    const updatedItems = items.filter((item) => item.id !== idToRemove);
    setItems(updatedItems);
  };

  function handleCustomiseEvent(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    { id, customise }: TimelineType
  ) {
    const isClose = e.currentTarget.localName === "svg" ? true : false;

    setItems((prevTextAreas) =>
      prevTextAreas.map((area: TimelineType) =>
        area.id === id ? { ...area, customise: !isClose ? true : false } : area
      )
    );
  }
  const handleToggleDetails = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    item: TimelineType
  ) => {
    const isOpen = e.currentTarget.localName === "svg" ? true : false;

    setItems((prevTextAreas) =>
      prevTextAreas.map((area: TimelineType) =>
        area.id === item.id
          ? { ...area, detailsVisible: !item.detailsVisible }
          : area
      )
    );
  };
  const handleSetIndex = () => {
    setIndex(index);
  };
  return (
    <li
      key={item.id}
      className="hidden sm:block sm:flex-item sm:flex-shrink-0 sm:relative sm:mb-6  sm:w-[300px]"
      onClick={handleSetIndex}
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

      <ProgressLine
        transition={transition}
        item={item}
        handleToggleDetails={handleToggleDetails}
      />

      {/* Alternate design where just timeline shows and user 
      can toggle between viewing detail card or not by clicking on icons
      {item.detailsVisible ? (
      <> */}
      <CustomFloatingBar
        items={items}
        item={item}
        setItems={setItems}
        handleCustomiseEvent={handleCustomiseEvent}
        handleRemoveEvent={handleRemoveEvent}
        handleImageUpload={handleImageUpload}
      />
      <EventCard
        items={items}
        item={item}
        handleCustomiseEvent={handleCustomiseEvent}
        handleRemoveEvent={handleRemoveEvent}
        handleImageUpload={handleImageUpload}
        handleTextChange={handleTextChange}
      />
      {/* </>
    ) : null} */}
    </li>
  );
};

export default TimeLineEvent;
