import Joi from "joi";
import { create } from "zustand";

interface SetPasswordState {
  obsecureP: boolean;
  obsecureCp: boolean;
  password: string;
  cPassword: string;
  errorMessage: string;
  setPassword: (password: string) => void;
  setCPassword: (cPassword: string) => void;
  validate: () => void;
  setObsecureP: () => void;
  setObsecureCp: () => void;
  resetStore: () => void;
}

const useSetPassword = create<SetPasswordState>((set) => ({
  obsecureP: true,
  obsecureCp: true,
  password: "",
  cPassword: "",
  errorMessage: "",

  setPassword: (password: string) => {
    set((state) => {
      state.validate();
      return { password: password };
    });
  },

  setCPassword: (cPassword: string) => {
    set((state) => {
      state.validate();
      return { cPassword: cPassword };
    });
  },

  validate: () => {
    set((state) => {
      const passowrdSchema = Joi.object({
        password: Joi.string().min(6).required(),
      });
      const { error } = passowrdSchema.validate({ password: state.password });
      if (error) {
        return { errorMessage: error.details[0].message };
      } else if (state.password !== state.cPassword) {
        return { errorMessage: "Please check your confirm password" };
      } else {
        return { errorMessage: "" };
      }
    });
  },

  setObsecureP: () => {
    set((state) => ({
      obsecureP: !state.obsecureP,
    }));
  },

  setObsecureCp: () => {
    set((state) => ({
      obsecureCp: !state.obsecureCp,
    }));
  },

  resetStore: () => {
    set({
      password: "",
      cPassword: "",
      errorMessage: "",
      obsecureCp: true,
      obsecureP: true,
    });
  },
}));

export default useSetPassword;
