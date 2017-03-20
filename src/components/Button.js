import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import Config from '../Config';

const Button = ({ onPress, correct, disabled, style, children }) => {
    // can pass style prop to component, it will override default style
    // correct argument passed to correct answer, change underlay color based on this
    // test this as it may allow cheating
    return (
        <TouchableHighlight 
            underlayColor={correct ? Config.colorAccent100 : Config.colorAccent100} 
            onPress={onPress} 
            style={disabled ? styles.buttonStyleDisabled : [styles.buttonStyle, style]}
        >
            <Text style={styles.textStyle}>
                {children}
            </Text>
        </TouchableHighlight>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'white',   // '#007aff'
        fontSize: 16,
        fontFamily: Config.fontMain,
    },
    buttonStyle: {
        marginTop: 5,
        flex: 1,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        justifyContent: 'center',
        backgroundColor: Config.colorPrimary800,
        borderRadius: 10,     // rounded corners
        marginLeft: 15,
        marginRight: 15,
        minHeight: 50,
    },
    buttonStyleDisabled: {
        marginTop: 5,
        flex: 1,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        justifyContent: 'center',
        backgroundColor: Config.colorPrimary100,
        borderRadius: 10,     // rounded corners
        marginLeft: 15,
        marginRight: 15,
        minHeight: 50,
    }
};

export { Button };
