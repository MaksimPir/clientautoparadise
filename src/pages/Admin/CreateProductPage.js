import React, { useContext, useEffect, useRef, useState } from "react"
import { Header } from "../../components/Header"
import { UserContext } from "../../context/user.context";

// Для авторизованных пользователей

export const CreateProductPage = () => {
    const {catalog, getCatalogFromDb, getCategoriesFromDb,categories,marks, getMarksFromDb,updateCatalog}= useContext(UserContext)
    const [value, setValue]=useState(0);
    const [name, setName]=useState('');
    const [categ, setCateg]=useState('')
    const [price, setPrice]=useState('')
    const [desc, setDesc]=useState('')
    const [src,setSrc]=useState('')
    const [locMarka, setLocMarka]=useState(-1);
    const fileInput=useRef(null)
    useEffect(() => {
        resetProperties()
        getMarksFromDb()
        }, [])
        
        const resetProperties = () => {
        setName('')
        setDesc('')
        setPrice(0)
        setValue(0)
        setLocMarka(-1)
        setName('')
        setSrc('')
        if (fileInput && fileInput.current) {
        fileInput.current.value = null
        }
        }
        
        const fileHandler = () => {
        const file = fileInput.current.files[0]
        if (file) {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
        let path = reader.result // path - то, что хранится в БД
        setSrc(path)
        })
        reader.readAsDataURL(file)
        } else {
        setSrc('')
        }
        }
        
        const clickAddNewItem = () => {
        if (name.split(' ').join('').length===0) {
        alert('Модель автомобиля должна быть заполнена')
        } else if (locMarka===-1) {
        alert('Марка автомобиля не выбрана')
        }  else if (price === 0 || price < 0) {
        alert('Цена не задана')
        } else if (src.length===0) {
        alert('Изображение  не задано')
        } else {
        if (desc.split(' ').join('').length === 0) {
        setDesc('Отсутствует')
        }
        else if(value===0)
        {
            alert('Объем не задан')
        }
        const newCar = {name,desc,locMarka, price, desc, src, value}
        resetProperties()
        updateCatalog(newCar)
        }
        }
    return (
        <>
            <Header/>
            <h2 className="tittle">Добавить новый автомобиль</h2>
            <div className="flexing">
                    <div className="main_container">
                    <div className="form-group">
                    <label htmlFor="name">Модель: </label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="select_categ">Марка:</label>
                    <select
                    id="select"
                    name="select_categ"
                    value={locMarka}
                    onChange={e => setLocMarka(Number(e.target.value))}
                    >
                   <option value={-1}>----</option>
                                {marks && marks.map((el)=>{
                                    return (
                                        <option value={el.id} key={el.id}>{el.name}</option>
                                    )
                                })}
                    </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="price">Цена: </label>
                    <input
                    id="price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="value">Объем: </label>
                    <input
                    id="value"
                    name="value"
                    type="number"
                    value={value}
                    onChange={e => setValue(Number(e.target.value))}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="desc">Описание:</label>
                    <textarea
                    id="desc"
                    name="desc"
                    cols="30"
                    rows="10"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    >
                    </textarea>
                    </div>
                    <div className="form-group">
                    <label htmlFor="input_image">Выберите изображение</label>
                    <input
                    name="input_image"
                    id="input_image"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    ref={fileInput}
                    onChange={e => fileHandler(e)}
                    />
                    </div>
                    <button id="butt_add" onClick={clickAddNewItem}>Добавить</button>
                    </div>
                </div>
                <div>

            </div>
            <div className="adminContent">
            </div>
        </>
        
    )
}