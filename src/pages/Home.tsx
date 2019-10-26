/** @jsx jsx */
import React, { useEffect, FC } from "react";
import { jsx, css } from "@emotion/core";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getAccountTypes } from "../Redux/accountTypesActions";
import { getUserAccounts } from "../Redux/userAccountsActions";
import AddAccount from "../components/AddAccount";
import AccountCard from "../components/AccountCard";

interface IProps extends RouteComponentProps<any> {
    accounts: Account[];
    didFetchAccounts: boolean;
    fetchingAccounts: boolean;
    getAccountsError: string;
    getAccountTypes: () => Promise<void>;
    getUserAccounts: () => Promise<void>;
}

const Home: FC<IProps> = ({
    accounts,
    didFetchAccounts,
    fetchingAccounts,
    getAccountsError,
    getAccountTypes,
    getUserAccounts
}) => {
    useEffect(() => {
        getAccountTypes();
        getUserAccounts();
    }, []);

    const accountCards = accounts != [] && accounts != null ? accounts.map(account => (
        <AccountCard account={account} />
    )) : [];

    return (
        <div css={styles.button}>
            <AddAccount />
            <div>
                {accountCards}
            </div>
        </div>
    );
};

const styles = {
    button: css`
        display: flex;
        justify-content: center;
        margin-top: 5vh;
    `,
    accountCards: css`
        display: flex;
        justify-content: center;
        flex-direction: row;
    `
};

const mapStateProps = (state: any) => {
    const {
        accounts,
        didFetchAccounts,
        fetchingAccounts,
        getAccountsError,
    } = state.userAccounts;
    return {
        accounts,
        didFetchAccounts,
        fetchingAccounts,
        getAccountsError,
    };
};

export default connect(
    mapStateProps,
    { getAccountTypes, getUserAccounts }
)(Home);
