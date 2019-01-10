import React, {Component} from 'react';
import CreateSmartContract from "./CreateSmartContract";
import { Container, Row, Col } from 'reactstrap';

class UserPanel extends Component
{
    state = {
        connected : this.props.connected,
        account: this.props.account,
        contract_called: false,
        name: null
    };

    handleClick = () =>
    {
        console.log("clicked");
        this.setState({
            contract_called: true
        });
    };

    handleChange = ({target}) =>
    {
        this.setState({
            [target.name]: target.value
        });
    };

    render()
    {

        if (this.state.contract_called === false)
        {
            return (
                <div className="App">

                    <div className="mt-5 container-fluid">
                        <h3>
                            Hello, Your ETH Address is {this.state.account}
                        </h3>
                        {this.state.alert}
                    </div>

                    <div className="col-lg-12">
                        <div className="col-md-4">
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                    <div className="col-md-4">
                    <CreateSmartContract onCreate={this.handleClick}/>
                    </div>
                    </div>
                </div>);
        }
        else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h3 className="text-center text-white">Multis</h3>
                    </header>
                    <div className="mt-5 container-fluid">
                        <h3>
                            Hello, Your ETH Address is {this.state.account}
                        </h3>
                        {this.state.alert}
                    </div>


                </div>);
        }
    }

}

export default UserPanel;
