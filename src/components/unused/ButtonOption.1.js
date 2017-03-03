import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Config from '../Config';

const ButtonOption = ({ onPress, correct, disabled, style, textStyle, children }) => {
    // can pass style prop to component, it will override default style
    // correct argument passed to correct answer, change underlay color based on this
    // test this as it may allow cheating
    return (
        <Animatable.View 
            // ref="view" 
            // style={{ alignItems: 'center' }}
            animation="zoomIn" 
            easing="linear" 
            // iterationCount="infinite"
        >
        <TouchableHighlight 
            underlayColor={correct ? Config.colorAccent100 : Config.colorAccent100} 
            onPress={onPress} 
            style={disabled ? styles.buttonStyleDisabled : [styles.buttonStyle, style]}
        >
            <Text style={[styles.textStyle, textStyle]}>
                {children}
            </Text>
        </TouchableHighlight>
        </Animatable.View>
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
        // borderBottomWidth: 4,
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
        // paddingTop: 10,
        // paddingBottom: 10,
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

export { ButtonOption };
