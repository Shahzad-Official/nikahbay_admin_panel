import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import "./AppField.css";

interface AppFieldProps {
  defaultValue?: string | number;
  className?: string;
  name: string;
  label: string;
  type: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

export default function AppField({
  className,
  defaultValue,
  name,
  label,
  type,
  prefixIcon,
  suffixIcon,
  onChange,
  onKeyUp,
}: AppFieldProps) {
  const [isFocused, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("This field is required");
  // const defaultValueRef=useRef(defaultValue);
  function handleFocus() {
    setFocus(true);
  }
  function handleUnFocus() {
    setFocus(false);
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setError("This field is required");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (defaultValue == null || defaultValue === "") {
      setError("This field is required");
    } else {
      setError("");
    }
  }, [defaultValue]);
  return (
    <>
      <div
        className={`${className} input-container`}
        onChange={onChange}
        onKeyUp={onKeyUp}
      >
        <input
          name={name}
          type={type}
          id={label}
          className={`${error ? "invalid" : "not-empty"} ${
            prefixIcon != null ? "is-icon input" : "input"
          }`}
          value={defaultValue ?? inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleUnFocus}
          placeholder={label}
        />

        <label
          htmlFor="input-field"
          className={error ? "label" : "not-empty label"}
        >
          {label}
        </label>
        <span
          className={
            prefixIcon == null
              ? ""
              : ` ${
                  isFocused && error ? "invalid" : error ? "invalid" : "valid"
                } icon`
          }
        >
          {prefixIcon}
        </span>
        <span
          className={
            suffixIcon == null
              ? ""
              : ` ${
                  isFocused && error ? "invalid" : error ? "invalid" : "valid"
                } suffix-icon`
          }
        >
          {suffixIcon}
        </span>
        <div className="error-message">{error}</div>
      </div>
    </>
  );
}
