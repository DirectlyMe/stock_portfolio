/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const Home = () => {
    return <div css={styles.button}>Robinhood Login</div>;
};

const styles = {
    button: css`
        background-color: hotpink;
        margin-top: 4vh;
    `,
};

export default Home;
