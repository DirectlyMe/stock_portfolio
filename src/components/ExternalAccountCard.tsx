/** @jsx jsx */
import React, { useState, FC, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { Segment, Image, Header, Input, Button } from "semantic-ui-react";
import authHeader from "../helpers/authHeader";
import { updateAccountAuth } from "../Redux/userAccountsActions";

interface IProps {
    account: Account;
    accountType: AccountType;
    fetchingAccounts: boolean;
    didFetchAccounts: boolean;
    updateAccountAuth: (
        accountId: number,
        externalAuth: ExternalAccountAuth
    ) => void;
}

const ExternalAccountCard: FC<IProps> = ({
    account,
    accountType,
    fetchingAccounts,
    didFetchAccounts,
    updateAccountAuth,
}) => {
    const [mfaCode, setMfaCode] = useState<string>("");
    const [requiresMfa, setRequiresMfa] = useState<boolean>(true);

    useEffect(() => {
        const getAccountAuth = async () => {
            let response = await fetch(
                `https://localhost:5001/api/externalacctauth/${account.accountId}`,
                {
                    method: "GET",
                    headers: authHeader,
                }
            );

            let responseData = await response.json();
            console.log(responseData);

            if (
                responseData.hasOwnProperty("mfa_required") &&
                responseData.mfa_required
            )
                setRequiresMfa(true);
            else updateAccountAuth(account.accountId, responseData);
        };

        if (!account.accountAuth) getAccountAuth();
    }, []);

    async function submitMfa(mfaCode: string) {
        try {
            // let response = await fetch(`https://localhost:5001/api/externalacctauth/${account.accountId}/${mfaCode}`, {
            //     method: "GET",
            //     headers: authHeader,
            // });

            // let responseData  = await response.json();
            // console.log(responseData);
            let responseData = {
                access_token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NzI3OTgzODYsInRva2VuIjoicFhTMWFsQkh2dXFsZlpaQ1pmdGoyZGRPRElKdWpMIiwidXNlcl9pZCI6IjU2OTEzMTMxLTEzNDYtNDFlNi1iNTg0LWQ3YzYwMmQ0YjI0OCIsImRldmljZV9oYXNoIjoiYzQ3ZTY3ZGU2NGNkMWFhMDk0MTc0MjZhNDk0NWM5YWQiLCJzY29wZSI6ImFjYXRzIGJhbGFuY2VzIGRvY3VtZW50X3VwbG9hZCBlZG9jcyBmdW5kaW5nOmFsbDpyZWFkIGZ1bmRpbmc6YWNoOnJlYWQgZnVuZGluZzphY2g6d3JpdGUgZnVuZGluZzp3aXJlOnJlYWQgZnVuZGluZzp3aXJlOndyaXRlIGludGVybmFsIGludmVzdG1lbnRzIG1hcmdpbiByZWFkIHNpZ251cCB0cmFkZSB3YXRjaGxpc3Qgd2ViX2xpbWl0ZWQiLCJ1c2VyX29yaWdpbiI6IlVTIiwib3B0aW9ucyI6dHJ1ZSwibGV2ZWwyX2FjY2VzcyI6ZmFsc2V9.HttvYGDbXGjCz3uRXD-SfdrU4f8chb4EV4eGojcZroVFyfAmvJIgd_oy5CECcMcrQarcYbefEnDAn862kw4xOhGWI12TLLke0h2v9s8lFrIAwZxvWRu2vshKL7V2q9urd2NCD9RKq_30Ivv-PJVp42pF11zV_nG1NpRagqAiTnQ-KmHdwoU18Pp6l7ZAO7QQO8mybFHRLIisd92bajzdk--gt7VAX5HOpy7wMe5aVZZ3jbp9m8S4Gg-s5vt47r_Xb5Rpy7PY3RBRX0DUcnwezQ0EdwIkj1n1k9ptwtNlvDQTe60f9CHbp1txGB6OBhDOSKa-yZhEss6e54dbp5XvPQ",
                backup_code: "",
                expires_in: "129283",
                mfa_code: "855036",
                mfa_required: false,
                refresh_token: "tXdDFsTnMEViYsMeVKWMCYc49gLgq6",
                scope:
                    "acats balances document_upload edocs funding:all:read funding:ach:read funding:ach:write funding:wire:read funding:wire:write internal investments margin read signup trade watchlist web_limited",
                token_type: "Bearer",
            };
            updateAccountAuth(account.accountId, responseData);
        } catch (err) {
            console.log("error");
        }
    }

    return (
        <div css={styles.ExternalAccount}>
            <h3 css={styles.AccountName}>
                {accountType !== undefined ? accountType.name : null}
            </h3>
            <Image
                src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
                size="small"
                css={styles.AccountImage}
            />
            {requiresMfa ? (
                <Segment basic textAlign="center">
                    <Header size="small" inverted>
                        Requires MFA Authentication
                    </Header>
                    <Input
                        type="text"
                        button="true"
                        value={mfaCode}
                        placeholder="152658"
                        onChange={e => setMfaCode(e.target.value)}
                    >
                        <input />
                        <Button
                            icon="arrow right"
                            onClick={() => submitMfa(mfaCode)}
                        />
                    </Input>
                </Segment>
            ) : null}
        </div>
    );
};

const styles = {
    ExternalAccount: css`
        width: 33vw;
        background-color: #1b1b1d;
        box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        border: 1px solid #0e0d0d;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    AccountName: css`
        text-transform: capitalize;
        text-align: center;
    `,
    AccountImage: css`
        text-align: center;
    `,
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

export default connect(mapStateToProps, { updateAccountAuth })(
    ExternalAccountCard
);
