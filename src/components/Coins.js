import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Config from '../Config';

class Coins extends React.Component { 

    render() {
        const { coins, containerStyle, inverse, boxStyle, textStyle, pop, nobars } = this.props;
        
        let renderBars = (
            <Icon 
                name='bars'
                size={25} 
                color={'white'}
                style={{ paddingLeft: 2, paddingRight: 5 }}
            />
        );

        if (nobars) {
            renderBars = null;
        }
        return (
            <TouchableOpacity onPress={pop ? () => Actions.pop() : () => Actions.settings_tabs()} style={[styles.containerStyle, containerStyle]}>
                <View style={inverse ? styles.boxStyleInverse : [styles.boxStyle, boxStyle]}>
                    <Text style={inverse ? styles.textStyleInverse : [styles.textStyle, textStyle]}>{coins}</Text>
                    <Icon 
                        name={Config.coinIconName}
                        size={20} 
                        color={'white'}
                    />
                </View>
                {renderBars}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coin: {
        height: Config.deviceWidth / 15,
        width: Config.deviceWidth / 15,
    },
    boxStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',   // position self using flexbox rules
        backgroundColor: Config.colorAccent500,
        borderRadius: 8,
        padding: 10,
        margin: 5,
        borderWidth: 1, 
        borderColor: Config.colorAccent900, 
    },
    textStyle: {
        color: 'white',
        fontFamily: Config.fontMain,
        fontSize: 18,
        paddingRight: 3,
    },
    boxStyleInverse: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',   // position self using flexbox rules
        backgroundColor: Config.colorPrimary300,
        borderRadius: 8,
        padding: 10,
        margin: 5,
    },
    textStyleInverse: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: Config.fontMain,
        paddingRight: 3,
    },
});

export { Coins };
