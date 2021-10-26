import { useState, useEffect } from "react"

const useFormTransfers = (form, url) => {
    const [ transfer, setTransfer ] = useState({})

    useEffect(() => {
        const submitTransfer = async () => {
            try {
                let config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                }
                let res = await fetch(url, config)
                let dataTransfer = await res.json()

                setTransfer({
                    transfers: data.transfers.concat(dataTransfer),
                    money: data.money + (dataTransfer.amount)
                })
            }
            catch (error) {
                setTransfer({error})
            }
        }
        submitTransfer()
    })

    return {transfer}
}

export default useFormTransfers
