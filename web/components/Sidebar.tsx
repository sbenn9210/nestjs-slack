/* This example requires Tailwind CSS v2.0+ */
import { HashtagIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useGlobalContext } from "../context/global.context";
import { fetchItems } from "../utils/fetchUtils";
import Dropdown from "./Dropdown";
import CreateChannelForm from "./forms/CreateChannelForm";
import Modal from "./Modal";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { setChannelId } = useGlobalContext();

  const setOpenCallback = useCallback(() => setOpen(true), []);

  const { data: channels } = useQuery({
    queryKey: ["channels"],
    queryFn: () => fetchItems("channels")
  });

  const handleClick = (channelId: string) => {
    setChannelId(channelId);
  };

  return (
    <div className="flex flex-col min-h-screen w-64">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <nav
            className="mt-5 flex-1 px-2 bg-gray-800 space-y-1"
            aria-label="Sidebar"
          >
            <span className="flex align-middle justify-between py-2">
              <button className="text-white group flex items-center text-sm font-medium rounded-md">
                <ChevronDownIcon className="h-6 w-6 mr-2" />
                Channels
              </button>
              <Dropdown
                menuItems={["Create a channel"]}
                setOpen={setOpenCallback}
              />
            </span>
            {channels?.map((item: any) => (
              <button
                onClick={() => handleClick(item.id)}
                key={item.id}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <HashtagIcon
                  className={classNames(
                    item.current
                      ? "text-gray-300"
                      : "text-gray-400 group-hover:text-gray-300",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.name}</span>
                {/* {item.count ? (
                  <span
                    className={classNames(
                      item.current
                        ? "bg-gray-800"
                        : "bg-gray-900 group-hover:bg-gray-800",
                      "ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full"
                    )}
                  >
                    {item.count}
                  </span>
                ) : null} */}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Tom Cook</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={"Create a channel"}
        description={
          "Channels are where your team communicates. They???re best when organized around a topic ??? #marketing, for example."
        }
        formComponent={<CreateChannelForm setOpen={setOpen} />}
      />
    </div>
  );
}
