import { createSlice } from '@reduxjs/toolkit'
import { images } from '../../data'

const initialState = {
  isModalOpen: false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  isAuthenticated: false,
  images: images,
  isLoading: false,
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
    getItems: (state, { payload }) => {
      state.images = payload
    },
    setSearch: (state, { payload }) => {
      state.images = images.filter((image) =>
        image.tag.toLowerCase().includes(payload.toLowerCase())
      )

      setTimeout(() => {
        window.scrollTo(0, 750)
      }, 2300)
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    },
  },
})

export const { setModal, loginUser, logoutUser, setSearch, toggleLoading, getItems } =
  featuresSlice.actions
export default featuresSlice.reducer
