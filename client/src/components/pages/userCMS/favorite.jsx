import React from 'react'
import { useState } from 'react'
import { ADD_FAVORITE } from '../../../constant/constant'
import { apiPost } from '../../../services/services'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { useHover } from '../../../hooks/useHover'



function Favorite({ _id }) {
    const [toggle, setToggle] = useState(false);
    const [status, setStatu] = useState(-1);
    const [elementRef,isHovering ] = useHover()


    const doApi = async () => {
        setToggle((prev => !prev))
        setStatu(prev => !prev);
        console.log(setStatu);

        const _data = { _id, status };
        const { data } = await apiPost(ADD_FAVORITE, _data)
        console.log(data);
    }

    

    return (
        <div className='mt-[15px]'>

            <button className=' ' onClick={doApi}>
                {status ? <FontAwesomeIcon icon={faSquarePlus} className="mr-[10px]" size="2xl" ref={elementRef}   beat={isHovering} style={{ color: "#edc01d", }} /> :
                    <FontAwesomeIcon icon={faSquareMinus} size="2xl" style={{ marginRight: "10px", color: "#e7b80d", }} />}
            </button><span className=''> Favorit</span>

        </div>
    )
}

export default Favorite

