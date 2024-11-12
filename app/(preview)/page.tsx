"use client";

import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { useState } from "react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [inputAnswer, setInputAnswer] = useState("");

  const handleCustomSubmit = (event: any) => {
    event.preventDefault();
    console.log(event, "inside custom submit");
    handleSubmit(event, {
      body: {
        inputAnswer: inputAnswer,
      },
    });
    setInputAnswer("");
  };
  console.log(messages);

  return (
    <div>
      {/* {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
          <div>
            {message.toolInvocations?.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === "result") {
                if (toolName === "displayWeather") {
                  const { result } = toolInvocation;
                  return (
                    <div key={toolCallId}>
                      <Weather {...result} />
                    </div>
                  );
                }
              } else {
                return (
                  <div key={toolCallId}>
                    {toolName === "displayWeather" ? (
                      <div>Loading weather...</div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))} */}
      {messages.map((message) => {
        if (message.role === "function") {
          const { name, content } = message;
          const { keyTopics, score, matchedTopics, feedback } =
            JSON.parse(content);

          return (
            <ReviewCard
              key={message.id}
              keyTopics={keyTopics}
              score={score}
              matchedTopics={matchedTopics}
              feedback={feedback}
            />
          );
        }
      })}

      <form onSubmit={handleCustomSubmit}>
        <div className="flex flex-col gap-2 p-8 place-content-center h-full">
          <Input
            className="bg-secondary"
            value={input}
            onChange={handleInputChange}
            placeholder="Type what you want to explain..."
          />
          <Textarea
            className="bg-secondary"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            placeholder="Explain it!"
          />
          <Button type="submit">How is my explanation?</Button>
        </div>
      </form>
    </div>
  );
}
