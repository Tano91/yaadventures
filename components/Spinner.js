import { ColorRing } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ColorRing
        visible={true}
        height={80}
        width={80}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#1976D2", "#0072c5", "#006eb7", "#0069a9", "#00649b"]}
      />
    </div>
  );
}
