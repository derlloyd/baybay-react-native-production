import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Config from '../Config';

// const coin = require('../assets/images/con.png');   // filename coins.png was causing problems?

const Coins = ({ coins, containerStyle, inverse, boxStyle, textStyle }) => {
    // can pass style or textStyle prop to component, it will override default style

    return (
        <TouchableOpacity onPress={() => Actions.settings_tabs()} style={[styles.containerStyle, containerStyle]}>
            <View style={inverse ? styles.boxStyleInverse : [styles.boxStyle, boxStyle]}>
                <Text style={inverse ? styles.textStyleInverse : [styles.textStyle, textStyle]}>{coins}</Text>
                <Icon 
                    name="diamond"
                    size={20} 
                    color={inverse ? Config.colorAccent300 : Config.colorPrimary300}
                />
            </View>
        </TouchableOpacity>
    );
};
                // <Image source={coin} style={styles.coin} resizeMode={Image.resizeMode.contain} />

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: 50
    },
    coin: {
        // color: 'blue',
        height: Config.deviceWidth / 15,
        width: Config.deviceWidth / 15,
    },
    boxStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        // flex: 0,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        backgroundColor: Config.colorAccent500,
        borderRadius: 8,
        // borderWidth: 0,
        // borderColor: Config.colorPrimary700,     //close to native ios blue
        padding: 10,
        // marginRight: 5,
        // minHeight: 20
        // marginRight: 5,
        margin: 5,
    },
    textStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        // paddingLeft: 30,
        // paddingLeft: 3,
        paddingRight: 3,
        // paddingBottom: 10
    },
    boxStyleInverse: {
        alignItems: 'center',
        flexDirection: 'row',
        // flex: 0,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        backgroundColor: Config.colorPrimary300,
        borderRadius: 8,
        // borderWidth: 0,
        // borderColor: Config.colorPrimary700,     //close to native ios blue
        padding: 10,
        // marginRight: 5,
        // minHeight: 20
        // marginRight: 5,
        margin: 5,
    },
    textStyleInverse: {
        color: Config.colorAccent300,
        fontSize: 18,
        fontWeight: '500',
        // paddingLeft: 30,
        // paddingLeft: 3,
        paddingRight: 3,
        // paddingBottom: 10
    },
};

export { Coins };
