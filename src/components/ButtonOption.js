import React from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Config from '../Config';

class ButtonOption extends React.Component {
    // can pass style prop to component, it will override default style
    // correct argument passed to correct answer, change underlay color based on this
    // test this as it may allow cheating
    
    render() {
        const { onPress, correct, disabled, style, children } = this.props;

        let renderChildren = children;

        if (!children) {
            renderChildren = '';
        }

        return (
            <Animatable.View 
                ref="view" 
                style={{ flex: 1 }}
                animation="zoomIn"
                easing="ease" 
                // iterationCount="infinite"
            >
            <TouchableOpacity 
                underlayColor={correct ? Config.colorAccent100 : Config.colorAccent100} 
                onPress={onPress} 
                style={disabled ? styles.buttonStyleDisabled : [styles.buttonStyle, style]}
            >
                <Text style={styles.textStyle}>
                    {renderChildren.toUpperCase()}
                </Text>
            </TouchableOpacity>
            </Animatable.View>
        );
    }
}

const styles = {
    textStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',   // '#007aff'
        fontSize: 16,
        // fontWeight: 'bold',
        fontFamily: Config.fontMain,
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
        marginLeft: Config.deviceWidth / 20,
        marginRight: Config.deviceWidth / 20,
        minHeight: Config.deviceWidth / 10,
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
        marginLeft: Config.deviceWidth / 20,
        marginRight: Config.deviceWidth / 20,
        minHeight: Config.deviceWidth / 10,
    }
};

export { ButtonOption };
