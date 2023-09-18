import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  isModalOpen: false,
}

const featuresSlice = createSlice({
  name: 'features',
  initialState,

  reducers: {
    setModal: (state, { payload }) => {
      state.isModalOpen = payload
    },
  },
})

export const { setModal } = featuresSlice.actions
export default featuresSlice.reducer
