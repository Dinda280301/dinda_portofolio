import { useSelector, useDispatch } from "react-redux"
import { logIn, logOut } from "./profileSlice"

export default function Header () {
    const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
    const profile = useSelector((state) => state.profile.data)

    const logout = async () => { 
		sessionStorage.clear()
		dispatch(logOut())
    }
    return<>
        <button onClick={logout}>Logout</button>
        <div className="text-center">
            <img src={profile.image} className="rounded" width={200}/>
            <h1>{profile.email}</h1>
            <h1>{profile.firstName} {profile.lastName}</h1>
        </div>
    </>

}
