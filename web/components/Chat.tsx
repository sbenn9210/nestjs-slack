import React from "react";
import Messages from "./Messages";

function Chat() {
  return (
    <div className="p-4 flex flex-col h-screen w-full">
      <div className="flex-grow">
        <Messages />
      </div>
      <div className="flex gap-2 py-8 border-solid border-2 border-sky-400 rounded-md">
        <input
          type="text"
          className="w-full block py-2 rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
        <button className="bg-green-800 text-white px-2 rounded-md">
          send
        </button>
      </div>
    </div>
  );
}

export default Chat;
