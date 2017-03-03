import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

const ButtonOptionDisabled = ({ onPress, correct, style, textStyle, children }) => {
    // can pass style prop to component, it will override default style
    // correct argument passed to correct answer, change underlay color based on this
    // test this as it may allow cheating
    return (
        <TouchableHighlight 
            underlayColor={correct ? 'green' : 'red'} 
            onPress={onPress} 
            style={[styles.buttonStyle, style]}
        >
            <Text style={[styles.textStyle, textStyle]}>
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
        fontWeight: 'bold',
    },
    buttonStyle: {
        marginTop: 5,
        // paddingTop: 10,
        // paddingBottom: 10,
        flex: 1,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,     // rounded corners
        // borderBottomWidth: 4,
        // borderRightWidth: 2,
        borderColor: 'grey',
        marginLeft: 15,
        marginRight: 15,
        minHeight: 50,
        // elevation: 50,
    }
};

export { ButtonOptionDisabled };
