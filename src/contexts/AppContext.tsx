import { createContext } from 'react';

type ContextProps = {
    rootStore: any
    action: any
}

const AppContext = createContext<Partial<ContextProps>>({});
export default AppContext;
