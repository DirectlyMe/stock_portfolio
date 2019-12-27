/** @jsx jsx */
import React, { useState, FC } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import {
    Segment,
    Form,
    Input,
    Button,
    Select,
    Message,
    Header,
} from "semantic-ui-react";
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
        } else {
            setHasError(true);
            setErrorMessage("Passwords do not match");
        }
    }

    return (
        <div css={styles.addAccountLayout}>
            <h3 css={styles.formHeader}>Add New Account</h3>
            <Form
                css={styles.formLayout}
                onSubmit={ev => createAccount(ev)}
                error={hasError ? true : false}
                inverted
            >
                <Message
                    error
                    header="Cannot add Account"
                    content={hasError ? errorMessage : ""}
                    css={styles.formItem}
                />

                <Select
                    options={typeOptions}
                    placeholder="Account Type"
                    //@ts-ignore
                    onChange={(e: any, { value }) => setCurrentType(value)}
                    css={styles.formItem}
                />

                <Input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    css={styles.formItem}
                />

                <Input
                    inverted
                    type="text"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    css={styles.formItem}
                />

                <Input
                    inverted
                    type="text"
                    value={confirmPass}
                    placeholder="Confirm Password"
                    onChange={e => setConfirmPass(e.target.value)}
                    css={styles.formItem}
                />
                
                <span css={styles.formButton}>
                    <Button inverted color="green" size="large">
                        Add Account
                    </Button>
                </span>
            </Form>
        </div>
    );
};

const styles = {
    addAccountLayout: css`
        width: 33vw;
        background-color: #1b1b1d;
        box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, .5);
        border-radius: 5px;
        border: 1px solid #0e0d0d;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    `,
    formLayout: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 65%;

        input: {
            padding: 5px;
        }
    `,
    formHeader: css`
        color: white;
        padding-top: 15px;
    `,
    formItem: css`
        margin: 5px;
        background-color: darkgrey;
    `,
    formButton: css`
        margin: 20px;
        text-align: center;
    `
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
