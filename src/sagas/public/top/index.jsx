import {put, takeEvery} from 'redux-saga/effects'

export function* doLogin() {
    yield takeEvery('FETCH_REQUESTED', login);
}

export default function* login() {
    console.log("login called.");
    try {
        yield put({type: "USER_FETCH_FAILED", message: "e.message"})
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message})
    }
}