import { create } from 'zustand';
import { CameraCapturedPicture } from 'expo-camera';

type PhotoStore = {
  photo: CameraCapturedPicture | null;
  setPhoto: (photo: CameraCapturedPicture | null) => void;
  clearPhoto: () => void;
};

export const usePhotoStore = create<PhotoStore>((set) => ({
  photo: null,
  setPhoto: (photo) => set({ photo }),
  clearPhoto: () => set({ photo: null }),
}));