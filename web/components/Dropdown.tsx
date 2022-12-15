import { Fragment, MouseEventHandler } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropdownProps {
  menuItems: string[];
  title?: string;
  setOpen: MouseEventHandler<HTMLButtonElement>;
}

export default function Dropdown({ menuItems, title, setOpen }: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={classNames(
            title ? "px-4 py-2 text-sm font-medium text-gray-700" : "",
            "inline-flex w-full justify-center align-middle rounded-md border bg-gray-700 text-gray-700 shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-500"
          )}
        >
          {title && title}
          <PlusIcon className="h-5 w-5" aria-hidden="true" stroke="#ffffff" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems.map((item) => (
              <div key={item}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left"
                      )}
                      onClick={setOpen}
                    >
                      {item}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
