import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProgressBar } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'

import { useContext } from 'react'
import { UserContext } from './UserProvider'

import './App.css'
  
export default function Table(){
  const { datas,setDatas, getAllData } = useContext(UserContext)
  //const {datas, setDatas } = useState ([])
  const [dataCategory, setDataCategory] = useState ([])
  const [category, setCategory] = useState ([])
  const [formInput, setFormInput] = useState({})

  const handleFormInput = (type, value) => setFormInput({ ...formInput, [type]: value })
  
  const deletedata = async id => {
    await axios.delete('http://localhost:3000/donasi/' + id)
    getAllData()
  }

  const prepareEdit = async id => {
    input()
    const res = await axios.get('http://localhost:3000/donasi/' + id)
    setFormInput(res.data)
  }

  const [show, setShow] = useState(false);
  const close = () => setShow(false);
  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const isEdit = !!formInput.id
    if (isEdit){
      await axios.put('http://localhost:3000/donasi/' + formInput.id, formInput)
      close()
    }
    else await axios.post('http://localhost:3000/donasi', formInput)
    getAllData()
  }

  const handleInput = (type, value) => {
    setFormInput({ ...formInput, [type]: value })
  }
  
  const sisaHari=(end)=>{
    const date1 = new Date()
    const date2 = new Date(end)

    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    return Math.abs(diffInDays);
  }

  useEffect(() => {
    getAllData()
  }, [])

	return <>
  <div className="">
  <div className="container mx-5 my-5 mx-auto">
  <div className="row">
  {datas.map(data => 
    <div class="col-lg-4 col-sm-6 mb-4">
      <div class="card h-100">
        <Link to={`/Product/${data.id}`}>
          <img class="card-img-top" src={data.img} alt="" height={180}/>
        </Link>
        <div class="card-body">
          <p>
            {sisaHari(data.tanggal2)} Hari Lagi
          </p>
          <Link className="text-decoration-none" to={`/Product/${data.id}`}>
          <h4 class="card-title text-dark">
            {data.judul}
          </h4>
          </Link>
          <ProgressBar variant="warning" animated now={(data.terkumpul/data.target)*100} />
          <div class="row px-1">
            <div class="col-sm-6"><p class="float-start">Rp.{data.terkumpul}</p></div>  
            <div class="col-sm-6"><p class="float-end">Rp.{data.target}</p></div>  
          </div>
          <div class="col overflow-hidden text-truncate text-nowrap text-muted">
            {data.isi}
          </div>
          <Link to={`/Product/${data.id}`}>
            <p>Read More..</p>
          </Link>
        </div>
      </div>
    </div>
    )}  
      
    </div>
  <table className="table table-striped table-dark table-bordered">
      <tbody>
        
         
         
      </tbody>
    </table>
   </div>
    </div>
	</>
}