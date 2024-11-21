import { Circle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
type RatingProps = {
  keyTopics?: string[];
  score?: any;
  coveredTopics?: any;
  matchedTopics?: string[];
  feedback?: string;
  object: any;
  question?:any;
  answer?:any;
};
const ReviewCard = ({
  object,
  ...props
}: RatingProps) => {
  const {coveredTopics, score } = object
  const {answer, question } = props
  console.log(props, "props")
  
  
  

  //console.log(keyTopics, score, matchedTopics, feedback);
  
  return (
    <div className="text-secondary text-left flex flex-col gap-2">
      <h2 className="text-3xl font-bold ">{question}</h2>
      <h2 className="text-lg font-bold ">You answered: {answer}</h2>
      <h2 className="text-sm opacity-65">
        Rating is based on the following topics:
      </h2>
      {coveredTopics?.map((item:any,index:any)=>(
        <div key={index} className="bg-foreground place-items-center justify-between flex p-4 rounded-xl">
        <p className="w-2/4">{item.topic}</p>
        <Circle size={32} color={item.coverScore == 1 ? "#58fe63" : item.coverScore == 2 ? "#f3fe58" : "#fe5858"} weight="fill" />
      </div>
      ))}
      <h2 className="text-3xl font-bold ">Your overall score:</h2>
      <h2 className="text-6xl">{score}%</h2>
    </div>
  );
};

export default ReviewCard;
