import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { Coins } from './';
import Config from '../Config';
// import Strings from '../Strings';

class Header extends React.Component {
    componentWillUpdate() {
        // LayoutAnimation.easeInEaseOut();
    }

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
            <View style={styles.backButton}>
                <TouchableOpacity onPress={onPressBack}>
                    <Icon 
                        name="chevron-left"
                        size={30} 
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        );

        const backX = (
            <View style={styles.backButton}>
                <TouchableOpacity onPress={onPressBack}>
                    <Icon 
                        name="times"
                        size={40} 
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        );

        // const challengeNum = (
        //     <View style={styles.challengeNumContainer}>
        //         <Text style={styles.challengeNumText}>
        //             {challengeNumber}
        //         </Text>
        //     </View>
        // );

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
                    // {challengeNumber ? <Text> - {challengeNumber}</Text> : null}
                    // {challengeNumber ? challengeNum : null}

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
        // flex: 1,
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
        // flex: 1,
        width: 50,
        marginLeft: 5,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // borderWidth: 1,
    },
    textStyle: {
        color: 'white',
        // alignItems: 'center',
        fontFamily: Config.fontMain,
        fontSize: 20,
        // fontWeight: 'bold',
    },
    middleTextContainer: {
        width: Config.deviceWidth * 0.5, 
        // marginLeft: 15,             // trying to center middleText
        // height: Config.headerHeight / 2, 
        // marginTop: 15,
        // borderWidth: 1,
        // backgroundColor: 'transparent',
    },
    middleTextTopContainer: {
        // width: 200, 
        // height: Config.headerHeight / 2,
    },
    middleTextCategoryName: {
        // textAlign: 'center', 
        fontFamily: Config.fontMain,
        fontSize: 18, 
        opacity: 0.87, 
    },
    middleTextBottomContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row', 
        // justifyContent: 'center',
        alignItems: 'center',
        width: 200, 
        // height: Config.headerHeight / 2,
    },
    middleTextLevelName: {
        // textAlign: 'center', 
        fontFamily: Config.fontMain,
        color: 'white', 
        // fontWeight: 'bold',
    },
    // challengeNumContainer: {
    //     // borderWidth: 2, 
    //     backgroundColor: Config.colorPrimary800,
    //     borderColor: 'white',
    //     marginLeft: 10,
    //     padding: 5, 
    //     borderRadius: 5,
    // },
    // challengeNumText: {
    //     textAlign: 'center', 
    //     color: 'white', 
    //     fontWeight: 'bold',
    // },
});

export { Header };
