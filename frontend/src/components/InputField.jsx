import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input.jsx";

export function InputField({
                               label,
                               name,
                               value,
                               onChange,
                               type = "text",
                               required = false,
                               ...props
                           }) {
    return (
        <div className="relative mb-5">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete="off"
                className={`block px-3 pt-5 pb-2 w-full text-base bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500
          ${value ? "border-blue-500" : "border-gray-300"}
        `}
                placeholder=" "
                {...props}
            />
            <label
                htmlFor={name}
                className={`
          absolute left-3 top-2 text-gray-500 pointer-events-none transition-all duration-200
          ${value ? "text-xs -top-1.5 bg-white px-1 text-blue-600" : "text-base top-5"}
        `}
                style={{
                    background: value ? "#fff" : "transparent",
                    paddingLeft: value ? 4 : undefined,
                    paddingRight: value ? 4 : undefined,
                }}
            >
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
        </div>
    );
}