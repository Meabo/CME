import React, {Component} from 'react';
import {withWeb3} from "react-web3-provider";
import { EAC } from '@ethereum-alarm-clock/lib';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import BigNumber from 'bignumber.js';
import {Grid, Row, Col} from 'react-bootstrap'

class UserPanel extends Component
{
    constructor(props)
    {
        super(props);
        const {web3} = this.props;
        web3.currentProvider.publicConfigStore.on('update', this.checkForUpdate);
    }
    state = {
        connected : this.props.connected,
        account: this.props.account,
        alert: null,
        balance:'',
        contract_called: false,
        receiver_address:'',
        number_of_eth:0,
        hours:0
    };



    checkForUpdate = (event) =>
    {
        this.setState({
            account: event.selectedAddress
        });

        this.getBalance();
    }


    hideAlert = () =>
    {
        this.setState({
            alert: null
        });
    }

    ShowPopUpWarning = () =>
    {
        this.setState({ alert:
                (
                    <SweetAlert
                        warning
                        title="Please Connect to Rinkeby!"
                        onConfirm={this.hideAlert}
                    >
                    </SweetAlert>
                )
        });
    }

    ShowPopUpSuccess = (response) =>
    {
        this.setState({ alert:
                (
                    <SweetAlert
                        success
                        title="Transaction Success"
                        onConfirm={this.hideAlert}>

                        {response}

                    </SweetAlert>
                )
        });
    }


    sendWithoutDelay = async() =>
    {
        const {web3} = this.props;

       await web3.eth.sendTransaction({
            from: this.state.account,
            to: this.state.receiver_address,
            value:  web3.utils.toWei(this.state.number_of_eth, "ether")
        })
            .on('transactionHash', function(hash)
            {

            })
            .on('receipt', function(receipt)
            {

            })
            .on('confirmation', function(confirmationNumber, receipt){

            })
            .on('error', console.error); // If a out of gas error, the second parameter is the receipt.

    };

    async scheduleTransaction(web3, eac)
    {
        let blockinTheFuture = 20; //this.state.hours * 60 * 4; // 1 minute - 15 secondes par block
        const windowStart = new BigNumber((await web3.eth.getBlockNumber()) + blockinTheFuture);

        const receipt = await eac.schedule({
            from: this.state.account,
            toAddress: this.state.receiver_address,
            timestampScheduling: false,
            callGas: new BigNumber(1000000),
            callValue: this.state.number_of_eth * new BigNumber(Math.pow(10, 18)),
            windowStart
        });

        console.log(receipt);

        if (receipt.status === true)
        {
            const scheduledTx = eac.transactionRequestFromReceipt(receipt);
            await scheduledTx.fillData();
            console.log(scheduledTx);
            const response = 'Address of scheduled transaction is:' +  scheduledTx.address + '\n';
            this.ShowPopUpSuccess(response)
        }

    }


    handleSubmit = async(event) =>
    {
        event.preventDefault();
        const {web3} = this.props;
        const eac = new EAC(web3);

        console.log(typeof this.state.hours);
        if (this.state.hours > 0) {
            await this.scheduleTransaction(web3, eac);
        }
        else {
            await this.sendWithoutDelay();

        }

    };



    handleInputChange = (event) =>
    {
        event.preventDefault();
        this.setState(
            {
               [event.target.name]: event.target.value
            });

    };

    getBalance()
    {
        const {web3} = this.props;
        let self = this;

        web3.eth.getBalance(this.state.account).then(balance =>
        {
            const balance_eth = web3.utils.fromWei(balance, "ether"); // DEBUG
            self.setState(
                {
                    balance: balance_eth
                })
        });
    }



    render()
    {
        console.log("Render called");

            return (<Grid>
                {this.state.alert}
                <Row className="show-grid text-center">
                    <Col xs={12} md={12}>
                    </Col>
                </Row>

                <Row className="show-grid mt-5">
                    <Col xs={6} md={6}>
                        <form onSubmit={this.handleSubmit}>

                            <p> Receiver's address </p>
                            <p> <input name='receiver_address' type='text' placeholder='Receiver Address' onChange={this.handleInputChange} /> </p>

                            <p> Amount to send </p>
                            <p> <input name='number_of_eth' type='number' step="any" placeholder='Amount' min="0" onChange={this.handleInputChange} /> </p>

                            <p> Send Later </p>
                            <p> <input name='hours' type='number' placeholder='Hours to delay' min="0" onChange={this.handleInputChange} /> </p>
                            <p> If 0, the transaction will be sent directly </p>
                            <p><button className="btn btn-secondary mt-2">Create a delayed transaction</button></p>
                        </form>

                    </Col>
                    <Col xs={6} md={4}>
                        <p>Your Account address:</p>
                        <p className="font-weight-bold">
                            {this.state.account}
                        </p>

                        <p>Your Balance address:</p>
                        <p className="font-weight-bold">
                            {this.state.balance} ETH
                        </p>
                    </Col>

                </Row>


            </Grid>);

        }

}

export default withWeb3(UserPanel);
