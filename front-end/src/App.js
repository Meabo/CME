import React, { Component } from 'react';
import logo from './logo_ethereum.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { withWeb3 } from 'react-web3-provider';
import SweetAlert from 'react-bootstrap-sweetalert';
import UserPanel from "./components/UserPanel";



class App extends Component
{
    state = {
        account: null,
        alert: null,
        connected: false,
        web3:null
    };

   /* getClient_getCurrentAccount = (web3) =>
    {
        let self = this;
        web3.eth.getAccounts().then(account =>
        {
            console.log(account); // DEBUG

        })
    };*/

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

    ShowPopUpSuccess = () =>
    {
        this.setState({ alert:
                (
                    <SweetAlert
                        success
                        title="You are connected to Rinkeby!"
                        onConfirm={this.hideAlert}
                    >
                    </SweetAlert>
                )
        });
    }

    getClient_getCurrentNetwork = (netId) =>
    {
            switch (netId)
            {
                case "1":
                    console.log('This is the Main network.');
                    this.ShowPopUpWarning();
                    break;
                case "2":
                    this.ShowPopUpWarning();
                    console.log('This is the deprecated Morden test network.');
                    break;
                case "3":
                    this.ShowPopUpWarning();
                    console.log('This is the Ropsten test network.');
                    break;
                case "4":
                    console.log('This is the Rinkeby test network.');
                    break;
                case "42":
                    this.ShowPopUpWarning();
                    console.log('This is the Kovan test network.');
                    break;
                default:
                    console.log('This is an unknown network.');
            }

    };


    checkForUpdate = (event) =>
    {
        this.setState({
            account: event.selectedAddress
        })
    }

    connectToMetaMask = () =>
    {
        const {web3} = this.props;
        this.setState({
            web3: web3
        });

        let self = this;

        if (window.ethereum)
        {
            console.log("Ethereum");
            window.ethereum.enable().then((addresses) =>
            {
                //console.log(addresses);
                self.setState(
                    {
                        account: addresses[0]
                    });
                self.getClient_getCurrentNetwork(web3.eth.givenProvider.networkVersion);
                //self.getClient_getCurrentAccount(web3);
                if (web3.eth.givenProvider.networkVersion === "4")
                {
                    this.setState({
                        connected:true
                    });
                }
                //web3.currentProvider.publicConfigStore.on('update', self.checkForUpdate);
            });
        }
        else
        {
            console.log("Metamask")
        }


    };


     connected_state = () =>
     {
         if (this.state.connected)
         {
             return <div className="App">
                    <header className="App-header">
                        <h3 className="text-center text-white">Multis</h3>
                    </header>
                    <UserPanel account={this.state.account} connected={this.state.connected} web3={this.state.web3}/>
             </div>;
         }
         else
         {
             return <div className="App text-center">
                 <header className="App-header">
                     <h3 className="text-center text-white">Crypto Management Ethereum</h3>
                 </header>
                 <div className="mt-5 container-fluid">
                     <img src={logo} className="App-logo" alt="logo" />

                     <div className="container-fluid">
                         <button className="mt-5 btn btn-primary" onClick={this.connectToMetaMask}>
                             Connect your app
                         </button>
                     </div>
                 </div>
                 {this.state.alert}
             </div>;
         }
     };


  render()
  {
      return (this.connected_state())
  }
}

export default withWeb3(App);
