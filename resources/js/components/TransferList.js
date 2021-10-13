import React from "react";

function TransferList ({dataTransfers, fallback}) {

    if(!dataTransfers || dataTransfers.length === 0) {
        return fallback
    }
    else {
        return (
            <table className="table">
                <tbody>
                    { dataTransfers.map((transfer) => (
                        <tr key={transfer.id}>
                            <td align="center">{transfer.description}</td>
                            <td align="center" className={transfer.amount > 0 ? 'text-success' : 'text-danger'}>
                                {transfer.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default TransferList
