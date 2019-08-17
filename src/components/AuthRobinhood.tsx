import React, { useState, FC } from "react";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";
import { fetchAuth } from "../Redux/robinhoodAuthActions";

interface IProps {
    authToken: string;
    fetchAuth: (
        username: string,
        password: string,
        mfa: string,
        authToken: string
    ) => Promise<void>;
}

const AuthRobinhood: FC<IProps> = ({ authToken, fetchAuth }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mfa, setMfa] = useState<string>("");

    return (
        <div>
            <Input
                type="text"
                value={username}
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
            />
            <Input
                type="text"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            <Input
                type="text"
                value={mfa}
                placeholder="mfa"
                onChange={e => setMfa(e.target.value)}
            />
            <Button
                onClick={() => fetchAuth(username, password, mfa, authToken)}
            >
                Authenticate Now!
            </Button>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const { authToken } = state.userAuth;
    return {
        authToken,
    };
};

export default connect(
    mapStateToProps,
    { fetchAuth }
)(AuthRobinhood);
