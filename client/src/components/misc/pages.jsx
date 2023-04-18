import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { apiGet } from '../../services/services';
function Pages(props) {
    const nav = useNavigate();
    const [pages, setPages] = useState([]);
    useEffect(() => {
        doApi()

    }, [props.apiPage])
    const doApi = async () => {
        let url = props.apiPage;
        let { data } = await apiGet(url);
        console.log(data);
        setPages(data.pages);
    }

    return (
        <div className='ml-[80px]'>
            {[...Array(pages)].map((itme, i) => {
                return (
                    <button onClick={() => {
                        nav(`${props.linkTo}${i + 1}`);
                    }} key={i} className={"bg-black text-white p-2 m-1 rounded-xl ml-[20px] hover:bg-slate-600"}>{i + 1}</button>
                )
            })}
        </div>
    )
}

export default Pages