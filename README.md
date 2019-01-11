# Crypto Management Ethereum

CME is a webapp that allow users to scheduled transaction on Ethereum.
This uses Metamask and the Rinkeby Network.
CME has no access to your private keys and won't connect to your account with your approval.

Disclaimer: No timenodes are available on Rinkeby, you'll have to claim your ETH after the delayed time

v1.0:
- UI minimalist with React-Bootstrap
- Metamask privacy mode 
- Detect if user switch network / accounts
- Warnings raised with SweetAlert if Rinkeby is not selected.
- Send Directly or with a delay : both options are possible.
- Uses eac.js-lib to interact with Smart-contract -> https://github.com/ethereum-alarm-clock/eac.js-lib

TODO:
- Improvements on the UI (Material-UI)
- Claim Button to get the ethereum back (for Rinkeby)
- Allow recurring transactions
- Adding the history of scheduled transactions.
- Allowing Multi-sig


CME uses React.js and web3.
