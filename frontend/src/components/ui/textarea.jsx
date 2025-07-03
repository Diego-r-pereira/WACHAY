import * as React from "react"

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
    <textarea
        className={
            "flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 " +
            (className || "")
        }
        ref={ref}
        {...props}
    />
))
Textarea.displayName = "Textarea"

export { Textarea }
