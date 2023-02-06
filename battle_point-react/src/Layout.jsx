import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useContext } from 'react'
import { UserContext } from './UserProvider'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { logIn, logOut } from "./profileSlice"

const defaultInput = {
	uname : '',
	pass : ''
  }

export default function Layout () {
	const { color, changeColor } = useContext(UserContext)
	const dispatch = useDispatch()
	const profile = useSelector((state) => state.profile.data)
	const [formInput, setFormInput] = useState({ ...defaultInput })
	const [login, setLogin] = useState('true')
	const [buttonL,setButtonL] = useState ('')
	
	const [show, setShow] = useState(false);
	const close = () => setShow(false);
	const handleShow = () => {
	  setShow(true)
	  setLogin(!login)
	}
	
	const getData = async () => {
	  const res = await axios.post('https://dummyjson.com/auth/login',{
		username: ''+formInput.uname,
		password: ''+formInput.pass
	  }
  	)
	dispatch(logIn(res.data))
	sessionStorage.setItem('login',JSON.stringify(res.data))
	sessionStorage.setItem("buttonlogin", "invisible");
	setButtonL(sessionStorage.getItem("buttonlogin"));
	console.log(buttonL)
	}
  
	const logout = async () => { 
		sessionStorage.clear()
		dispatch(logOut())
	  	setLogin(!login)
		setButtonL('visible')
	}
  
	const handleSubmit = (evt) => {
	  evt.preventDefault()
	  setFormInput({ ...defaultInput })
	  getData()
	  close()
	  console.log(user)
	}
	
	const handleFormInput = (type, value) => setFormInput({ ...formInput, [type]: value })
	
	return <>
	{console.log(buttonL)}
	<div className={color ? "bg-secondary" : "bg-white"}>
	<div  class="page-holder bg-cover">
	<div className={color ? "bg-black" : "bg-warning"}>
	<div className="container">
		<nav class="navbar navbar-expand-lg">
		<Link class="navbar-brand" to="/">
			<img src="https://upload.wikimedia.org/wikipedia/id/7/72/New_Mobile_Legends_Bang_Bang_2020_Logo.png" width="90" height="30" class="d-inline-block align-top" alt=""/>
		</Link>
		<div class="collapse navbar-collapse">
    		<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<Link to="/form" class="nav-link" >
						<div className={color ? "text-white" : "text-black"}>Form </div>
					</Link>
				</li>
				<li class="nav-item">
					<Link to="/Table" class="nav-link" > 
					<div className={color ? "text-white" : "text-black"}>Table </div> 
					</Link>
				</li>
	  		</ul>
	  	</div>
			<p className="text-white">{profile.email}</p>
			<button onClick={changeColor} className={color ? "btn btn-warning" : "btn btn-secondary"}>
				{color ? 'Yellow' : 'Black'}
			</button>
			<button onClick={handleShow} class={login ? "btn btn-success visible" :"btn invisible"}>Login
			</button><img src={profile.image} width={50} onClick={logout}/>
		</nav>
	</div>
	</div>
	<Outlet />
	</div>
	</div>
	<Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} className="mx-5">
        <Modal.Body>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Username" value={formInput.uname} onChange={evt => handleFormInput('uname', evt.target.value)} />
          </div>
          <div className="form-group mt-1">
            <label>Password</label>
            <input id="typepass" type="password" className="form-control" placeholder="Password" value={formInput.pass} onChange={evt => handleFormInput('pass', evt.target.value)} />
          </div>
		  <p>kminchelle-0lelplR</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" >
              Save
          </button>
        </Modal.Footer>
        </form>
    </Modal>
	</>
	
}

	