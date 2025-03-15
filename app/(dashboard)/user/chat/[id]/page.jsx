"use client";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSocket } from "@/lib/SocketContext";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

const socket = io("http://localhost:4000");

export default function AdminChat({ params: { id } }) {
  const [roomId, setRoomId] = useState(null);
  const [roomData, setRoomData] = useState({});
  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ AdminChat ~ messages:", messages);
  const [receiver, setReceiver] = useState({});
  const [message, setMessage] = useState("");
  const { isConnected } = useSocket();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Prevent duplicate room creation
  const hasCreatedRoom = useRef(false);

  useEffect(() => {
    if (!hasCreatedRoom.current) {
      createRoom();
      hasCreatedRoom.current = true; // Mark as executed
    }

    socket.on("receive-message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receive-message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createRoom = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/room`,
        {
          user1: "bluProTeamId4fa3b926e43a",
          user2: id,
        }
      );

      setRoomId(data._id);
      getReceiverDetails();
      setRoomData(data);
      socket.emit("join-room", data._id);

      const messagesRes = await axios.get(
        `http://localhost:4000/chat/messages/${data._id}`
      );
      setMessages(messagesRes.data);
    } catch (error) {
      console.error("Error creating/joining room:", error);
    }
  };

  const getReceiverDetails = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/getSingleUser`,
        {
          userId: id,
        }
      );
      setReceiver(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "bluepro");
      formData.append("cloud_name", "dbfn18wm7");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dbfn18wm7/image/upload",
        formData
      );

      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const sendMessage = async () => {
    if (!roomId) return;
    console.log("🚀 ~ sendMessage ~ roomId");

    try {
      let mediaUrl = "";
      if (image) {
        mediaUrl = await uploadToCloudinary(image);
        setImage(null);
        setImagePreview(null);
      }

      socket.emit("send-message", {
        roomId,
        sender: "bluProTeamId4fa3b926e43a",
        text: message,
        mediaUrl,
      });
      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       sender: "bluProTeamId4fa3b926e43a",
      //       text: message,
      //       mediaUrl: "",
      //     },
      //   ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full p-3 2xl:p-4 space-y-4 bg-slate-50 pb-16">
      <Link href={"/user"} className="flex items-center gap-2">
        <FaArrowLeftLong className="text-xl" />
        <div className="text-lg font-semibold">
          Back
          {isConnected ? (
            <span className="text-green-500"> Connected</span>
          ) : (
            <span className="text-red-500"> Disconnected</span>
          )}
        </div>
      </Link>
      <h3 className="text-xl 2xl:text-2xl font-bold">User Chat</h3>

      <div className=" w-full bg-white p-5 2xl:p-6 rounded-lg">
        <div className=" w-full pb-4 border-b border-slate-100 flex items-center gap-2">
          <div className=" w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image
              src={receiver?.imageUrl || "/avatar.svg"}
              alt="profile picture"
              width={50}
              height={50}
              className=" object-cover"
            />
          </div>
          <p className=" font-bold 2xl:text-lg capitalize px-2">
            {receiver?.name}
          </p>
        </div>
        <div className=" w-full  h-full min-h-[70svh] flex flex-col gap-2.5 pt-8 pb-4 items-center justify-center">
          <div className="flex items-center ">
            <div className=" w-[40px] h-[40px] rounded-lg -rotate-3 bg-red-50 overflow-hidden">
              <Image
                src={receiver?.imageUrl || "/avatar.svg"}
                alt="profile picture"
                width={60}
                height={60}
                className=" object-cover w-full h-full"
              />
            </div>
            <div className=" w-[40px] h-[40px] rounded-lg rotate-12 bg-[#38B6FF1A] flex items-center justify-center overflow-hidden">
              <p className="">A</p>
            </div>
          </div>
          <p className="text-sm 2xl:text-base  capitalize ">
            {receiver?.name} & BluPro Team
          </p>
          {roomData?.lastMessageTime && (
            <p className="text-xs 2xl:text-sm text-center text-[#9C9C9C] font-semibold capitalize ">
              Last message on {roomData?.lastMessageTime.split("T")[0]}
            </p>
          )}

          <div className=" w-full max-h-[55svh] pr-5 overflow-y-auto overflow-x-hidden flex gap-4 py-4 flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.sender === "bluProTeamId4fa3b926e43a"
                    ? "flex-row-reverse"
                    : ""
                } flex items-center gap-2`}
              >
                <div
                  className={`${
                    msg.sender === "bluProTeamId4fa3b926e43a"
                      ? "bg-[#38B6FF1A] rotate-12"
                      : "bg-[#F2F2F2]"
                  } w-[40px] h-[40px] rounded-full overflow-hidden`}
                >
                  <Image
                    src={
                      msg.sender === "bluProTeamId4fa3b926e43a"
                        ? "/avatar-blue.svg"
                        : receiver?.imageUrl
                    }
                    alt="profile picture"
                    width={50}
                    height={50}
                    className=" object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {msg.text && (
                    <div
                      className={`${
                        msg.sender === "bluProTeamId4fa3b926e43a"
                          ? "bg-[#38B6FF1A] text-black"
                          : "bg-[#F2F2F2]"
                      } px-4 py-2.5 rounded-lg`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  )}
                  {msg.mediaUrl && (
                    <Image
                      src={msg.mediaUrl}
                      width={150}
                      height={150}
                      alt="hehe"
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className=" w-full flex justify-end mt-auto">
            {imagePreview && (
              <div className="flex items-start gap-2">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={130}
                  height={130}
                  className="rounded-lg"
                />
                <button onClick={() => setImagePreview(null)}>
                  <RxCross2 />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4  w-full">
            <div className=" relative cursor-pointer">
              <button>
                <Image
                  src="/attach-circle.svg"
                  width={30}
                  height={30}
                  alt="send"
                />
              </button>
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <div className=" w-full border border-[#ECECEC] rounded-lg py-2.5 px-4 flex gap-3 items-center ">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Type your message"
                className=" w-full outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!message && !image}
                className=" disabled:opacity-50"
              >
                <Image src="/send-2.svg" width={30} height={30} alt="send" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
