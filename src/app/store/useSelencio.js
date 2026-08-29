import {create} from 'zustand'

const useSelencio = create((set) => ({
  // Define your state and actions here
  count: 0,
  redLight:false,
  turnOnTheLight: () => set((state) => ({redLight: true})),
  turnOffTheLight: () => set((state) => ({redLight: false})),

}))

export default useSelencio