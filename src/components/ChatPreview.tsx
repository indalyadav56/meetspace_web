import Lottie from "react-lottie";
import animationData from "../assets/chat.json";

export default function ChatPreview() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <Lottie options={defaultOptions} height={400} width={400} />
      <h1 className="text-2xl">Start Chat</h1>
    </main>
  );
}
