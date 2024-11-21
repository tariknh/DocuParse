"use client";

import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToolInvocation } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [inputAnswer, setInputAnswer] = useState("");

  const handleCustomSubmit = (event: any) => {
    event.preventDefault();

    handleSubmit(event, {
      body: {
        inputAnswer: inputAnswer,
      },
    });
    setInputAnswer("");
  };
  console.log(messages, "messages");

  return (
    <div className="text-white">
      {/* {messages.map((message) => {

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
      })} */}

      <form onSubmit={handleCustomSubmit}>
        <div className="flex flex-col gap-2 p-8 place-content-center h-full">
          <Input
            className="bg-secondary text-primary"
            value={input}
            onChange={handleInputChange}
            placeholder="Type what you want to explain..."
          />
          <Textarea
            className="bg-secondary text-primary"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            placeholder="Explain it!"
          />
          <Button className="bg-foreground" type="submit">
            How is my explanation?
          </Button>
        </div>
        <div className="p-8">{/* <ReviewCard /> */}</div>
        <div className="p-8">
          {messages.map((message) => (
            <div id={message.id} key={message.id}>
              {/* {message.role === "user" ? "User: " : "AI: "}
          {message.content} */}
              <div>
                {message.toolInvocations?.map(
                  (toolInvocation: ToolInvocation) => {
                    const { toolName, toolCallId, state } = toolInvocation;

                    if (state === "result") {
                      if (toolName) {
                        const { result, args } = toolInvocation;
                        console.log("TOOLINVOCATION", result, args.question);
                        return (
                          <div key={toolCallId}>
                            <ReviewCard
                              {...result}
                              {...args}
                              question={args.question}
                            />
                          </div>
                        );
                      }
                    } else {
                      return (
                        <div key={toolCallId}>
                          {toolName ? <div>Loading answer...</div> : null}
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
