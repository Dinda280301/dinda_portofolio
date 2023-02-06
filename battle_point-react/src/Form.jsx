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
    <p className="text-center">Input Data Hero</p>
    <div className="form-group">
      <label>Harga</label>
      <input type="number" className="form-control" placeholder="Rp 0" value={formInput.cost} onChange={evt => handleFormInput('cost', evt.target.value)} />
    </div>
    <div className="form-group mt-1">
      <label>Nama Hero</label>
      <input type="text" className="form-control" placeholder="Nama Hero" value={formInput.name} onChange={evt => handleFormInput('name', evt.target.value)} />
    </div>
    <div className="form-group mt-1">
      Klasifikasi Role :
      <div class="form-check">
        <label class="form-check-label">
        <input class="form-check-input" type="radio" value="Mage" checked={formInput.category === 'Mage'} onChange={() => handleInput('category', 'Mage')} />
        Mage
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
        <input class="form-check-input" type="radio" value="Marksman" checked={formInput.category === 'Marksman'} onChange={() => handleInput('category', 'Marksman')} />
        Marksman 
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
        <input class="form-check-input" type="radio"  value="Support" checked={formInput.category === 'Support'} onChange={() => handleInput('category', 'Support')}/>
        Support
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
        <input class="form-check-input" type="radio" value="Tank" checked={formInput.category === 'Tank'} onChange={() => handleInput('category', 'Tank')} />
        Tank
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
        <input class="form-check-input" type="radio" value="Assassin" checked={formInput.category === 'Assassin'} onChange={() => handleInput('category', 'Assassin')} />
        Assassin
        </label>
      </div><div class="form-check">
        <label class="form-check-label">
        <input class="form-check-input" type="radio" value="Fighter" checked={formInput.category === 'Fighter'} onChange={() => handleInput('category', 'Fighter')} />
        Fighter
        </label>
      </div>
    <div className="form-group mt-1">
      <label>Link Gambar</label>
      <input type="text" className="form-control" placeholder="link gambar" value={formInput.img} onChange={evt => handleFormInput('img', evt.target.value)} />
    </div>
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