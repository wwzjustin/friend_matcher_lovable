
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "./avatar"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  AvatarGroupProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex -space-x-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
