import { Formik, Form } from "formik";
import React from "react";
import TextInput from "../TextInput";
import * as Yup from "yup";
import { useSockets } from "../../context/socket.context";
import EVENTS from "../../config/events";

interface CreateChannelFormProps {
  setOpen: Function;
}

function CreateChannelForm({ setOpen }: CreateChannelFormProps) {
  const { socket, roomId, rooms } = useSockets();

  async function handleOnSubmit(values: any) {
    let { roomName, description } = values;

    roomName = roomName.trim();

    const newChannel = {
      name: roomName,
      description: description,
      public: false
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newChannel)
    };

    const res = await fetch("http://localhost:3333/channels", settings);
    const channel = await res.json();
    console.log(channel);
  }

  return (
    <Formik
      initialValues={{
        roomName: "",
        description: ""
      }}
      validationSchema={Yup.object().shape({
        roomName: Yup.string()
          .required()
          .matches(
            /^[a-zA-Z0-9@]+$/,
            "This field cannot contain spaces and special character"
          )
      })}
      onSubmit={handleOnSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="my-8">
          <TextInput
            name="roomName"
            type="text"
            label="Name"
            placeholder="e.g. plan-budget"
          />
          <TextInput
            name="description"
            type="text"
            label="Description (optional)"
            description="What's this channel about?"
          />

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              disabled={!(isValid && dirty)}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Create
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateChannelForm;
