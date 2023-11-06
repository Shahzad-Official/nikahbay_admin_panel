import Joi from "joi";
import { emailTlds } from "utils/AppCommonUtils";
import { create } from "zustand";

interface SignUpState {
  formData: {
    profile: string;
    firstName: string;
    lastName: string;
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

const useSignupForm = create<SignUpState>((set) => ({
  formData: {
    profile: "",
    firstName: "",
    lastName: "",
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
      const { profile, firstName, lastName, email, password } = state.formData;
      const signupSchema = Joi.object({
        Profile: Joi.string().required(),
        FirstName: Joi.string().min(3).required(),
        LastName: Joi.string().optional(),
        Email: Joi.string()
          .email({ tlds: { allow: emailTlds } })
          .required(),
        Password: Joi.string().min(6).required(),
      });

      const { error } = signupSchema.validate({
        Profile: profile,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
      });
      if (profile === "") {
        return { errorMessage: "Please Select your profile" };
      } else if (error) {
        return { errorMessage: error.details[0].message };
      } else {
        return { errorMessage: "" };
      }
    });
  },
  resetStore: () => {
    set({
      formData: {
        profile: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      errorMessage: "",
      isObsecure: true,
    });
  },
}));
export default useSignupForm;
