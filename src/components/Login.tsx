/** @jsx jsx */
import React, { useState, FC } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { loginUser } from "../Redux/userAuthActions";
import { Input, Segment, Form, Header, Message } from "semantic-ui-react";

interface IProps {
    loginError: string;
    loginUser: (username: string, password: string) => Promise<void>;
}

const Login: FC<IProps> = ({ loginError, loginUser }) => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function login(event: React.FormEvent) {
        event.preventDefault();

        loginUser(userName, password);
    }

    return (
        <Segment css={styles.login} raised>
            <Form css={styles.loginForm} onSubmit={e => login(e)} error={ loginError ? true : false}>
                <Header size="large">Login</Header>
                <Message
                    error
                    header="Login Incorrect"
                    content={ loginError ? loginError : "test"}
                />
                <Form.Field>
                    <Input
                        type="text"
                        value={userName}
                        size="big"
                        placeholder="Username"
                        onChange={e => setUserName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        type="password"
                        value={password}
                        size="big"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Button
                    type="submit"
                    css={styles.loginBtn}
                    size="large"
                    color="blue"
                >
                    Log in
                </Form.Button>
            </Form>
        </Segment>
    );
};

const styles = {
    login: css`
        height: 35vh;
        width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    loginForm: css`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 70%;
        height: 80%;
    `,
    loginBtn: css`
        width: 100px;
    `,
};

const mapStateToProps = (state: any) => {
    const { loginError } = state.userAuth;
    return {
        loginError
    };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
