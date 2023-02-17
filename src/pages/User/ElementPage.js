import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { AuthContext } from "../../context/auth.context"
import { UserContext } from "../../context/user.context"

// Для авторизованных пользователей

export const ElementPage = () => {
    const {cars,marks,updateBusket, deleteFromCatalog} = useContext(UserContext);
    const {isAuthenticatedAdmin, isAuthenticatedUser} = useContext(AuthContext)
    let id=useParams().car;
    const [nameMark, setNameMark]=useState('');
    const {catalog, categories}=useContext(UserContext)
    let elem=cars.find((elem)=>{
        if(elem.id==Number(id))
        {
            return elem
        }
        
    })
    useEffect(()=>
    {
        setNameMark(marks.find((el)=>{
        if(Number(el.id)==Number(elem.idCategory))
        {   
            return el
        }
       }).name)
    },[elem])
    // const addInBusket=()=>{
    //     updateBusket([...busket, elem]);
    // }
    const deleteItem=()=>{
        deleteFromCatalog(elem.id);
    }
    return (
        <> 
        <Header/>
            <div className="main">
            <div id="iconImage" className="icon-marks">
                <img className="infoImg" src={elem.src}></img>
              {/* {(isAuthenticatedUser)&&<button onClick={addInBusket}>Добавить в корзину</button>}  */}
              {(isAuthenticatedAdmin)&&<Link to="/products"><button onClick={deleteItem}>Удалить</button></Link>}  
            </div>
{elem &&<> <div className="information">
            <div className="name">{elem.name}</div>  
            <ul>
                <li>
                    {'Марка: '+nameMark}
                </li>
                <li>
                    {'Объем: '+elem.value}
                </li>
                <li>
                    {'Цена: '+elem.price}
                </li>
                <li>
                    {'Описание: '+elem.description}
                </li>
            </ul>
            </div></>}
           
        </div>
        </>
       
    )
}