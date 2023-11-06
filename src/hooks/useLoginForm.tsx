import Joi from "joi";
import { emailTlds } from "utils/AppCommonUtils";
import { create } from "zustand";

interface LoginState {
  formData: {
    email: string;
    password: string;
  };
  isObsecure: boolean;
  setFormData: (fieldName: string, value: string) => void;
  changeObsecurity: () => void;
  errorMessage: string;
  validateForm: () => void;
  resetStore: () => void;
}

const useLoginForm = create<LoginState>((set) => ({
  formData: {
    email: "",
    password: "",
  },
  errorMessage: "",
  isObsecure: true,
  setFormData: (newFieldName, newValue) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [newFieldName]: newValue,
      },
    }));
  },
  changeObsecurity: () => {
    set((state) => ({
      isObsecure: !state.isObsecure,
    }));
  },
  validateForm: () => {
    set((state) => {
      const loginSchema = Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: emailTlds } })
          .required(),
        password: Joi.string().min(6).required(),
      });
      const { error } = loginSchema.validate(state.formData);
      if (error) {
        return { errorMessage: error.details[0].message };
      } else {
        return { errorMessage: "" };
      }
    });
  },
  resetStore: () => {
    set({
      formData: {
        email: "",
        password: "",
      },
      errorMessage: "",
      isObsecure: true,
    });
  },
}));
export default useLoginForm;
