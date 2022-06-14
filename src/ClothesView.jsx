import React, { useEffect, useState } from "react";
import styled from "styled-components";
import blazer from "./assets/imgs/blazer.png";
import blouse from "./assets/imgs/blouse.png";
import cardigan from "./assets/imgs/cardigan.png";
import coat from "./assets/imgs/coat.png";
import hood from "./assets/imgs/hood.png";
import jacket from "./assets/imgs/jacket.png";
import jean from "./assets/imgs/jean.png";
import knit_vest from "./assets/imgs/knit_vest.png";
import knit from "./assets/imgs/knit.png";
import long_padding from "./assets/imgs/long_padding.png";
import long_shirts from "./assets/imgs/long_shirts.png";
import long_Tshirts from "./assets/imgs/long_Tshirts.png";
import mustang from "./assets/imgs/mustang.png";
import onepiece from "./assets/imgs/onepiece.png";
import rider from "./assets/imgs/rider.png";
import short_padding from "./assets/imgs/short_padding.png";
import short_pants from "./assets/imgs/short_pants.png";
import short_shirts from "./assets/imgs/short_shirts.png";
import short_Tshirts from "./assets/imgs/short_Tshirts.png";
import skirt from "./assets/imgs/skirt.png";
import slacks from "./assets/imgs/slacks.png";
import trench_coat from "./assets/imgs/trench_coat.png";
import wide_pants from "./assets/imgs/wide_pants.png";

const one = [short_Tshirts, short_shirts, blouse, onepiece, short_pants, skirt]; //28
const two = [short_Tshirts, short_shirts, blouse, onepiece, wide_pants, skirt]; //23 28
const three = [long_Tshirts, knit_vest, hood, wide_pants, slacks, skirt, jean]; //20 23
const four = [
    blazer,
    jacket,
    rider,
    long_Tshirts,
    long_shirts,
    knit,
    hood,
    cardigan,
    jean,
    wide_pants,
    slacks,
    skirt,
]; //17 20
const five = [
    blazer,
    jacket,
    rider,
    long_Tshirts,
    long_shirts,
    knit,
    cardigan,
    jean,
    wide_pants,
    slacks,
    skirt,
]; //12 17
const six = [jacket, trench_coat, knit_vest, knit, jean, slacks]; //10 12
const seven = [coat, mustang, knit, jean, slacks]; //6 10
const eight = [short_padding, long_padding, coat, mustang, knit, jean];

const ClothesView = (props) => {
    const { temp } = props;
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        if (temp >= 28) setImgs(one);
        else if (23 <= temp && temp < 28) setImgs(two);
        else if (20 <= temp && temp < 23) setImgs(three);
        else if (17 <= temp && temp < 20) setImgs(four);
        else if (12 <= temp && temp < 17) setImgs(five);
        else if (10 <= temp && temp < 12) setImgs(six);
        else if (6 <= temp && temp < 10) setImgs(seven);
        else setImgs(eight);
    }, [temp]);

    return (
        <Wrap>
            {imgs.map((data, idx) => (
                <Img src={data} key={idx} />
            ))}
        </Wrap>
    );
};

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 100%;
    height: 600px;
    border: 1px solid black;
`;
const Img = styled.img`
    width: 200px;
    height: 200px;
    margin: 20px;
`;
export default ClothesView;
