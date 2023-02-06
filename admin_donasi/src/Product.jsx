import { useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import axios from "axios"

import { ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function productLoader (props) {
	return props.params.dataId 
}

export default function Product () {
    const [product,setProduct] = useState([]) 
	const idYgDiterima = useLoaderData()
	
    const getData = async () => {
        const res = await axios.get('http://localhost:3000/donasi/'+idYgDiterima)
        console.log(res.data)
        setProduct({
            id: res.data.id,
            judul : res.data.judul,
            img : res.data.img,
            tanggal1 : res.data.tanggal1,
            tanggal2 : res.data.tanggal2,
            isi : res.data.isi,
            terkumpul : res.data.terkumpul,
            target : res.data.target,
        })
    }

    useEffect(() => {
        getData()
      }, [])

    return <>
        <div className="container">
            <div className="mx-5 px-5">
		<Link to="/table" class="nav-link mt-2 " ><FontAwesomeIcon icon={faArrowLeft} /></Link>
        <h3 className="text-center text-white">{product.judul}</h3>
        <img className="rounded mx-auto d-block object-fit-cover rounded" src={product.img} width="850px" height="400px"/>
        <div >
        <ProgressBar className="mt-5 mx-5"  variant="dark" animated now={(product.terkumpul/product.target)*100} />
        <div class="row px-5">
            <div class="col-sm-6"><p class="float-start text-white">Rp.{product.terkumpul}</p></div>  
            <div class="col-sm-6"><p class="float-end text-white">Rp.{product.target}</p></div>  
        </div>
        </div>
        <p>{product.tanggal2}</p>
        <p>{product.isi}</p>
        </div>
        </div>
    </>
}