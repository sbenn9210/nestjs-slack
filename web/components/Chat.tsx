import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import EVENTS from "../config/events";
import { useGlobalContext } from "../context/global.context";
import { useSockets } from "../context/socket.context";
import Messages from "./Messages";

function Chat() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const { channelId } = useGlobalContext();

  function handleSendMessage({ message }: any) {
    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
      content: message,
      userId: "e5da3ef7-c977-4d67-9d2c-e77abecdaae1",
      channelId
    });
  }

  return (
    <div className="p-4 flex flex-col h-screen w-full">
      <div className="flex-grow">
        <Messages />
      </div>
      <Formik
        initialValues={{
          message: ""
        }}
        onSubmit={(values, { resetForm }) => {
          handleSendMessage(values);
          resetForm();
        }}
      >
        {(formik) => (
          <Form>
            <div className="flex gap-2 py-1 border-solid border-2 border-slate-300 rounded-md">
              <input
                id="message"
                type="text"
                {...formik.getFieldProps("message")}
                className="w-full block py-2 pl-2 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              <button
                type="submit"
                className="bg-green-800 text-white px-2 rounded-md"
              >
                send
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Chat;
