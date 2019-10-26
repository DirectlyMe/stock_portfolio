/** @jsx jsx */
import React, { useState, FC, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { Segment, Image } from "semantic-ui-react";

interface IProps {
    account: {
        username: string;
    };
    accounts: [];
    fetchingAccounts: boolean;
    didFetchAccounts: boolean;
}

const AccountCard: FC<IProps> = ({
    account,
    accounts,
    fetchingAccounts,
    didFetchAccounts,
}) => {
    const [someData, setSomeData] = useState({});

    useEffect(() => {
        fetch(
            "https://investors-exchange-iex-trading.p.rapidapi.com/stock/crm/time-series",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host":
                        "investors-exchange-iex-trading.p.rapidapi.com",
                    "x-rapidapi-key":
                        "314cf20cc4msh47351cec098cea3p1e6226jsnada226f90007",
                },
            }
        )
        .then(response => {
            console.log(response.json());
        })
        .catch(err => {
            console.log(err);
        });
    });

    return (
        <Segment>
            <Image
                src="https://media.glassdoor.com/sqll/1167765/robinhood-squarelogo-1530549970728.png"
                size="small"
            />
            <div></div>
            {account.username}
        </Segment>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    const { accounts, fetchingAccounts, didFetchAccounts } = state.userAccounts;
    const { account } = ownProps;
    return {
        account,
        accounts,
        fetchingAccounts,
        didFetchAccounts,
    };
};

export default connect(
    mapStateToProps,
    {}
)(AccountCard);
