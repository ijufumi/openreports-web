import {all} from 'redux-saga/effects'

import login from './public/top'

export default function* rootSaga() {
    yield all([
        login,
    ]);
}