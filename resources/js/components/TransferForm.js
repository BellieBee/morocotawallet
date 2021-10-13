import React from "react";

const TransferForm = ({form, onChange}) => (
    <form className="row g-3">
        <div className="col">
            <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                value={form.description}
                onChange={onChange}
            />
        </div>
        <div className="input-group col">
            <div className="input-group-prepend">
                <div className="input-group-text">$</div>
            </div>
            <input
                type="number"
                step="0.01"
                className="form-control"
                name="amount"
                value={form.amount}
                onChange={onChange}
            />
        </div>
        <div className="col">
            <button
                type="submit"
                className="btn btn-primary mb3"
            >
                Add
            </button>
        </div>
    </form>
)

export default TransferForm
