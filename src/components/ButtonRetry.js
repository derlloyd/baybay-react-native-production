import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from '../Config';

const ButtonRetry = ({ onPress }) => {
    // other option hand-o-right
                // <Icon name="repeat" size={60} color="black" style={{ position: 'absolute' }} />
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <View style={styles.containerStyle}>
                <Icon name="repeat" size={60} color="white" style={{ backgroundColor: 'transparent' }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        // flex: 0,    // expand to fill the space
        // alignSelf: 'stretch',   // position self using flexbox rules
        width: 180,
        backgroundColor: Config.colorPrimary700,
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#007aff',     //close to native ios blue
        marginLeft: 5,
        marginRight: 5,
        // minHeight: 20
    },
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 70,
    },
    // textBox: {
    //     flexDirection: 'column',
    // },
    // textStyle: {
    //     color: 'white',
    //     fontSize: 16,
    //     fontWeight: '500',
    //     paddingLeft: 15,
    //     // padding: 10,
    //     // paddingBottom: 10
    // },
    // itunesTextStyle: {
    //     color: 'white',
    //     fontSize: 22,
    //     fontWeight: '500',
    //     paddingLeft: 15,
    //     // padding: 10,
    //     // paddingBottom: 10
    // },
};

export { ButtonRetry };
