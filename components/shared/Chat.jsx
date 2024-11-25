"use client";
import React from "react";
import {
  useConnectionState,
  useRemoteParticipant,
  useChat,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { format } from "date-fns";
import { IoArrowDown } from "react-icons/io5";
import Image from "next/image";
import { Loader } from "lucide-react";

const Chat = ({ viewerName, hostIdentity, hostName }) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const { chatMessages: messages, send } = useChat();

  const isOnline = connectionState === ConnectionState.Connected && participant;

  const [value, setValue] = React.useState("");

  const reversedMessages = React.useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value) => {
    setValue(value);
  };

  if (!isOnline) {
    return (
      <div className=" w-full p-12  h-32  flex bg-slate-50 rounded-md flex-col  items-center justify-center gap-3">
        <p className="text-slate-500 tracking-wide font-semibold">
          Chat is disabled
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="my-2">
        <h2 className="flex items-center gap-2 mb-4 font-bold 2xl:text-lg">
          Comments
          <IoArrowDown className="text-lg" />
        </h2>

        <ChatList messages={reversedMessages} />

        <ChatForm value={value} onChange={onChange} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default Chat;

const ChatForm = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return;
    onSubmit();
  };

  return (
    <form
      className=" w-full flex bg-[#38B6FF]/15 p-2 px-3  rounded-xl  items-center  justify-between mb-2 gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center w-full gap-1.5">
        <Image
          src="/avatar-blue.svg"
          width={46}
          height={46}
          alt="profile"
          className="rounded-full"
        />
        <input
          type="text"
          className=" border-none bg-transparent w-full  text-slate-600 focus:outline-none pl-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
        />
      </div>

      <button type="submit" className="">
        <Image
          src="/export.svg"
          width={20}
          height={20}
          alt="like"
          className="cursor-pointer invert"
        />{" "}
      </button>
    </form>
  );
};

const ChatList = ({ messages }) => {
  if (!messages || messages.length === 0)
    return (
      <div className=" w-full p-12  h-32   flex  rounded-md flex-col  items-center justify-center gap-3">
        <p className="text-slate-500 tracking-wide font-semibold">
          No messages yet
        </p>
      </div>
    );

  return (
    <div className=" flex flex-col-reverse gap-2 max-h-56 overflow-y-auto my-4 min-h-32   ">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} message={message} />
      ))}
    </div>
  );
};

const ChatMessage = ({ message }) => {
  console.log("🚀 ~ ChatMessage ~ message:", message);

  const color = stringToColor(message.from.name || message.from.username || "");

  return (
    <div className="flex items-center  gap-1.5 ">
      <Image
        src="/avatar.svg"
        width={56}
        height={56}
        alt="profile"
        className="rounded-full"
      />

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <p className={` text-sm  capitalize font-semibold`} style={{ color }}>
            {message.from.name || message.from.username}
          </p>
          <span className="text-xs 2xl:textsm text-slate-600">
            {format(message.timestamp, "hh:mm a")}{" "}
          </span>
        </div>
        <p className="text-xs 2xl:text-sm ">{message.message}</p>
      </div>
    </div>
  );
};

export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(1) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};
