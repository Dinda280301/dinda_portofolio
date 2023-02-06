import { useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import axios from "axios"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function productLoader (props) {
	return props.params.dataId 
}

export default function Product () {
    const [product,setProduct] = useState([]) 
	const idYgDiterima = useLoaderData()
	
    const getData = async () => {
        const res = await axios.get('http://localhost:3000/data/'+idYgDiterima)
        console.log(res.data)
        setProduct({
            id: res.data.id,
            cost : res.data.cost,
            name : res.data.name,
            category : res.data.category,
            img : res.data.img
        })
    }

    useEffect(() => {
        getData()
      }, [])

    return <>
        <div className="w-50 p-5 m-5 shadow rounded bg-warning mx-auto">
		<Link to="/table" class="nav-link " ><FontAwesomeIcon icon={faArrowLeft} /></Link>
        
        <h1 className="text-center">{product.name}</h1>
		<div ></div>
        <img className="rounded mx-auto d-block mt-5" src={product.img} width="400px"/>
        <h3 className="text-center">{product.cost}</h3>
        <div className="rounded bg-dark text-white text-center">
            <p>{product.category}</p>
        </div>
        
        </div>
    </>
}