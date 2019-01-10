import React, { Component } from 'react';
import logo from './logo_ethereum.svg';
import './App.css';
import './bootstrap.min.css'
import { withWeb3 } from 'react-web3-provider';
import SweetAlert from 'react-bootstrap-sweetalert';

class App extends Component
{
    state = {
        account: "",
        web3: null,
        alert: null
    };

    getCurrentAccount = (web3) =>
    {
        let self = this;
        web3.eth.getAccounts().then(account =>
        {
            console.log(account); // DEBUG
            self.setState(
                {
                    account: account
                })
        })
    };

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

    getCurrentNetwork = (netId) =>
    {
            switch (netId)
            {
                case "1":
                    console.log('This is the Main network.');
                    this.ShowPopUpWarning();
                    break;
                case "2":
                    this.ShowPopUpWarning();
                    console.log('This is the deprecated Morden test network.')
                    break;
                case "3":
                    this.ShowPopUpWarning();
                    console.log('This is the Ropsten test network.')
                    break;
                case "4":
                    this.ShowPopUpSuccess();
                    console.log('This is the Rinkeby test network.')
                    break;
                case "42":
                    this.ShowPopUpWarning();
                    console.log('This is the Kovan test network.')
                    break;
                default:
                    console.log('This is an unknown network.')
            }

    };


    checkForUpdate = (event) =>
    {
        this.setState({
            account: event.selectedAddress
        })
        console.log(event);
    }


    async componentDidMount()
    {
        const {web3} = this.props;
        this.getCurrentNetwork(web3.eth.givenProvider.networkVersion);
        this.getCurrentAccount(web3);

        web3.currentProvider.publicConfigStore.on('update', this.checkForUpdate);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>
            Hello {this.state.account}
          </h3>
          <button>
            Create your address
          </button>
        </header>
          {this.state.alert}
      </div>
    );
  }
}

export default withWeb3(App);
