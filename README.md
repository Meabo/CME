# Crypto Management Ethereum

CME is a webapp that allow users to scheduled transaction on Ethereum.
This uses Metamask and the Kovan Network.
CME has no access to your private keys and won't connect to your account with your approval.

v1.0:
- UI minimalist with React-Bootstrap
- Metamask privacy mode 
- Detect if user switch network / accounts
- Warnings raised with SweetAlert if Kovan is not selected.
- Send Directly or with a delay : both options are possible.
- Uses eac.js-lib to interact with Smart-contract -> https://github.com/ethereum-alarm-clock/eac.js-lib

TODO:
- Improvements on the UI (Material-UI)
- Allow recurring transactions
- Adding the history of scheduled transactions.
- Allowing Multi-sig


CME uses React.js and web3.
