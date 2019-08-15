import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../Redux/actions";

const AuthRobinhood = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mfa, setMfa] = useState<string>("");

    const dispatch = useDispatch();

    return (
        <div>
            <input
                type="text"
                value={username}
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="text"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            <input
                type="text"
                value={mfa}
                placeholder="mfa"
                onChange={e => setMfa(e.target.value)}
            />
            <button
                onClick={() => dispatch(fetchAuth(username, password, mfa))}
            >
                Authenticate Now!
            </button>
        </div>
    );
};

export default AuthRobinhood;
