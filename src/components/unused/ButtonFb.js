import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonFb = ({ onPress, style, textStyle, children }) => {
    // can pass style or textStyle prop to component, it will override default style
    // const leftIcon = icon ? <FontAwesome name={icon} size={20} color="red" /> : null;
            // {leftIcon}

    return (
        <TouchableHighlight onPress={onPress} style={[styles.buttonStyle, style]}>
            <View style={styles.containerStyle}>
                <Icon name="facebook-official" size={35} color="white" />
                <Text style={[styles.textStyle, textStyle]}>
                    {children}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 30,
        padding: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 0,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        backgroundColor: '#3b5998',
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: '#007aff',     //close to native ios blue
        marginLeft: 5,
        marginRight: 5,
        minHeight: 20
    }
};

export { ButtonFb };
