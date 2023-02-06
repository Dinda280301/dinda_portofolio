import { createContext, useState } from "react"
import axios from "axios"

export const UserContext = createContext()

export default function UserProvider ({ children }) {
	const [datas, setDatas] = useState([])
    const [bp, setBp] = useState ([])
    const [color, setColor] = useState('true')

    const changeColor = () => {
        setColor(!color);
    };

    const getAllData = async () => {
        const res = await axios.get('http://localhost:3000/data')
        setDatas(res.data)
    }
    
    const getBp = async () => {
        const res = await axios.get('http://localhost:3000/bp/1')
        setBp(res.data.bp.bp)
    }
    const shareValue ={
        datas, setDatas, getAllData, bp, setBp, getBp, color, changeColor, setColor
    }

	return <UserContext.Provider value={shareValue}>
		{children}
	</UserContext.Provider>
}