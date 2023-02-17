import { useContext } from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'
import { UserContext } from '../context/user.context'

export const Element = ({elem}) => {
        return (
            <div className='elementOfGrid'>
               <div>
                <img className='elemImg' src={elem.src}/>
               </div>
               <div>{elem.name}</div>
               <div>Цена: {elem.price}</div>
            </div>
        )
}
