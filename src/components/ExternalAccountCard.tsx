/** @jsx jsx */
import React, { useState, FC, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { Segment, Image, Header, Input, Button } from "semantic-ui-react";
import authHeader from "../helpers/authHeader";

interface IProps {
    account: Account;
    accountType: AccountType;
    fetchingAccounts: boolean;
    didFetchAccounts: boolean;
}

const ExternalAccountCard: FC<IProps> = ({
    account,
    accountType,
    fetchingAccounts,
    didFetchAccounts,
}) => {
    const [mfaCode, setMfaCode] = useState<string>("");
    const [requiresMfa, setRequiresMfa] = useState<boolean>(true);

    useEffect(() => {
        const getAccount = async () => {
            // let response = await fetch(`https://localhost:5001/api/externalacctauth/${account.accountId}`, {
            //     method: "GET",
            //     headers: authHeader,
            // });

            // let responseData  = await response.json();
            let responseData = "";

            // console.log(responseData);

            if (responseData.hasOwnProperty("mfa_required"))
                setRequiresMfa(true);
            };

        getAccount();
    }, []);

    async function submitMfa(mfaCode: string) {
        let response = await fetch(`https://localhost:5001/api/externalacctauth/${account.accountId}/${mfaCode}`, {
            method: "GET",
            headers: authHeader,
        });

        let responseData  = await response.json();

        console.log(responseData);
    }

    return (
            <Segment css={styles.ExternalAccount}>
                <h3 css={styles.AccountName}>{accountType !== undefined ? accountType.name : null }</h3>
                <Image
                    src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
                    size="small"
                    css={styles.AccountImage}
                    />
                { requiresMfa ? (
                    <Segment basic textAlign="center">
                        <Header size="small">Requires MFA Authentication</Header>
                        <Input type="text" button value={mfaCode} placeholder="152658" onChange={(e) => setMfaCode(e.target.value)}>
                            <input />
                            <Button icon="arrow right" onClick={() => submitMfa(mfaCode)} />
                        </Input>
                    </Segment>
                ) : null }
            </Segment>
    );
};

const styles = {
    ExternalAccount: css`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    AccountName: css`
        text-transform: capitalize;
        text-align: center;
    `,
    AccountImage: css`
        text-align: center;
    `
};

const mapStateToProps = (state: any, ownProps: any) => {
    const { fetchingAccounts, didFetchAccounts } = state.userAccounts;
    const { account, accountType } = ownProps;
    return {
        account,
        accountType,
        fetchingAccounts,
        didFetchAccounts,
    };
};

export default connect(
    mapStateToProps,
    {}
)(ExternalAccountCard);
