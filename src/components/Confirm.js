import React from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Babyface } from './';
import Config from '../Config';
import Strings from '../Strings';

// assume we will get an onaccept and ondecline function
const Confirm = ({ 
    children, 
    visible, 
    onAccept, 
    onDecline, 
    babyface, 
    ok, 
    style,
    buyLevel,
    buyCoins,
    buyAccessory,
    buyWrongAnswer,
    nsf, 
}) => {
    let renderChildren = children;
    
    if (buyLevel) {
        renderChildren = (
            <Text>
                <Text style={{ color: Config.colorAccent700 }}>
                    {buyLevel.levelName}
                </Text>
                <Text>
                {`
${Strings.doYouWantToBuyLevelForBegin}`}</Text>
                <Text> {buyLevel.levelPrice} </Text>
                <Icon name={Config.coinIconName} size={20} />
                <Text>{Strings.doYouWantToBuyLevelForEnd}</Text>
            </Text>
        );
    }

    if (buyAccessory) {
        renderChildren = (
            <Text>
                <Text style={{ color: Config.colorAccent700 }}>
                    {buyAccessory.desc}
                </Text>
                <Text>
                {`
${Strings.doYouWantToBuyThisFor}`}</Text>
                <Text>{buyAccessory.cost} </Text>
                <Icon name={Config.coinIconName} size={20} />
                <Text>{Strings.doYouWantToBuyLevelForEnd}</Text>
            </Text>
        );
    }

    
    if (buyCoins) {
        renderChildren = (
            <Text>
                <Text style={{ color: Config.colorAccent700 }}>
                    {buyCoins.coinsString}
                </Text>
                <Text> </Text>
                <Icon name={Config.coinIconName} size={20} style={{ color: Config.colorAccent700 }} />
                <Text>
                {`
${Strings.doYouWantToBuyThisFor}`}</Text>
                <Text>{buyCoins.price} </Text>
                <Text>?</Text>
            </Text>
        );
    }

    if (buyWrongAnswer) {
        renderChildren = Strings.removeOneWrongAnswer;
    }

    if (nsf) {
        renderChildren = Strings.sorryInsufficientCoinsBuyMore;
    }

    // standard confirm options modal
    let content = (
        <View style={styles.card}>
            <View style={styles.textSectionStyle}>
                <Text style={styles.textStyle}>
                    {renderChildren}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonCancel} onPress={onDecline}>
                    <Text style={styles.buttonTextCancel}>{Strings.cancel.toUpperCase()} </Text>
                    <Icon name='ban' size={15} style={{ color: Config.colorPrimary }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonYes} onPress={onAccept}>
                    <Text style={styles.buttonTextYes}>{Strings.yes.toUpperCase()} </Text>
                    <Icon name='check' size={15} style={{ color: 'white' }} />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (ok) {
        // if ok is passed, render only 1 OK button
        content = (
        <View style={styles.card}>
            <View style={styles.textSectionStyle}>
                <Text style={styles.textStyle}>
                    {children}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonOk} onPress={onAccept}>
                    <Text style={styles.buttonTextOk}>{Strings.OK.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    if (babyface) {
        // if babyface prop is passed, it contains the name of an accessory
        // render babyface modal
        const accessoryObject = {};
        accessoryObject[babyface] = true;
        // make face a little bigger
        const largeBabyfaceDimesions = Config.babyfaceDimension * 1.3;
        content = (
            <View style={{ alignItems: 'center' }}>
                <Babyface 
                    accessories={accessoryObject} 
                    onPress={onAccept} 
                    imageStyle={{ height: largeBabyfaceDimesions, width: largeBabyfaceDimesions }}
                    overlay={{ height: largeBabyfaceDimesions, width: largeBabyfaceDimesions }}
                />
            </View>
        );
    }

    return (
        <Modal
            visible={visible}   // bool, true visible, false hidden
            transparent
            animationType="fade"   // or "slide" or none
            onRequestClose={() => {}} // android requirement
        >
            <View style={[styles.screenContainer, style]}>
                
            {content} 

            </View>
        </Modal>
    );
};

const radius = 10;

const styles = StyleSheet.create({
    screenContainer: {
        // backgroundColor: 'rgba(0, 0, 100, 0.85)',
        // backgroundColor: 'rgba(200, 220, 255, 0.90)',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        // backgroundOpacity: 0.5,
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        // marginLeft: 5,  // space between l and r
        // marginRight: 5,
        // marginTop: 10,   // space between cards
    },
    card: {
        backgroundColor: 'white',
        padding: Config.deviceWidth / 40,
        marginLeft: Config.deviceWidth / 20,
        marginRight: Config.deviceWidth / 20,
        marginBottom: Config.deviceWidth / 20,
        borderRadius: radius,
        // height: Config.deviceHeight / 2,
        shadowColor: '#000000',
        shadowOpacity: 0.7,
        shadowRadius: 4,
        shadowOffset: {
            height: 4,
            width: 4
        },
    },
    textSectionStyle: {
        // height: 125,
        // flex: 0,
        justifyContent: 'flex-start',
        margin: Config.deviceWidth / 40,
        opacity: 0.87,
        // flexDirection: 'row',
        // borderColor: '#ddd',
        height: Config.deviceHeight / 3,
        position: 'relative',
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        fontFamily: Config.fontMain,
        // textAlign: 'center',
        lineHeight: 40,
        color: Config.colorPrimary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonYes: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: Config.deviceWidth / 2.5,
        // width: 120,
        // minHeight: 50,
        height: Config.deviceHeight / 12,
        marginLeft: 10,
        backgroundColor: Config.colorPrimary,
        borderRadius: radius,
        // borderWidth: 1,
        // borderColor: 'red', 
        // padding: 10,
        // margin: 10,
    },
    buttonTextYes: {
        // paddingLeft: 30,
        // paddingRight: 30,
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: Config.fontMain,
        // color: Config.colorPrimary,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonCancel: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: Config.deviceWidth / 3,
        // width: 100,
        // minHeight: 50,
        height: Config.deviceHeight / 12,
        // marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: radius,
        borderWidth: 2,
        borderColor: Config.colorPrimary, 
        // padding: 10,
        // marginBottom: 10,
    },
    buttonTextCancel: {
        fontFamily: Config.fontMain,
        // paddingLeft: 30,
        // paddingRight: 30,
        fontSize: 15,
        alignSelf: 'center',
        color: Config.colorPrimary,
        // color: 'white',
        fontWeight: 'bold',
    },
    buttonOk: {
        justifyContent: 'center',
        width: Config.deviceWidth / 2.5,
        // width: 120,
        // minHeight: 50,
        height: Config.deviceHeight / 12,
        // marginLeft: 10,
        backgroundColor: Config.colorPrimary,
        borderRadius: radius,
        // borderWidth: 1,
        // borderColor: 'red', 
        // padding: 10,
        // margin: 10,
    },
    buttonTextOk: {
        // paddingLeft: 30,
        // paddingRight: 30,
        fontFamily: Config.fontMain,
        fontSize: 15,
        alignSelf: 'center',
        // color: Config.colorPrimary,
        color: 'white',
        fontWeight: 'bold',
    },
});

export { Confirm };
