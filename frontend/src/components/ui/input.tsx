import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full px-4 py-2 rounded-lg border bg-background dark:bg-gray-700 text-gray-900 dark:text-white dark:placeholder-gray-400 placeholder-gray-500 dark:focus:ring-indigo-500 dark:focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  dark:focus:ring-1 dark:focus:ring-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
