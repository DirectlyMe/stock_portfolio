/** @jsx jsx */
import React, { FC, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import Register from "../components/Register";

interface IProps extends RouteComponentProps<any> {
    didAuthorize: boolean;
};

const RegisterPage: FC<IProps> = ({ match, history, didAuthorize }) => {
    useEffect(() => {
        if (didAuthorize)
            history.push("/");
    });

    return (
        <div css={styles.registerPage}>
            <Register />
        </div>
    );
};

const styles = {
    registerPage: css`        
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #90EE90;
        height: 100vh;
    `
};

//@ts-ignore
const mapStateToProps = (state: any, { history, match }) => {
    const { didAuthorize } = state.userAuth;
    return {
        didAuthorize,
        history,
        match
    };
};

export default withRouter(connect(mapStateToProps)(RegisterPage));