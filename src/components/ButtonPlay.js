import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Config from '../Config';

const ButtonPlay = ({ children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
                <Text style={styles.textStyle}>
                    {children}
                </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'white',   // '#007aff'
        fontSize: 25,
        fontFamily: Config.fontMain,
    },
    buttonStyle: {
        width: Config.deviceWidth * 0.7,
        backgroundColor: Config.colorPrimary700,
        borderRadius: 10,
        flex: 0,    // expand to fill the space
        justifyContent: 'center',
        margin: 5,
        minHeight: 70,
    },
};

export { ButtonPlay };
