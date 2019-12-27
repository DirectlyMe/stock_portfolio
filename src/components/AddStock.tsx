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

interface IProps {}

const AddStock: FC<IProps> = () => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [ticker, setTicker] = useState<string>("");

    async function addStock(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const request = fetch(
            `https://investors-exchange-iex-trading.p.rapidapi.com/stock/${ticker}/time-series`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host":
                        "investors-exchange-iex-trading.p.rapidapi.com",
                    "x-rapidapi-key":
                        "314cf20cc4msh47351cec098cea3p1e6226jsnada226f90007",
                },
            }
        );

        const data = (await request).json();
        console.log(data);
    }

    return (
        <div css={styles.addAccountLayout}>
            <h3 css={styles.formHeader}>Add New Account</h3>
            <Form
                css={styles.formLayout}
                onSubmit={ev => addStock(ev)}
                error={hasError ? true : false}
                inverted
            >
                <Message
                    error
                    header="Cannot add Account"
                    content={hasError ? errorMessage : ""}
                    css={styles.formItem}
                />

                <Input
                    inverted
                    type="text"
                    value={ticker}
                    placeholder="Enter a ticker to watch"
                    onChange={e => setTicker(e.target.value)}
                    css={styles.formItem}
                />

                <span css={styles.formButton}>
                    <Button inverted color="green" size="large">
                        Add Stock
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
        box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.5);
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
    `,
};

const mapStateToProps = (state: any) => {
    const { accountTypes } = state.accountTypes;
    return {
        accountTypes,
    };
};

export default connect(mapStateToProps, {})(AddStock);
