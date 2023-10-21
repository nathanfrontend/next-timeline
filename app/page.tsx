import FloatingBar from "./components/FloatingBar";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <div className="container bg-gray-50 mx-auto mt-5 w-full sm:w-3/4 h-full p-10 overflow-x-scroll">
      <div>
        <div>{/* <FloatingBar /> */}</div>

        <Timeline />
      </div>
    </div>
  );
}
