import React from 'react';
import AppContext from "./AppContext";

export const injectContext = (Component) => {
    return (
        <AppContext.Comsumer>
            { context => (
                <Component context={context} {...this.props} />
            )}
        </AppContext.Comsumer>
    );
}
