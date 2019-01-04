import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    request: ['data'],
    success: ['data'],

    setSelectedToken:['data'],

    getTokenListRequest: ['data'],
    getTokenListSuccess: ['data'],
    getTokenListFailure: null,

    getTokenBalanceRequest: ['data'],
    getTokenBalanceSuccess: ['data'],
    getTokenBalanceFailure: null,

    getBalanceRequest: ['data'],
    getBalanceSuccess: ['data'],
    getBalanceFailure: null,

    getTxlistRequest: ['data'],
    getTxlistSuccess: ['data'],
    getTxlistFailure: null,
});

export const AssetTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
/**
 * user
 *
 * uid      用户ID
 * nickname 用户名称
 * type     用户邀请码
 */
export const INITIAL_STATE = Immutable({
    refreshing: null,
    loading: null,
    failure: null,
    error: null,

    tokenList:[],
    selectedToken:{},

    balances:[],
    txlist:[],
    ethBanance:'',
});

/* ------------- Selectors ------------- */

export const ConfigSelectors = {
    selectBalances: state => state.asset.balances,
    selectTxlist: state => state.asset.txlist,
};

/* ------------- Reducers ------------- */

export const getBalanceSuccess = (state, { data }) =>{
    const {tokenList} = state;
    const {symbol:ETH, banance} = data;
    const list = tokenList.map((token)=>{
        const {Symbol:symbol} = token; // token
        if (symbol !== ETH) {
            return token;
        }
        const count = banance / 1e18;
        return token.merge({count});
    });
    return state.merge({tokenList:list});
};

export const getBalanceFailure = (state, { data }) => state;

export const getTokenBalanceSuccess = (state, { data }) =>{

    console.log('==============data======================');
    console.log(data);
    console.log('==============data======================');

    const {tokenList} = state;
    const {symbol:tokenname, banance} = data;
    const list = tokenList.map((token)=>{
        const {Symbol:symbol} = token; // token
        if (symbol !== tokenname) {
            return token;
        }
        const count = banance / 1e18;
        return token.merge({count});
    });
    return state.merge({tokenList:list});
};


export const getTokenBalanceFailure = (state, { data }) => state;

// successful avatar lookup
export const setSelectedToken = (state, { data }) =>
    state.merge({...data });

// request the avatar for a user
export const request = (state, { data }) =>
    state.merge({ refreshing: true, payload: null });

// successful avatar lookup
export const success = (state, { data }) =>
    state.merge({ refreshing: false, loading: false, error: null, ...data });


// failed to get the avatar
export const failure = (state) =>
    state.merge({ refreshing: false, loading: false,  error: true, payload: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_SELECTED_TOKEN]: setSelectedToken,

    [Types.GET_TOKEN_LIST_REQUEST]: request,
    [Types.GET_TOKEN_LIST_SUCCESS]: success,
    [Types.GET_TOKEN_LIST_FAILURE]: failure,

    [Types.GET_TOKEN_BALANCE_SUCCESS]: getTokenBalanceSuccess,
    [Types.GET_TOKEN_BALANCE_FAILURE]: getTokenBalanceFailure,

    [Types.GET_BALANCE_REQUEST]: request,
    [Types.GET_BALANCE_SUCCESS]: getBalanceSuccess,
    [Types.GET_BALANCE_FAILURE]: getBalanceFailure,

    [Types.GET_TXLIST_REQUEST]: request,
    [Types.GET_TXLIST_SUCCESS]: success,
    [Types.GET_TXLIST_FAILURE]: failure
});
