import React from "react";
import TransferForm from "./TransferForm";
import TransferList from "./TransferList";

const App = ({data, form, onChange, onSubmit}) => {

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-12 m-t-md">
                    <center>
                        <h1 className="display-1 text-muted">$ {data.money}</h1>
                    </center>
                </div>
                <div className="col-md-6">
                    <TransferForm
                        form={form}
                        onChange={onChange}
                        onSubmit={onSubmit}
                    />
                </div>
                <div className="col-md-6">
                    <TransferList
                        dataTransfers={data.transfers}
                        fallback={"Loading..."}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;
