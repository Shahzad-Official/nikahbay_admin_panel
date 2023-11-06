import Joi from "joi";
import { create } from "zustand";

interface PinVerificationState {
  email: string;
  pin: string;
  errorMessage: string;
  setEmail: (email: string) => void;
  setPin: (pin: string) => void;
  resetStore: () => void;
  validate: () => void;
  setError: (error: string) => void;
}

const usePinVerification = create<PinVerificationState>((set) => ({
  email: "",
  pin: "",
  errorMessage: "",

  setError: (error: string) => {
    set({
      errorMessage: error,
    });
  },

  setEmail: (email: string) => {
    set((state) => ({
      email: email,
    }));
  },

  setPin: (pin: string) => {
    set((state) => ({
      pin: pin,
    }));
  },

  validate: () => {
    set((state) => {
      const { error } = Joi.object({
        OTP: Joi.string().required(),
      }).validate({
        OTP: state.pin,
      });
      if (error) {
        return { errorMessage: error.details[0].message };
      } else if (state.pin.length < 5) {
        return { errorMessage: "Please Enter your complete pin code" };
      } else {
        return { errorMessage: "" };
      }
    });
  },

  resetStore: () => {
    set((state) => ({
      email: "",
      pin: "",
    }));
  },
}));
export default usePinVerification;
