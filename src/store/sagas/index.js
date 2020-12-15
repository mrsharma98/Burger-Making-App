import { takeEvery } from 'redux-saga/effects'
// it listen to certain action and do something when they occured

import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './auth'

export function* watchAuth () {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    // logoutSaga will execute whenever we come cross the mentioned actionTypes

    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
}   