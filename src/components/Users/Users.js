import React,{useState} from 'react';
import s from './Users.module.css';
import * as axios from 'axios';
import userImg from '../../assets/images/user.png';

const Users = (props) =>{
   
    
       

        return(
            <div>
                <div className={s.pagesCountContainer}>
                    <Paginator {...props} />
                </div>

                   {props.users()}

                </div>
            )
    }

    const Paginator = props =>{
        let pages = [];
        let pagesCount = Math.ceil(props.totalCount / props.pageSize);
        //console.log(pagesCount);
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        
const portionCount = Math.ceil(pagesCount/props.portionSize);
const [portionNumber,setPortionNumber] = useState(1);
const leftPortionPageNumber = (portionNumber-1)*props.portionSize+1;
const rightPortionPageNumber = portionNumber*props.portionSize;

        return(
            <div>

{leftPortionPageNumber>1 && <button onClick={()=>setPortionNumber(portionNumber-1)}>Назад</button>}

                {
                    pages.filter(p=> p>=leftPortionPageNumber && p<=rightPortionPageNumber).map(p=>{
                        return <span key={p} onClick={()=>{props.changePage(p)}} className={`${s.pageLink} ${props.currentPage === p ? s.currentPage : ''} `}>{p}</span>
                    })
                }

{portionCount > portionNumber && <button onClick={()=>setPortionNumber(portionNumber+1)}>Далее</button>}

            </div>
            // pages.map(p=>{
            //     return <span onClick={()=>{props.changePage(p)}} className={`${s.pageLink} ${props.currentPage === p ? s.currentPage : ''} `}>{p}</span>
            // })
        )
    }
    

   


export default Users;
