"use client";

import { FC, useRef, useState } from "react";
import TextareaAutosizeProps from "react-textarea-autosize";

interface ChatInputProps {
  chatPartner: User;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner }) => {
  const [input, setInput] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const sendMessage = async () => {};

  return (
    <div className="broder-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="reltive flex flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosizeProps
          ref={textAreaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message to ${chatPartner.name}`}
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;