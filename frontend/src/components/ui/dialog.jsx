"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogOverlay = React.forwardRef(
    ({ className, ...props }, ref) => (
        <DialogPrimitive.Overlay
            ref={ref}
            className={
                "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm " + (className || "")
            }
            {...props}
        />
    )
)
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(
    ({ className, ...props }, ref) => (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg " +
                    (className || "")
                }
                {...props}
            />
        </DialogPortal>
    )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }) => (
    <div className={"flex flex-col space-y-2 text-center sm:text-left " + (className || "")} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef(
    ({ className, ...props }, ref) => (
        <DialogPrimitive.Title
            ref={ref}
            className={"text-lg font-bold leading-none " + (className || "")}
            {...props}
        />
    )
)
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(
    ({ className, ...props }, ref) => (
        <DialogPrimitive.Description
            ref={ref}
            className={"text-sm text-muted-foreground " + (className || "")}
            {...props}
        />
    )
)
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
}
