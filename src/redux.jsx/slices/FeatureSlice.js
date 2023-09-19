import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isModalOpen: false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  isAuthenticated: false,
}

const featuresSlice = createSlice({
  name: 'features',
  initialState,

  reducers: {
    setModal: (state, { payload }) => {
      state.isModalOpen = payload
    },
    loginUser: (state, { payload }) => {
      state.user = payload
      state.isAuthenticated = true
    },
    logoutUser: (state) => {
      state.isAuthenticated = false
      localStorage.removeItem('user')
    },
  },
})

export const { setModal, loginUser, logoutUser } = featuresSlice.actions
export default featuresSlice.reducer
