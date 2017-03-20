import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { Coins } from './';
import Config from '../Config';

class Header extends React.Component {

    render() {
        const { 
            onPressBack, 
            backClose, 
            title, 
            coins, 
            categoryName, 
            levelName, 
            challengeNumber,
            noCoins, 
        } = this.props;
        
        const backChevron = (
            <TouchableOpacity onPress={onPressBack}>
                <View style={styles.backButton}>
                    <Icon 
                        name="chevron-left"
                        size={30} 
                        color="white"
                    />
                </View>
            </TouchableOpacity>
        );

        const backX = (
            <TouchableOpacity onPress={onPressBack}>
                <View style={styles.backButton}>
                    <Icon 
                        name="times"
                        size={40} 
                        color="white"
                    />
                </View>
            </TouchableOpacity>
        );

        const middleText = (
            <View style={styles.middleTextContainer}>

                <View style={styles.middleTextTopContainer}>
                    <Text style={styles.middleTextCategoryName}>
                        {categoryName}
                    </Text>
                </View>

                <View style={styles.middleTextBottomContainer}>
                    <Text style={styles.middleTextLevelName}>
                        {levelName}
                        {challengeNumber ? <Text> - {challengeNumber}</Text> : null} 
                    </Text>
                </View>

            </View>
        );

        return (
            <View style={styles.containerStyle}>

                {backClose ? backX : backChevron}

                <Animatable.View 
                    ref="view" 
                    style={{ flex: 1 }}
                    animation="fadeIn"
                    easing="ease" 
                >
                    {categoryName ? middleText : (<Text style={styles.textStyle}>{title}</Text>)}
                </Animatable.View>

                {noCoins ? null : <Coins coins={coins} />}

            </View>
        );
    }
}
const styles = StyleSheet.create({
    containerStyle: {
        height: Config.headerHeight,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: Config.colorPrimary,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 0
        },
        paddingTop: Config.statusBarPadding,
    },
    backButton: {
        width: 50,
        marginLeft: 5,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    textStyle: {
        color: 'white',
        fontFamily: Config.fontMain,
        fontSize: 20,
    },
    middleTextContainer: {
        width: Config.deviceWidth * 0.5, 
    },
    middleTextTopContainer: {
    },
    middleTextCategoryName: {
        fontFamily: Config.fontMain,
        fontSize: 18, 
        opacity: 0.87, 
    },
    middleTextBottomContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row', 
        alignItems: 'center',
        width: 200, 
    },
    middleTextLevelName: {
        fontFamily: Config.fontMain,
        color: 'white', 
    },
});

export { Header };
