import { useField } from "formik";
import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TextInput({ label, description, ...props }: any) {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          {...field}
          {...props}
          className={classNames(
            meta.touched && meta.error
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
              : "border-gray-500 shadow-sm focus:border-cyan-300 focus:ring-cyan-300 sm:text-sm",
            "block w-full rounded-md border py-3 px-2"
          )}
        />
      </div>
      {meta.touched && meta.error ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {meta.error}
        </p>
      ) : (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {description}
        </p>
      )}
    </div>
  );
}
