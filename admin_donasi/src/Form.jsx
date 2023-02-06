import { Link } from "react-router-dom";

import axios from "axios"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom"

const defaultInput = {
  name : '',
  cost: '',
  category: '',
  img : ''
}

export default function Form(){
  let navigate = useNavigate();
  const handleFormInput = (type, value) => setFormInput({ ...formInput, [type]: value })
  
  const [formInput, setFormInput] = useState({ ...defaultInput })
  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await axios.post('http://localhost:3000/data', formInput)
    setFormInput({ ...defaultInput })
    navigate("/table")
  }

  const handleInput = (type, value) => {
    setFormInput({ ...formInput, [type]: value })
  }

    return <>
    <div className="container mx-auto bg-light w-50 my-5 rounded shadow">
    <div className="p-5">
    <form onSubmit={handleSubmit} className="mx-5">
    <p className="text-center">Input Data</p> 
    <div className="form-group mt-1">
      <label>Link Gambar</label>
      <input type="text" className="form-control" placeholder="link gambar" value={formInput.img} onChange={evt => handleFormInput('img', evt.target.value)} />
    </div>
    <div className="form-group">
      <label>Judul</label>
      <input type="text" className="form-control" placeholder="Judul" value={formInput.judul} onChange={evt => handleFormInput('judul', evt.target.value)} />
    </div>
    <div className="form-group mt-1">
      <label>Tanggal Sekarang</label>
      <input type="date" className="form-control" value={formInput.tanggal1} onChange={evt => handleFormInput('tanggal1', evt.target.value)} />
    </div>
    <div className="form-group mt-1">
      <label>Tanggal Deadline</label>
      <input type="date" className="form-control" value={formInput.tanggal2} onChange={evt => handleFormInput('tanggal2', evt.target.value)} />
    </div>
    <div className="form-group mt-1">
      <label>Uang Terkumpul</label>
      <input type="number" className="form-control" placeholder="Rp 0" value={formInput.terkumpul} onChange={evt => handleFormInput('terkumpul', evt.target.value)} />
    </div>
    <div className="form-group mt-1">
      <label>Target </label>
      <input type="number" className="form-control" placeholder="Rp 500.000" value={formInput.target} onChange={evt => handleFormInput('target', evt.target.value)} />
    </div>
    <div className="form-group mt-1">
      <label>Isian</label>
      <textarea type="text" className="form-control" value={formInput.isi} onChange={evt => handleFormInput('isi', evt.target.value)} />
    </div>
    <div className="form-group mt-1 text-center">   
      <button className="btn btn-warning mt-3 float-right">
        SUBMIT
      </button>
    </div>
    </form>
    </div>
    </div>
    </>
}