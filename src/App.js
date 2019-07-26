import React from 'react';
import Navigator from './navigator/rootNavigator'
import { Provider } from 'react-redux';
import Store from './store';

export default (props) => {
    return(
        <Provider store = {Store}>
            <Navigator />
        </Provider>
    )
}