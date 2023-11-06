import React, { useState, useEffect } from "react";
import "./PinputField.css";

function PinInputField({
  length,
  onComplete,
}: {
  length: number;
  onComplete?: (pin: string) => void;
}) {
  const [pin, setPin] = useState(new Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (e: any, index: number) => {
    const { value } = e.target;
    const newPin = [...pin];
    if (!isNaN(value) && value !== " " && value !== "") {
      newPin[index] = value;
      setPin(newPin);

      if (index < length - 1) {
        setActiveIndex(index + 1);
      } else {
        document.getElementById(`pin-input-${activeIndex}`)?.blur();
      }
      onComplete?.(newPin.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const newPin = [...pin];

    if (e.key === "Backspace") {
      newPin[index] = "";
      setPin(newPin);
      setActiveIndex(index - 1);
      onComplete?.(newPin.join(""));
    }
  };

  useEffect(() => {
    if (activeIndex >= 0) {
      document.getElementById(`pin-input-${activeIndex}`)?.focus();
    } else if (activeIndex === length - 1) {
      document.getElementById(`pin-input-${activeIndex}`)?.blur();
    }
  }, [activeIndex, length]);

  return (
    <div className="pin-input">
      {pin.map((digit, index) => (
        <input
          className="pinput"
          key={index}
          id={`pin-input-${index}`}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
        />
      ))}
    </div>
  );
}

export default PinInputField;
