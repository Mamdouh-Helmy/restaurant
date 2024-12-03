import Slider from "../components/Slider";
import Banner from "../components/Banner";
import SelectAddress from "../components/SelectAddress";

export default function Home() {
  return (
    <>
      <div className="slider-container">
        <Slider />
      </div>
      <Banner />
      <SelectAddress />
    </>
  );
}
