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
  
export default function Table(){
  const { datas,setDatas, getAllData } = useContext(UserContext)
  //const {datas, setDatas } = useState ([])
  const [dataCategory, setDataCategory] = useState ([])
  const [category, setCategory] = useState ([])
  const [formInput, setFormInput] = useState({})

  const handleFormInput = (type, value) => setFormInput({ ...formInput, [type]: value })
  
  const deletedata = async id => {
    await axios.delete('http://localhost:3000/data/' + id)
    getAllData()
    hitung()
  }

  const prepareEdit = async id => {
    input()
    const res = await axios.get('http://localhost:3000/data/' + id)
    setFormInput(res.data)
  }

  const [show, setShow] = useState(true);
  const close = () => setShow(false);
  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const isEdit = !!formInput.id
    if (isEdit){
      await axios.put('http://localhost:3000/data/' + formInput.id, formInput)
      close()
    }
    else await axios.post('http://localhost:3000/data', formInput)
    getAllData()
  }

  const handleInput = (type, value) => {
    setFormInput({ ...formInput, [type]: value })
  }

  const hitung = async () => {
    const res0 = await axios.get('http://localhost:3000/data')
    const res = await axios.get('http://localhost:3000/data?category=Mage')
    const res1 = await axios.get('http://localhost:3000/data?category=Marksman')
    const res2 = await axios.get('http://localhost:3000/data?category=Support')
    const res3 = await axios.get('http://localhost:3000/data?category=Tank') 
    const res4 = await axios.get('http://localhost:3000/data?category=Assassin')
    const res5 = await axios.get('http://localhost:3000/data?category=Fighter')
    setDataCategory({
      full : Object.keys(res0.data).length,
      mage : (Object.keys( res.data ).length)/(Object.keys(res0.data).length)*100,
      marksman : Object.keys( res1.data ).length/(Object.keys(res0.data).length)*100,
      support : Object.keys( res2.data ).length/(Object.keys(res0.data).length)*100,
      tank : Object.keys( res3.data ).length/(Object.keys(res0.data).length)*100,
      assassin : Object.keys( res4.data ).length/(Object.keys(res0.data).length)*100,
      fighter : Object.keys( res5.data ).length/(Object.keys(res0.data).length)*100
    })
    setCategory({
      full : Object.keys(res0.data).length,
      mage : Object.keys( res.data ).length,
      marksman : Object.keys( res1.data ).length,
      support : Object.keys( res2.data ).length,
      tank : Object.keys( res3.data ).length,
      assassin : Object.keys( res4.data ).length,
      fighter : Object.keys( res5.data ).length
    })
  }
  
  useEffect(() => {
    getAllData()
    hitung()
    prepareEdit()
  }, [])

	return <>
  <div className="">
  <div className="container mx-5 my-5 mx-auto">
  <div className="progressBar my-4">
    <ProgressBar>
      <ProgressBar variant="primary" now={dataCategory.assassin} animated label={'asssasin : ' + category.assassin}/>
      <ProgressBar variant="dark" now={dataCategory.fighter} animated label={`Fighter : ` + category.fighter}/>
      <ProgressBar variant="success" now={dataCategory.mage} animated label={`Mage : ` + category.mage}/>
      <ProgressBar variant="warning" now={dataCategory.marksman} animated label={`Marksman : ` + category.marksman}/>
      <ProgressBar variant="danger" now={dataCategory.support} animated label={`Support : ` + category.support}/>
      <ProgressBar variant="info" now={dataCategory.tank} animated label={`Tank : `+ category.tank}/>
    </ProgressBar>
  </div>
	<table className="table table-striped table-dark table-bordered">
      <thead className="table-light text-center">
        <tr>
          <th>ID</th>
          <th>HARGA HERO</th>
          <th>NAMA HERO</th>
          <th>KATEGORI</th>
          <th>AKSI</th>
        </tr>
      </thead>
      <tbody>
        {datas.map(data =>
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.cost}</td>
            <td>{data.name}</td>
            <td>{data.category}</td>
            <td className="text-center">
              <Link onClick={() => {prepareEdit(data.id)}} ><FontAwesomeIcon  className="mx-2" color="blue" icon={faPencil} /></Link>
              <FontAwesomeIcon onClick={() => deletedata(data.id)} className="mx-2" color="red" icon={faTrash}/>
              <Link to={`/Product/${data.id}`}><FontAwesomeIcon className="mx-2" color="white" icon={faEye}/></Link>
            </td>
          </tr>
        )} 
      </tbody>
    </table>
    <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Hero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
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
          <br />
        </Modal.Body>
        <Modal.Footer>
          <button variant="primary" onClick={close}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
	</>
}