"use client";

import { useChat } from "ai/react";

export const Chat = (props: { agent: string }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [{ id: "1", role: "system", content: props.agent }],
  });
  return (
    <div>
      {messages
        .filter((m) => m.role !== "system") // Filter out system messages
        .map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};
