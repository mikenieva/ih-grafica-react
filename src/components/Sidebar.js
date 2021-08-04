import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
    Link
} from 'react-router-dom'


export default function Sidebar() {

    const [ currencies, setCurrencies ] = useState([])



    // ES UN HOOK QUE ME PERMITE HACER RERENDERIZADO DE REACT DESPUÉS DE UN CAMBIO PETICIÓN A UN SERVICIO DE TERCERO

    // CICLOS DE VIDA EN REACT
    // PASOS DE EJECUCIÓN EN REACT
    // 1. RENDERIZAR EL RETORNO
    // 2. BUSCAR SI HAY HOOKS DE "USEEFFECT"
    // 3. EN CASO DE QUE SÍ, ENTONCES, EJECUTA EL USEEFFECT
    // 4. VOLVER A CARGAR EL RETORNO

    useEffect(() => {
        const getCurrencies = async () => {
            const res       = await axios.get("https://api.exchangerate.host/latest")
            
            const data      = await res.data.rates

            // Object.keys me permite generar un arreglo con únicamente todos las propiedades del objeto
            const arrData   = Object.keys(data)
            
            setCurrencies(arrData)

        }            

        getCurrencies()


    }, []) // El arreglo como segundo argumento en useEffect significa que solamente se ejecuta UNA VEZ.

    return (
        <>
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>¿Cuánto vale esta moneda en USD?</h1>
            <nav>

                {currencies.map((e, i) => {
                    return (
                        
                        <Link key={i} to={`/${e}`} style={{
                            display: "flex"
                        }}>
                            {e}
                        </Link>

                    )
                })}

                
            </nav>
            </div>
        </>
    )
}
