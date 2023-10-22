import Timeline from "./pages/Timeline/Timeline";

export default function Home() {
  return (
    <div className="container bg-gray-50 mx-auto sm:my-5 w-full lg:w-3/4 h-full px-10 pt-5 overflow-x-scroll">
      <div>
        <Timeline />
      </div>
    </div>
  );
}
