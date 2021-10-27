import React, { useState } from "react";
import App from "../components/App"
import Loading from "../components/Loading"
import FatalError from "./Error500";
import useFetchWallet from "../hooks/useFetchWallet";
//import useFormTransfers from "../hooks/useFormTransfers";

const AppContainer = () => {
    const { data, loading, error } = useFetchWallet('http://morocotawallet.dw/api/wallet')
    const [ form, setForm ] = useState({'description': '', 'amount': '', 'wallet_id': 1})

    function handleChange (e) {
        let formState = {
            'description': e.target.name == "description" ? e.target.value : form.description,
            'amount': e.target.name == "amount" ? e.target.value : form.amount,
            'wallet_id': 1
        }
        setForm(formState)
    }

    async function handleSubmit (e) {
        e.preventDefault()
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let res = await fetch('http://morocotawallet.dw/api/transfer', config)
            let dataTransfer = await res.json()
            data.transfers = data.transfers.concat(dataTransfer)
            data.money = parseFloat(data.money) + (parseFloat(dataTransfer.amount))
            useFetchWallet('http://morocotawallet.dw/api/wallet')
        }
        catch (error) {
            setForm({error})
        }
    }

    if(loading)
        return <Loading />
    if(error)
        return <FatalError />
    return (
        <App
            data={data}
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    )
}

export default AppContainer
