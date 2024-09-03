import React from "react";

const NotificationBadge = () => {
  return (
    <div class="relative m-1 inline-flex w-fit">
      <div class="absolute bottom-auto left-auto right-0 top-0 z-10  -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 text-white scale-y-100 rounded-full bg-pink-700 p-1 w-4 h-4 text-xs flex items-center justify-center">
        1
      </div>

      <div class="flex items-center justify-center">
        <span
          class="[&>svg]:h-6 [&>svg]:w-6
        2xl:[&>svg]:h-8 2xl:[&>svg]:w-8 text-gray-500 hover:text-gray-700 cursor-pointer
        "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default NotificationBadge;
