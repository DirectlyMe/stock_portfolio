/** @jsx jsx */
import React, { useEffect, FC, useState } from "react";
import { jsx, css } from "@emotion/core";
import { connect } from "react-redux";
import StockGraphLine from "../components/StockGraphLine";
import { Header, Button } from "semantic-ui-react";

interface IProps {}

const token = "pk_07ac793b25e5487b9599f44eba0666cb";

const AccountDetail: FC<IProps> = () => {
    const [graphData, setGraphData] = useState([]);
    const [currentMetric, setCurrentMetric] = useState<string>("");

    useEffect(() => {
        getStock();
    }, []);

    async function getStock() {
        const response = await fetch(
            `https://cloud.iexapis.com/stable/stock/aapl/time-series?token=${token}`
        );

        const data = await response.json();
        parseTimeData(data);
    }

    function parseTimeData(timeSeriesData: any) {
        let graphData = [
            // {
            //     id: "volume",
            //     color: "hsl(256, 70%, 50%)",
            //     data: [],
            // },
            {
                id: "price",
                color: "hsl(238, 70%, 50%)",
                data: [],
            },
        ];
        
        const volumeIndex = graphData.findIndex(x => x.id === "volume");
        const priceIndex = graphData.findIndex(x => x.id === "price");

        for (let metric of timeSeriesData) {
            let { date, high, volume } = metric;

            // let { data } = graphData[volumeIndex];
            // //@ts-ignore
            // data.push({ x: date, y: volume });
            
            let priceData = graphData[priceIndex].data;
            //@ts-ignore
            priceData.push({ x: date, y: high });
        }

        //@ts-ignore
        setGraphData(graphData);

        console.log(graphData);
    }

    return (
        <div css={styles.WholePage}>
            <Header inverted>Testing</Header>
            <StockGraphLine data={graphData} metric={currentMetric} />
            <Button onClick={() => getStock()}>Get Data</Button>
        </div>
    );
};

const styles = {
    WholePage: css`
        padding-top: 5vh;
        margin-left: 5vw;
        margin-right: 5vw;
        height: 500px;
        color: white;

        &:before {
            content: "";
            position: fixed;
            right: 0;
            top: 0;
            z-index: -1;
            overflow: hidden;

            display: block;
            background-color: #1b1b1d;
            background-size: cover;
            width: 100%;
            height: 100%;
        }
    `,
};

//@ts-ignore
const mapPropsToState = (state: any, { history, match }) => {
    return {
        history,
        match,
    };
};

export default connect(mapPropsToState, {})(AccountDetail);
