/** @jsx jsx */
import React, { useEffect, FC } from "react";
import { jsx, css } from "@emotion/core";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getAccountTypes } from "../Redux/accountTypesActions";
import { getUserAccounts } from "../Redux/userAccountsActions";
import AddAccount from "../components/AddAccount";
import AccountCard from "../components/AccountCard";
import ExternalAccountCard from "../components/ExternalAccountCard";

interface IProps extends RouteComponentProps<any> {
    accounts: Account[];
    accountTypes: AccountType[];
    didFetchAccounts: boolean;
    fetchingAccounts: boolean;
    getAccountsError: string;
    getAccountTypes: () => Promise<void>;
    getUserAccounts: () => Promise<void>;
    didAuthorize: boolean;
}

const Home: FC<IProps> = ({
    accounts,
    accountTypes,
    didFetchAccounts,
    fetchingAccounts,
    getAccountsError,
    getAccountTypes,
    getUserAccounts,
    didAuthorize,
}) => {
    useEffect(() => {
        getAccountTypes();
        getUserAccounts();
    }, [didAuthorize]);

    const accountCards =
        accounts !== undefined &&
        accounts.length > 0 &&
        accountTypes !== undefined &&
        accountTypes.length > 0
            ? accounts.map(account => {
                  const acctType = accountTypes.find(
                      type => type.typeId === account.accountId
                  );
                  return (
                      <ExternalAccountCard
                          account={account}
                          accountType={acctType}
                          key={account.accountId}
                      />
                  );
              })
            : [];

    return (
        <div css={styles.button}>
            <div>{accountCards}</div>
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
    `,
};

const mapStateProps = (state: any) => {
    const {
        accounts,
        didFetchAccounts,
        fetchingAccounts,
        getAccountsError,
    } = state.userAccounts;
    const { accountTypes } = state.accountTypes;
    const { didAuthorize } = state.userAuth;
    return {
        accounts,
        accountTypes,
        didFetchAccounts,
        fetchingAccounts,
        getAccountsError,
        didAuthorize,
    };
};

export default connect(
    mapStateProps,
    { getAccountTypes, getUserAccounts }
)(Home);
