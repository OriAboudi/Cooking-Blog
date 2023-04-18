import React, { useEffect, useState } from 'react'
import { GRAPH_RECIPES } from '../../../constant/constant';
import CanvasJSReact from '../../../graphs/canvasjs.react';
import { apiGet } from '../../../services/services';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function RecipeGraph() {
    const [graph_ar, setGraphAr] = useState([]);

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const { data } = await apiGet(GRAPH_RECIPES);
            console.log(data);
            const map_ar = data.map(item => {
                return {
                    label: item.name,
                    y: item.rating|| 1
                }
            })
            setGraphAr(map_ar);
        } catch (error) {
            console.log(error);
        }
    }

    const options = {
        animationEnabled: true,
        title:{
            text: "Rating Recipes"
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
          
            prefix: ""
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: graph_ar
        }]
    }

    return (
        <div className='my-[50px]'>

            <div className=''>
                <CanvasJSChart options={options} />

            </div>
        </div>
    )
}