import { useState, useEffect } from "react"

const useFormTransfers = () => {

    const [ form, setForm ] = useState({
        'description': '',
        'amount': '',
        'wallet_id': 1
    })





    return {form}
}

export default useFormTransfers
