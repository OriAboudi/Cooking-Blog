import React, { useEffect, useState } from 'react'
import { GET_CATEGORIES } from '../../../constant/constant';
import CanvasJSReact from '../../../graphs/canvasjs.react';
import { apiGet } from '../../../services/services';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function CategoriesGraph() {
    const [graph_ar, setGraphAr] = useState([]);

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const { data } = await apiGet(GET_CATEGORIES);
            console.log(data);
            const map_ar = data.map(item => {
                return {
                    label: item.name,
                    y: item.recipe_of_cat_id.length
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
            text: "Categories"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: graph_ar
        }]
    }

    return (
        <div className=''>

            <div className='my-[50px]'>
                <CanvasJSChart options={options} />

            </div>
        </div>
    )
}