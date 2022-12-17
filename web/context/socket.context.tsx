import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import EVENTS from "../config/events";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; username: string; time: string }[];
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:3333";

const socket = io(SOCKET_URL);

socket.onAny((event, ...args) => {
  console.log(event, args);
});

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: []
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        messages,
        setMessages,
        roomId
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
