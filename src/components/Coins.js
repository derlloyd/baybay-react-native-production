import React from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Config from '../Config';

// const coin = require('../assets/images/con.png');   // filename coins.png was causing problems?

class Coins extends React.Component { 
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         bounceValue: new Animated.Value(0),
    //     };
    // }
    // state = { springValue: new Animated.Value(1) }
    // state = { springValue: 0 }

    componentWillMount() {
        // Animated.spring(0.3, { toValue: 1, friction: 1 });
        // this.state.springValue.setValue(3);
        // Animated.spring();
        // Animated.spring(this.state.bouceValue, { toValue: 0.8, friction: 1 });
    }
    componentDidMount() {
        // Animated.spring(0.3, { toValue: 1, friction: 1 });
        // this.state.springValue.setValue(3);
        // Animated.spring().start();
        // Animated.spring(this.state.springValue, { toValue: 1.5, friction: 1 });
        // Animated.spring(1, { toValue: 3 });
        // this.state.springValue.setValue(1);
    }
    componentWillReceiveProps() {
        // Animated.spring(1, { toValue: 3 });
    }
    // coins, containerStyle, inverse, boxStyle, textStyle }) => {
    // can pass style or textStyle prop to component, it will override default style
// pop ? () => Actions.pop() : () => Actions.settings_tabs()
            // <Animated.View
            //     style={{ transform: [{ scale: this.state.springValue }] }}
            // >

            // onPress={Actions.settings_tabs()}
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
            // </Animated.View>
                // <Image source={coin} style={styles.coin} resizeMode={Image.resizeMode.contain} />

const styles = StyleSheet.create({
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
        borderWidth: 1, 
        borderColor: Config.colorAccent900, 
    },
    textStyle: {
        color: 'white',
        fontFamily: Config.fontMain,
        // color: Config.colorPrimary300,
        fontSize: 18,
        fontWeight: 'bold',
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
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: Config.fontMain,
        // paddingLeft: 30,
        // paddingLeft: 3,
        paddingRight: 3,
        // paddingBottom: 10
    },
});

export { Coins };
