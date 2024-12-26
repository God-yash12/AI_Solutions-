import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface InputFieldProps extends TextFieldProps<"outlined"> {
  type?: string;
  placeholder?: string;
  value?: string;
  multiple?: boolean; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type = "text", placeholder = "", value, onChange, ...props }, ref) => {
    return (  
      <TextField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref} 
        {...props}
        className="w-64 lg:w-80 md:80 sm:m-72 "
      />
    );
  }
);


InputField.displayName = "InputField";

export default InputField;
