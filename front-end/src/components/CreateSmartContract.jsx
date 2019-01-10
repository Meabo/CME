import React from 'react';

const CreateSmartContract = props =>
{
    return (
            <button onClick={props.onCreate} className="mt-5 btn btn-secondary">
                Create a Smart Contract
            </button>
    );
};


export default CreateSmartContract;
