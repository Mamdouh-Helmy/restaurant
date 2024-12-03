import BackButton from "./BackButton";
import Language from "./Language";

export default function HeaderTwoButton({ bg = "#ffffff" }) {
  return (
    <div
      className={`flex items-center justify-between`}
      style={{ background: `${bg}` }}
    >
      <BackButton />
      <div className="slider-container px-4">
        <Language />
      </div>
    </div>
  );
}
