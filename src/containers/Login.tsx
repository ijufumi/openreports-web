import React, { FC, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

interface Props {

}

const Login: FC<Props> = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <Card>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Card>
    );
};

export default Login;
