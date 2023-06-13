import { useEffect, useState } from "react"

import styled from "@emotion/styled"
import useSelectMonedas from "../hooks/useSelectMonedas"
import {monedas} from '../data/monedas'
import Error from "./Error"

const InputSubmit = styled.input `
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {    
    const [criptos, setCriptos] = useState([])
    const [moneda, SelectMoneda] = useSelectMonedas('Select Monedas', monedas);

    const [error, setError] = useState(false)

    const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas('Select CriptoMonedas', criptos);



useEffect( ()=> {
    const consultarApi = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
        const respuesta = await fetch(url);    
        const resultado = await respuesta.json();

        const arrayCriptos = resultado.Data.map( cripto => {

            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
           return (objeto)
        })
        setCriptos(arrayCriptos)
    }
    consultarApi()
}, [])

const handleSubmit = (e) => {
    e.preventDefault()

    if(moneda == 0 || criptoMoneda == 0) {
        setError(true)
        return
    }
    setError(false)
    setMonedas({
        moneda, 
        criptoMoneda
    })
}
    

  return (
    
    <>
        {error ? <Error>Todos los campos son obligatorios</Error> : ''}
    <form
        onSubmit={handleSubmit}
    >
        
        <SelectMoneda />
        <SelectCriptoMoneda />

        <InputSubmit type="submit" value='Cotizar' />

        
        
    </form>
    </>
  )
}

export default Formulario