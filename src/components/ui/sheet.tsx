import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
}

const Sheet = ({ open, onOpenChange, children, side = "right" }: SheetProps) => {
  if (!open) return null

  const sideClasses = {
    right: "right-0 top-0 h-full",
    left: "left-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "fixed z-50 bg-background border shadow-lg transition-transform",
          sideClasses[side],
          side === "right" || side === "left" ? "w-[350px]" : "h-[400px]"
        )}
      >
        {children}
      </div>
    </>
  )
}

const SheetHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-2 p-6", className)}>
    {children}
  </div>
)

const SheetTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
)

const SheetContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("p-6 overflow-y-auto h-full", className)}>
    {children}
  </div>
)

const SheetClose = ({ onClose }: { onClose: () => void }) => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute right-4 top-4"
    onClick={onClose}
  >
    <X className="h-4 w-4" />
  </Button>
)

export { Sheet, SheetHeader, SheetTitle, SheetContent, SheetClose }

