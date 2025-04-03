"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function UvProgress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-3 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary rounded-full h-3 w-3 flex-1 shadow-lg shadow-white ring-3 ring-white dark:ring-gray-500 "
        style={{ marginLeft: `calc(${value}% - 0.8rem)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { UvProgress }
