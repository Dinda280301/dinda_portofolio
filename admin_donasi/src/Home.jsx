import axios from "axios"
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProgressBar } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'


import { useContext } from 'react'
import { UserContext } from './UserProvider'


export default function Home(){
  const { datas,setDatas, getAllData, bp, setBp, getBp, color } = useContext(UserContext)
  //const [datas, setDatas] = useState ([])
  const close = () => setShow(false);
  const input = () => setShow(true);
  const [colorProgress, setColorProgress] = useState('success');
  const [show, setShow] = useState(false);
  
  var TotalPengeluaran = datas.reduce(function(_this, val) {
    return Number(_this) + Number(val.cost)
  }, 0);
  var sisaBp = Number(bp)-Number(TotalPengeluaran)
  var persenSisa = Number(sisaBp) / Number(bp) * 100

  useEffect(() => {
      getAllData()
      getBp()
    }, [])
  
    useEffect(() => {
      if(TotalPengeluaran<=(50/100)*bp){
        setColorProgress('success')
      }else if(TotalPengeluaran<=(80/100)*bp){
        setColorProgress('warning')
      }else{
        setColorProgress('danger')
      }
    }, [sisaBp])

    return <>
      <div className="container my-5 bg-light shadow p-5 rounded">
      <h2 className="text-center text-dark">Ringkasan Pengeluaran BP</h2>  
  <form>
    <div class="row">
      <div class="col text-center">
        <label className={color?"text-black" : "text-warning" }>Battle Point 
        <FontAwesomeIcon className="mx-3" onClick={input} color={color ? "yellow" : "blue"} icon={faPencil} />
        <input type="text" className="form-control bg-secondary bg-gradient text-white text-center" value={bp} /> 
        </label>
      </div>
      
      <div class="col text-center">
      <label className={color?"text-black" : "text-warning" }>Pengeluaran
        <input type="text" className="form-control bg-secondary bg-gradient text-white text-center" value={TotalPengeluaran} />
      </label>
      </div>
      <div class="col text-center">
      <label className={color?"text-black" : "text-warning" }>Sisa Battle Point
        <input type="text" className="form-control bg-secondary bg-gradient text-white text-center" value={sisaBp} />
        </label>
      </div>
    </div>
  </form>

    <div className="progressBar my-4">
       <ProgressBar variant={colorProgress} now={persenSisa} animated label={`Rp ${sisaBp}`}/>
    </div>
    </div>

    </>
}