import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

import { COLORS, } from "../constants";

const TextButton = ({ label, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 3,
                paddingHorizontal: 18,
                borderRadius: 15,
                backgroundColor: COLORS.grey,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.white,  }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton;