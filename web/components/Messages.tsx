import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useGlobalContext } from "../context/global.context";
import { fetchItems } from "../utils/fetchUtils";

type Message = {
  id: string;
  userId: string;
  content: string;
  channelId: string;
  createdAt: string;
};

export default function Messages() {
  const { channelId } = useGlobalContext();
  const { data } = useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => fetchItems(`channels/${channelId}`)
  });

  return (
    <div className="p-4">
      {data?.Message?.map((message: Message) => (
        <span className="block" key={message.id}>
          {message.content}
        </span>
      ))}
    </div>
  );
}
