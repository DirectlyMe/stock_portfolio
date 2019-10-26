/** @jsx jsx */
import React, { useState, FC } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { Segment, Form, Input, Button, Select, Message } from "semantic-ui-react";
import { addNewAccount } from "../Redux/userAccountsActions";

interface IProps {
    accountTypes: [
        {
            typeId: number;
            name: string;
        }
    ];
    addNewAccount: (
        accountType: string,
        username: string,
        password: string,
        confirmPass: string
    ) => Promise<void>;
}

const AddAccount: FC<IProps> = ({ accountTypes, addNewAccount }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [currentType, setCurrentType] = useState();
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const typeOptions = accountTypes.map(type => {
        return {
            key: type.typeId,
            value: type.name,
            text: type.name,
        };
    });

    function createAccount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (password === confirmPass) {
            addNewAccount(currentType, username, password, confirmPass);
        }
        else {
            setHasError(true);
            setErrorMessage("Passwords do not match");
        }
    }

    return (
        <Segment>
            <Form css={styles.formLayout} onSubmit={ev => createAccount(ev)} error={ hasError ? true : false }>
                <Message
                    error
                    header="Cannot add Account"
                    content={ hasError ? errorMessage : ""}
                />
                <Select
                    options={typeOptions}
                    placeholder="Account Type"
                    //@ts-ignore
                    onChange={(e: any, { value }) => setCurrentType(value)}
                />
                <Input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />

                <Input
                    type="text"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />

                <Input
                    type="text"
                    value={confirmPass}
                    placeholder="Confirm Password"
                    onChange={e => setConfirmPass(e.target.value)}
                />

                <Button color="green">Authenticate Now!</Button>
            </Form>
        </Segment>
    );
};

const styles = {
    formLayout: css`
        display: flex;
        flex-direction: column;

        
    `,
};

const mapStateToProps = (state: any) => {
    const { accountTypes } = state.accountTypes;
    return {
        accountTypes,
    };
};

export default connect(
    mapStateToProps,
    { addNewAccount }
)(AddAccount);
