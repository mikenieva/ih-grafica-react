import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
    useParams
} from 'react-router-dom'

import { Line }  from 'react-chartjs-2'


export default function CurrenciesRates() {

    const [data, setData] = useState({})

    const [date, setDate] = useState({
        startDate: "2020-01-01",
        endDate: "2020-02-28"
    })

    const { currency } = useParams()

    useEffect(() => {
        
        const getRates = async (cur) => {

            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}`)

            const rates = await res.data.rates
            console.log("rates:", rates)
            const labels = Object.keys(rates)

            const dataValues = labels.map((fechaIndividual) => {
                return rates[fechaIndividual][cur]
            })

            setData({
                labels,
                datasets: [
                    {
                        label: `Un dólar, vale en ${cur}`,
                        data: dataValues,
                        borderColor: "#000a8b",
                        pointBackgroundColor: "#f42534",
                        pointRadius: 7
                    }
                ]

            })
        }

        getRates(currency)

    }, [currency, date])


    const handleDate = (event) => {
        setDate({
            ...date,
            [event.target.name]: event.target.value
        })
    }


    return (
        <>
            <div>
                <label>Escoge una fecha de inicio</label>
                <input 
                    type="date"
                    onChange={(e) => handleDate(e)}
                    value={date.startDate}
                    name="startDate"
                />

                <label>Escoge una fecha de término</label>
                <input 
                    type="date"
                    onChange={(e) => handleDate(e)}
                    value={date.endDate}
                    name="endDate"
                />
            </div>

            <Line 
                data={ data } 
                options={{
                    responsive: true
                }}
            />
            
        </>
    )
}
