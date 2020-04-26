interface IUserStoreProps {
    username: string
}

export default class UserStore {
    readonly username: string;

    constructor(props: IUserStoreProps) {
        this.username = props.username;
    }
}
