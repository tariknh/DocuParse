import { Circle } from "@phosphor-icons/react";
type RatingProps = {
  keyTopics?: string[];
  score?: string;
  matchedTopics?: string[];
  feedback?: string;
};
const ReviewCard = ({
  keyTopics,
  score,
  matchedTopics,
  feedback,
}: RatingProps) => {
  console.log(keyTopics, score, matchedTopics, feedback);
  return (
    <div className="text-secondary text-left flex flex-col gap-2">
      <h2 className="text-3xl font-bold ">What is an operating system?</h2>

      <h2 className="text-sm opacity-65">
        Rating is based on the following topics:
      </h2>
      <div className="bg-foreground place-items-center justify-between flex p-4 rounded-xl">
        <p className="w-2/4">Definition of an Operating System</p>
        <Circle size={32} color="#58fe63" weight="fill" />
      </div>
      <div className="bg-foreground place-items-center justify-between flex p-4 rounded-xl">
        <p className="w-2/4">Definition of an Operating System</p>
        <Circle size={32} color="#f3fe58" weight="fill" />
      </div>
      <div className="bg-foreground place-items-center justify-between flex p-4 rounded-xl">
        <p className="w-2/4">Definition of an Operating System</p>
        <Circle size={32} color="#fe5858" weight="fill" />
      </div>
      <h2 className="text-3xl font-bold ">Your overall score:</h2>
      <h2 className="text-6xl">54%</h2>
    </div>
  );
};

export default ReviewCard;
