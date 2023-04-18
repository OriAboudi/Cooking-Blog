import React, { useEffect, useState } from 'react'
import { ALL_USERS } from '../../../constant/constant';
import CanvasJSReact from '../../../graphs/canvasjs.react';
import { apiGet } from '../../../services/services';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function UsersGraph() {
    const [graph_ar, setGraphAr] = useState([]);

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const { data } = await apiGet(ALL_USERS);
            console.log(data);
            const map_ar = data.map(item => {
                return {
                    label: item.fullName,
                    y: item.recipe_id.length
                }
            })
            setGraphAr(map_ar);
        } catch (error) {
            console.log(error);
        }
    }

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title: {
            text: "Users"
        },
        axisY: {
            includeZero: true
        },

        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: graph_ar


        }]
    }

    return (
        <div className='my-[50px]'>
            <CanvasJSChart options={options} />

        </div>
    )
}