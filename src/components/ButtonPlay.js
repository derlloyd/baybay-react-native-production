import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Config from '../Config';

const ButtonPlay = ({ children, onPress }) => {
    // other option hand-o-right
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
        // fontWeight: 'bold',
        // fontFamily: 'KomikaAxis',
        fontFamily: Config.fontMain,
        // fontFamily: 'RifficFree-Bold',
        // paddingLeft: 15,
        // borderWidth: 1,
    },
    buttonStyle: {
        // flex: 0,    // expand to fill the space
        // alignSelf: 'stretch',   // position self using flexbox rules
        width: Config.deviceWidth * 0.7,
        backgroundColor: Config.colorPrimary700,
        borderRadius: 10,
        flex: 0,    // expand to fill the space
        // alignSelf: 'stretch',   // position self using flexbox rules
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: '#007aff',     //close to native ios blue
        margin: 5,
        // marginRight: 5,
        // minHeight: 20
        minHeight: 70,
    },
};

export { ButtonPlay };
