import { createSlice } from "@reduxjs/toolkit"

const initialState = { data :{
	id: 0,
	username: '',
	email: '',
	firstName: '',
	lastName: '',
	gender: '',
	image: '',
	token: ''
}}

const loginData = JSON.parse(sessionStorage.getItem('login'))

export const profileSlice = createSlice({
	name: 'profile',
	initialState : loginData ? {data : loginData} : {...initialState} ,
	reducers: {
		logIn: (state, action) => {
			state.data = action.payload
		},
		logOut: (state, action) => {
			return { ...initialState }
		}
	}
})

export const { logIn, logOut } = profileSlice.actions
export default profileSlice.reducer