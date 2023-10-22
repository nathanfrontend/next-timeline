import FloatingBar from "./components/GlobalFloatingBar";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <div className="container bg-gray-50 mx-auto my-5 w-full lg:w-3/4 h-full px-10 pt-5 overflow-x-scroll">
      <div>
        <div>{/* <FloatingBar /> */}</div>

        <Timeline />
      </div>
    </div>
  );
}
