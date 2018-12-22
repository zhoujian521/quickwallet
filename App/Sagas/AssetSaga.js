import { call, put, select, all } from 'redux-saga/effects';
import Config from 'react-native-config';

import AssetActions from '../Redux/AssetRedux';

const apiKey = Config.API_URL;
const environment = 'rinkeby';
const timeout = 1000;

export function * getBalance (action) {
    const {data:params} = action;
    const {address} = params;
    const api = require('etherscan-api').init(apiKey, environment, timeout);

    const response =yield call(api.account.balance,address);
    const {status, message, result:ethBanance} = response;
    if (status) {
        yield put(AssetActions.getBalanceSuccess({ethBanance}));
        return;
    }
    yield put(AssetActions.getBalanceFailure(message));
}

export function * getTxlist (action) {
    const {data:params} = action;
    const {address, page=1, offset=20, tokenSymbol='ETH', contractAddress=''} = params;
    const startblock = 0;
    const endblock='999999999';
    const sort='desc';

    if (tokenSymbol === 'ETH') {
        const api = require('etherscan-api').init(apiKey, environment, timeout);
        const response = yield call(api.account.txlist,address, startblock, endblock, page, offset, sort);
        const {status, message, result:txlist} = response;
        if (status) {
            yield put(AssetActions.getTxlistSuccess({txlist}));
            return;
        }
        yield put(AssetActions.getTxlistFailure(message));
        return;
    }

    const api = require('etherscan-api').init(apiKey, environment, timeout);
    const response = yield call(api.account.tokentx, address, contractAddress, startblock, endblock, page, offset, sort);
    const {status, message, result:txlist} = response;
    console.log('===============txlist=====================');
    console.log(txlist);
    console.log('===============txlist=====================');
    if (status) {
        yield put(AssetActions.getTxlistSuccess({txlist}));
        return;
    }
    yield put(AssetActions.getTxlistFailure(message));
}


// {
//   "message": "OK",
//   "result": [
//       {
//         blockHash: "0x5fc3b97c12c741a92581a7b8a7460d9869b37eb8056e4c9f421d3b981bc7d182"
//         blockNumber: "3502879"
//         confirmations: "52520"
//         contractAddress: ""
//         cumulativeGasUsed: "57161"
//         from: "0xb5538753f2641a83409d2786790b42ac857c5340"
//         gas: "51000"
//         gasPrice: "10000000000"
//         gasUsed: "21000"
//         hash: "0x686f625c7a71511327ff27f8c42b68cf00c1fbb1dd91a0cb79986e0f9473cc47"
//         input: "0x"
//         isError: "0"
//         nonce: "141"
//         timeStamp: "1544671886"
//         to: "0x38bcc5b8b793f544d86a94bd2ae94196567b865c"
//         transactionIndex: "1"
//         txreceipt_status: "1"
//         value: "1"
//       },
//   ],
//   "status": "1"
// }

// {
//   "message": "OK",
//   "result": [
//       {
//         blockHash: "0xdbb525db245298040f481405f4b64fdb96cbd7f55c191f51c00143cdb2b8660f"
//         blockNumber: "2883283"
//         confirmations: "672330"
//         contractAddress: "0x875664e580eea9d5313f056d0c2a43af431c660f"
//         cumulativeGasUsed: "4197945"
//         from: "0x0000000000000000000000000000000000000000"
//         gas: "5000000"
//         gasPrice: "1000000000"
//         gasUsed: "3707145"
//         hash: "0x5de187ecb8f49ee6a2760fcb9c5eac6d0df7d43ec788593250027a7b1599336a"
//         input: "0x0e6848cc0000000000000000000000000000000000000000"
//         nonce: "383"
//         timeStamp: "1535319442"
//         to: "0x4e83362442b8d1bec281594cea3050c8eb01311c"
//         tokenDecimal: "18"
//         tokenName: "TEST"
//         tokenSymbol: "TEST"
//         transactionIndex: "3"
//         value: "365000000000000000000"
//       },
//   ],
//   "status": "1"
// }

