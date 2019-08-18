/** @jsx jsx */
import React, { useState, FC } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { registerUser } from "../Redux/userAuthActions";
import { Input, Segment, Form, Header, Button, Message } from "semantic-ui-react";

interface IProps {
    registerError: string;
    registerUser: (username: string, password: string, confirmPassword: string) => Promise<void>;
}

const Register: FC<IProps> = ({ registerError, registerUser }) => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    function login(event: React.FormEvent) {
        event.preventDefault();

        registerUser(userName, password, confirmPassword);
    }

    return (
        <Segment css={styles.login} raised>
            <Form css={styles.loginForm} onSubmit={e => login(e)} error={ registerError ? true : false}>
                <Header size="large">Register</Header>
                <Message
                    error
                    header="Registration failed"
                    content={ registerError ? registerError : "test"}
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
                <Form.Field>
                    <Input
                        type="password"
                        value={confirmPassword}
                        size="big"
                        placeholder="Confirm Password"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Button
                    type="submit"
                    css={styles.registerBtn}
                    size="large"
                    color="blue"
                >
                    Register
                </Form.Button>
            </Form>
        </Segment>
    );
};

const styles = {
    login: css`
        height: 40vh;
        width: 40vw;
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

        input {
            margin: 20px;
        }
    `,
    registerBtn: css`
        width: 100px;
    `,
};

const mapStateToProps = (state: any) => {
    const { registerError } = state.userAuth;
    return {
        registerError
    };
};

export default connect(
    mapStateToProps,
    { registerUser }
)(Register);
