import { create } from "zustand";

interface ProfileState {
  profile: string;
  setProfile: (profile?: string) => void;
  resetStore:()=>void;
}

const useImagePick = create<ProfileState>((set) => ({
  profile: "",
  setProfile: (newprofile?: string) =>set({profile:newprofile}),
  resetStore:()=>{
    set({
      profile:"",
    })
  }
}));
export default useImagePick;