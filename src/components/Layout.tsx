/** @jsx jsx */
import React, { FC } from "react";
import { css, jsx } from "@emotion/core";
import Navbar from "./Navbar";

interface IProps {
    children: any[] | any;
}

const Layout: FC<IProps> = ({ children }) => {
    return (
        <div css={styles.layout}>
            <Navbar />
            {children}
        </div>
    );
};

const styles = {
    layout: css`
        height: 100vh;
    `
};

export default Layout;