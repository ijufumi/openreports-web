import {all} from 'redux-saga/effects'

import doLogin from './public/top'

export default function* rootSaga() {
    console.log("rootSaga");
    yield all([doLogin()])
}