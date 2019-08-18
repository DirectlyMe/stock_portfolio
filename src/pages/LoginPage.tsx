/** @jsx jsx */
import React, { FC, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Login from "../components/Login";
import { connect } from "react-redux";

interface IProps extends RouteComponentProps<any> {
    didAuthorize: boolean;
}

const LoginPage: FC<IProps> = ({ match, history, didAuthorize }) => {
    useEffect(() => {
        if (didAuthorize)
            history.push("/");
    });

    return (
        <div css={styles.loginPage}>
            <Login />
        </div>
    );
};

const styles = {
    loginPage: css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #6EC5E9;
    `
};

//@ts-ignore
const mapStateToProps = (state: any, { history, match }) => {
    const { didAuthorize } = state.userAuth;
    return {
        history,
        match,
        didAuthorize
    };
};

export default withRouter(connect(mapStateToProps)(LoginPage));