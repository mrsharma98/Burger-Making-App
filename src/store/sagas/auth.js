// Sagas are related to actions
// * turns a function to a generator
// import { delay } from 'redux-saga'
import { put, delay } from 'redux-saga/effects'
// put just dispatches a new action, same as returning.
import * as actions from '../actions/index'
import axios from 'axios'


export function* logoutSaga (action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    // it says that each yield waits for previous one to get finished.

    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga (action) {
    // setTimeout(() => {
    //     dispatch(logout())
    // }, expirationTime * 1000)
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUserSaga (action) {
    // dispatch(authStart())
    yield put(actions.authStart())

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    // Auth req
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbTBgI262A8ndxKaYUVAUqyQJDQclvefc'
    
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbTBgI262A8ndxKaYUVAUqyQJDQclvefc'
    }
    
    try {
        const response = yield axios.post(url, authData)
        
        // console.log(response);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)

        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))  
    } catch (error) {
        yield put(actions.authFail(error.response.data.error))

    }
}

export function* authCheckStateSaga(action) {
    
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))

        if (expirationDate <= new Date()) {
            yield put(actions.logout())
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))

            yield put(actions.checkAuthTimeout(( expirationDate.getTime() - new Date().getTime() ) / 1000))
        }
    }
    
}