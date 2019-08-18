/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const Home = () => {
    return <div css={styles.button}>This is a test</div>;
};

const styles = {
    button: css`
        background-color: hotpink;
    `,
};

export default Home;
