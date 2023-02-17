import React, { useContext, useEffect, useState } from "react"
import { Element } from "../../components/elementOfGrid"
import { Header } from "../../components/Header"
import { UserContext } from "../../context/user.context"
import {Link} from 'react-router-dom'

// Для авторизованных пользователей

export const MainPageUser = () => {
    const {catalog, getCatalogFromDb,getCarsFromDbbyFilter,getCarsFromDbbyName,getCarsFromDb,cars, getMarksFromDb,marks}= useContext(UserContext)
    const [displayList, setDisplayList]=useState(null);
    const [locMarka, setLocMarka]=useState(-1);
    const [locModel, setLocModel]=useState('');
    const [findString, setFindString]=useState('');
    const [locVolume, setLocVolume]=useState(0);
    const [lowPrice, setLowPrice]=useState(0);
    const [maxPrice, setMaxPrice]=useState(0);
    useEffect(()=>{
         async function start (){
            getCarsFromDb();
            getMarksFromDb();
        }
        start();
        
    },[])
    const filterHandler=()=>{
        setFindString('')
        let searchcars={
            searchname:locModel,
            value:Number(locVolume),
            idcategory:Number(locMarka),
            highprice:Number(maxPrice),
            lowprice:Number(lowPrice)
        }
        console.log(searchcars);
        getCarsFromDbbyFilter(searchcars)
        // let findList= cars.filter((elem)=>{
        //     if(locMarka!=-1)
        //     {
        //         if(elem.idCategory==locMarka)
        //         {
        //             if(locVolume!=0 && Number(elem.value)==Number(locVolume))
        //             {
        //                 if(locModel!='' && elem.name==locModel)
        //                 {
        //                     if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                     {
        //                         return elem
        //                     }
        //                     else if(maxPrice==0)
        //                     {
        //                         return elem
        //                     }
        //                 }
        //                 else if(locModel==''){
        //                     if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                     {
        //                         return elem
        //                     }
        //                     else if(maxPrice==0)
        //                     {
        //                         return elem
        //                     }
        //                 }
        //             }
        //             else if(locVolume==0)
        //             {
        //                 if(locModel!='' && elem.name==locModel)
        //                 {
        //                     if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                     {
        //                         return elem
        //                     }
        //                     else if(maxPrice==0)
        //                     {
        //                         return elem
        //                     }
        //                 }
        //                 else if(locModel==''){
        //                     if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                     {
        //                         return elem
        //                     }
        //                     else if(maxPrice==0)
        //                     {
        //                         return elem
        //                     }
        //                 }
        //             }
                    
                    
        //         }
        //     }
        //     else
        //     {
        //         if(locVolume!=0 && Number(elem.value)==Number(locVolume))
        //         {
        //             if(locModel!='' && elem.name==locModel)
        //             {
        //                 if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                 {
        //                     return elem
        //                 }
        //                 else if(maxPrice==0)
        //                 {
        //                     return elem
        //                 }
        //             }
        //             else if(locModel==''){
        //                 if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                 {
        //                     return elem
        //                 }
        //                 else if(maxPrice==0)
        //                 {
        //                     return elem
        //                 }
        //             }
        //         }
        //         else if(locVolume==0)
        //         {
        //             if(locModel!='' && elem.name==locModel)
        //             {
        //                 if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                 {
        //                     return elem
        //                 }
        //                 else if(maxPrice==0)
        //                 {
        //                     return elem
        //                 }
        //             }
        //             else if(locModel==''){
        //                 if(elem.price>=lowPrice&& elem.price<=maxPrice&& maxPrice!=0 )
        //                 {
        //                     return elem
        //                 }
        //                 else if(maxPrice==0)
        //                 {
        //                     return elem
        //                 }
        //             }
        //         }
                
                    
        //     }
        // })
        
        setDisplayList([...cars])
    }
    useEffect(()=>{
        setDisplayList([...cars])
    },[cars])
    const findHandler=(e)=>{
        setLocMarka(-1);
        setLowPrice(0);
        setMaxPrice(0);
        setLocModel('');
        setLocVolume(0)
        getCarsFromDbbyName(e.target.value)
        setFindString(e.target.value)
        let findList= cars.filter((elem)=>{
            if(elem.name.indexOf(e.target.value)!=-1)
            {
                return elem
            }
        })
        
        setDisplayList([...cars])
    }
    return (
        <>
            <Header />
            <div className="form">
                <table >
                    <tbody>
                        <tr>
                        <td>
                            <label htmlFor="marka">Марка</label>
                            <select id="marka" name="marka" value={locMarka} onChange={e=>setLocMarka(Number(e.target.value))}>
                                <option value={-1}>----</option>
                                {marks && marks.map((el)=>{
                                    return (
                                        <option value={el.id} key={el.id}>{el.name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td>
                            <label htmlFor="priceFrom">Цена от:</label>
                        <input value={lowPrice} type="number" id="priceFrom" name="priceFrom" placeholder="От" onChange={e=>setLowPrice(Number(e.target.value))}/>
                        </td>
                        <td>
                            <label htmlFor="priceTo">До:</label>
                            <input value={maxPrice} type="number" id="priceTo" name="priceTo" placeholder="До" onChange={e=>setMaxPrice(Number(e.target.value))}/>
                        </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="model">Модель</label>
                                <input id="model" name="model" value={locModel} onChange={e=>setLocModel(e.target.value)}>
                                </input>
                            </td>
                            <td>
                                <label htmlFor="volume">Объем</label>
                                <input id="volume" type="number" name="volume" value={locVolume} onChange={e=>setLocVolume(Number(e.target.value))}>
                                </input>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>

        
          <input className="button-formType" onClick={filterHandler} type="submit" value="Поиск"/>
            </div>
            <div className="marquee-wrapper">
                <input value={findString} onChange={e =>findHandler(e)} className="find" placeholder="ПОИСК"/>
            </div>
          
            <div className="main">
            
                <div className="icon-products">

                            {displayList&&displayList.map((data)=>{
                              
                                return (
                                    <Link to={`/element/${data.id}`} key={data.id} ><Element key= {data.id} elem={data}/></Link>
                                )
                            })}
                    
                        
                </div>
        
            
        </div>
    
        
    
        </>
    )
}