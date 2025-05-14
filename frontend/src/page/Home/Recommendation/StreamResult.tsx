import React, { useState } from "react";
import { WordRotate } from "@/components/magicui/word-rotate";
import { RippleButton } from "@/components/magicui/ripple-button";

interface StreamResultProps {
  streamName: string;
  serViewResultStep: (result: number) => void;
}

const StreamResult: React.FC<StreamResultProps> = ({
  streamName = "Computer Science",
  serViewResultStep,
}) => {
  const words = [
    "Finding the perfect Career path for you ...",
    "We found a Match!",
    "and it says that you should choose...",
    streamName,
  ];

  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Manually trigger rotation without useEffect
  const rotateWords = () => {
    if (index < words.length - 1) {
      setTimeout(() => setIndex((prev) => prev + 1), 2500);
    } else if (!showButton) {
      setTimeout(() => setShowButton(true), 1500);
    }
  };

  // Trigger the timer logic manually once during render
  rotateWords();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 text-center">
      <WordRotate
       className="text-6xl font-bold "
        words={[words[index]]}
      />

      {showButton && (
        <div className="mt-8">
     <RippleButton onClick={()=> serViewResultStep(3)}>Find more college</RippleButton>
     </div>
      )}
    </div>
  );
};

export default StreamResult;
