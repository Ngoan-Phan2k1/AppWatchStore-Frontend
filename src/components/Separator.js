import React from "react";
import { View } from "react-native";

const Separator = ({height, width, ...extraProps}) => (
    <View style={{height, width, ...extraProps}}/>
);

Separator.defaultProps = {
    height: 0,
    with: 0,
};

export default Separator;