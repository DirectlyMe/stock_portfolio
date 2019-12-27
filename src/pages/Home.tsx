/** @jsx jsx */
import React, { useEffect, FC } from "react";
import { jsx, css } from "@emotion/core";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getAccountTypes } from "../Redux/accountTypesActions";
import { getUserAccounts } from "../Redux/userAccountsActions";
import AddAccount from "../components/AddAccount";
import ExternalAccountCard from "../components/ExternalAccountCard";
import StockCard from "../components/StockCard";
import AddModal from "../components/AddModal";

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

        const storedAccounts = localStorage.getItem("userAccounts");
        if (!storedAccounts) {
            getUserAccounts();
        }
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
        <div>
            <div css={styles.WholePage}>
                <div css={styles.stocksContainer}>
                    <StockCard />
                    <StockCard />
                </div>
                <div css={styles.accountsContainer}>{accountCards}</div>
            </div>
            <AddModal />
        </div>
    );
};

const styles = {
    WholePage: css`
        padding-top: 5vh;
        margin-left: 5vw;
        margin-right: 5vw;
    
        &:before {
            content: "";
            position: fixed;
            right: 0;
            top:0;
            z-index: -1;
            overflow: hidden;
            
            display: block;
            background-color: #1B1B1D;
            background-size: cover;
            width: 100%;
            height: 100%;
        }
    `,
    stocksContainer: css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 2vh;
    `,
    accountsContainer: css`
        margin-left: 5vw;
        margin-right: 5vw;
        margin-bottom: 2vh;
        display: flex;
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
