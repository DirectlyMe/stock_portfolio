/** @jsx jsx */
import React, { useEffect, FC } from "react";
import { jsx, css } from "@emotion/core";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

interface IProps {}

const AccountDetail: FC<IProps> = () => {
    return (
        <div css={styles.WholePage}>
            <div>testing</div>
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
};

const mapPropsToState = (state: any) => {
    return {};
};

export default connect(mapPropsToState, {})(AccountDetail);
