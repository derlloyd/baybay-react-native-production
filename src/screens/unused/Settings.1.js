import React from 'react';
import { View, Text, Switch, Image, TouchableOpacity, ScrollView, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';
import * as Animatable from 'react-native-animatable';

import { Babyface, Confirm, SettingsHeader } from '../components';
import Config from '../Config';
import { toggleSwitchAccessory, coinsSubtract } from '../actions';

const { InAppUtils } = NativeModules;

class Settings extends React.Component {
    state = { 
        buyModal: false, 
        coinsModal: false, 
        babyModal: false, 
        buyCoinsView: true, 
        inAppModal: false, 
        accessory: '',
        products: '',
        buyOption: '',
    }
    componentWillMount() {
        const products = [
            'com.BayBay.Purchase.Coin1000',
            'com.BayBay.Purchase.Coin2500',
            'com.BayBay.Purchase.Coin7000',
            'com.BayBay.Purchase.Coin16000',
            ];
        InAppUtils.loadProducts(products, (error, result) => {
            // console.log('result: ', result);
            this.setState({ products: result });
        });
    }

    onAcceptBuyModal() {
        // user accepts to buy, execute main action
        // dispatch action to subtract coins AND set value to true
        this.props.toggleSwitchAccessory(this.state.accessory.name, true);
        this.props.coinsSubtract(this.state.accessory.cost);
        // then close modal
        this.setState({ buyModal: false });
    }

    onDeclineBuyModal() {
        // hide modal when user clicks NO
        this.setState({ buyModal: false });
    }

    onAcceptCoinsModal() {
        // accept to buy more coins, go to accessories screen
        this.setState({ coinsModal: false });
        this.setState({ buyCoinsView: true });
    }

    onDeclineCoinsModal() {
        this.setState({ coinsModal: false });
    }
    closeBabyModal() {
        this.setState({ babyModal: false });
    }
    buyAccessory(accessory) {
        // check if user has enough coins
        if (this.props.coins >= accessory.cost) {
            // if yes, popup modal to confirm
            this.setState({ buyModal: !this.state.buyModal, accessory });
        } else {
            // if no, popup modal to buy more coins
            this.setState({ coinsModal: !this.state.coinsModal });
        }
    }
    buyCoins(buyOption) {
        this.setState({ inAppModal: !this.state.inAppModal, buyOption });
    }
    onAcceptInAppModal() {
        // deploy in app purchase                                       *** TODO IN APP PURCHASE
        console.log('buy this option ', this.state.buyOption);
        this.props.coinsSubtract(-this.state.buyOption.coins);


        this.setState({ inAppModal: false });
    }
    onDeclineInAppModal() {
        this.setState({ inAppModal: false });
    }

    playSuccessSound() {
        // get random songname
        const array = this.props.gamesounds[1].urls;
        const randomIndex = Math.floor(Math.random() * array.length);
        const songName = array[randomIndex].url;
        const songNameEncoded = songName.replace(/ /g, '%20');
        
        new Player('file://' + Config.localGamesounds + songNameEncoded).play();
    }
    previewAccessory(accessory) {
        this.setState({ babyModal: !this.state.babyModal, accessory });
    }
    buyOrSwitch(accessory, accessories) {
        if (accessories[accessory.name] === true || accessories[accessory.name] === false) {
            // accessory value is true or false, render switch, purchased item
            return (
                <Switch
                    value={this.props.accessories[accessory.name]}
                    onValueChange={(value) => this.props.toggleSwitchAccessory(accessory.name, value)}
                    onTintColor={Config.colorAccent500}
                />
            );
        } else {
            // accessory value is blank, render BUY button, not purhcased yet
            return (
                <TouchableOpacity onPress={() => this.buyAccessory(accessory)} style={styles.buyButton}>
                    <Icon 
                        name="shopping-cart"
                        size={25} 
                        color='white'
                    />
                </TouchableOpacity>
            );
        }
    }
    coinsOrBlank(accessory, accessories) {
        if (accessories[accessory.name] === true || accessories[accessory.name] === false) {
            // accessory value is true or false, purchased item, show --
            return (
                <Text style={styles.coinsText}>-</Text>
            );
        } else {
            // accessory value is blank, render coins cost, not purhcased yet
            return (
                <View style={styles.coinsBox}>
                    <Text style={styles.coinsText}>{accessory.cost} </Text>
                    <Icon 
                        name={Config.coinIconName}
                        size={15} 
                        style={styles.coinStyle}
                    />
                </View>
            );
        }
    }
    renderAccessoryTable() {
        // create a string of JSX
        const rendered = [];

        // one row for each accessory (array of objects in Config file)
            Config.accessories.forEach((accessory, i) => {
                rendered.push(
                    <View 
                        key={i}
                        style={styles.accessoryRow}
                    >
                        <TouchableOpacity style={styles.columnThumb} onPress={() => this.previewAccessory(accessory)} >
                            <Image
                                key={i} 
                                source={accessory.image}
                                style={styles.thumbnail}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.columnDesc} onPress={() => this.previewAccessory(accessory)}>
                            <Text style={styles.columnDescText} onPress={() => this.previewAccessory(accessory)} >
                                {accessory.desc}
                            </Text>
                        </TouchableOpacity>
                        
                        <View style={styles.columnCoins}>
                            {this.coinsOrBlank(accessory, this.props.accessories)}
                        </View>

                        <View style={styles.columnBuy}>
                            {this.buyOrSwitch(accessory, this.props.accessories)}
                        </View>

                    </View>
                );
            });
        
        return rendered;
    }
    renderCoinsPurchaseTable() {
        // create a string of JSX
        const rendered = [];

        // one row for each accessory (array of objects in Config file)
            this.props.coinsPurchaseOptions.forEach((option, i) => {
                rendered.push(
                    <View 
                        key={i}
                        style={styles.accessoryRow}
                    >
                        <View style={styles.columnCoins}>
                            <TouchableOpacity style={styles.coinsBox} onPress={() => this.buyCoins(option)}>
                                <Text style={styles.buyCoinsText} >+ {option.coins} </Text>
                                <Icon 
                                    name={Config.coinIconName}
                                    size={15} 
                                    style={styles.buyCoinStyle}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.columnDesc}>
                            <Text style={styles.columnOptionPriceText} onPress={() => this.buyCoins(option)} >
                                $ {option.price / 100}
                            </Text>
                        </View>
                        
                        <View style={styles.columnThumb} />

                        <View style={styles.columnBuy}>
                            <TouchableOpacity onPress={() => this.buyCoins(option)} style={styles.buyButton}>
                                <Icon 
                                    name="shopping-cart"
                                    size={25} 
                                    color='white'
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                );
            });
        
        return rendered;
    }
    reverseCoinView() {
        this.setState({ buyCoinsView: !this.state.buyCoinsView });
    }
    render() {
        // console.log('main props.accessories ', this.props.accessories);
        const renderAccessoryBabyface = (
                <View style={{ alignItems: 'center' }}>
                    <Babyface 
                        onPress={this.playSuccessSound.bind(this)}
                        accessories={this.props.accessories}
                        imageStyle={{ height: Config.babyfaceDimensionSettings, width: Config.babyfaceDimensionSettings }}
                        overlay={{ height: Config.babyfaceDimensionSettings, width: Config.babyfaceDimensionSettings }}
                    />
                </View>
        );
        const renderAccessoryView = (
            <ScrollView style={styles.tableContainer}>
                {this.renderAccessoryTable()}
            </ScrollView>
        );
        const renderCoinsView = (
            <ScrollView style={styles.tableContainer}>
                {this.renderCoinsPurchaseTable()}
            </ScrollView>
        );
        console.log('props ', this.props);
        console.log('state ', this.state);
        return (
            <View style={styles.screenContainer}>

                <SettingsHeader 
                    backClose
                    onPressBack={() => { Actions.pop(); }} 
                    title="" 
                    coins={this.props.coins}
                />

                <View style={styles.selectionButtonContainer}>
                    <TouchableOpacity
                        style={this.state.buyCoinsView ? styles.selectionButtonSelected : styles.selectionButton} 
                        onPress={this.state.buyCoinsView === false ? () => { this.reverseCoinView(); } : () => {}} 
                    >
                        <Icon 
                            name="plus"
                            size={25} 
                            color={'white'}
                            style={this.state.buyCoinsView ? { opacity: 1 } : { opacity: 0.65 }}
                        />
                        <Text>  </Text>
                        <Icon 
                            name={Config.coinIconName}
                            size={40} 
                            color={'white'}
                            style={this.state.buyCoinsView ? { opacity: 1 } : { opacity: 0.65 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.buyCoinsView ? styles.selectionButton : styles.selectionButtonSelected} 
                        onPress={this.state.buyCoinsView ? () => { this.reverseCoinView(); } : () => {}} 
                    >
                        <Icon 
                            name="plus"
                            size={25} 
                            color={'white'}
                            style={this.state.buyCoinsView ? { opacity: 0.65 } : { opacity: 1 }}
                        />
                        <Text>  </Text>
                        <Icon 
                            name="smile-o"
                            size={40} 
                            color={'white'}
                            style={this.state.buyCoinsView ? { opacity: 0.65 } : { opacity: 1 }}
                        />
                    </TouchableOpacity>
                </View>

                {this.state.buyCoinsView ? renderCoinsView : renderAccessoryView}
                
                <Animatable.View 
                    ref="view" 
                    style={{ flex: 0 }}
                    animation="fadeInUp"
                    easing="ease" 
                >
                    {this.state.buyCoinsView ? <View /> : renderAccessoryBabyface}

                </Animatable.View>

                <Confirm
                    visible={this.state.buyModal}
                    onAccept={this.onAcceptBuyModal.bind(this)}
                    onDecline={this.onDeclineBuyModal.bind(this)}
                    buyAccessory={{ cost: this.state.accessory.cost, desc: this.state.accessory.desc }}
                />

                <Confirm
                    visible={this.state.coinsModal}
                    onAccept={this.onAcceptCoinsModal.bind(this)}
                    onDecline={this.onDeclineCoinsModal.bind(this)}
                    nsf
                />

                <Confirm
                    babyface={this.state.accessory.name}
                    visible={this.state.babyModal}
                    onAccept={this.closeBabyModal.bind(this)}
                    onDecline={this.closeBabyModal.bind(this)}
                />

                <Confirm
                    visible={this.state.inAppModal}
                    onAccept={this.onAcceptInAppModal.bind(this)}
                    onDecline={this.onDeclineInAppModal.bind(this)}
                    buyCoins={{ coins: this.state.buyOption.coins, price: this.state.buyOption.priceString }}
                />

            </View>       
        );
    }
}

const styles = {
    screenContainer: {
        // marginBottom: 50,
        flex: 1,
        backgroundColor: Config.colorPrimary50,
    },
    selectionButtonContainer: {
        // flex: 0,
        // alignItems: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'row',
        // alignItems: 'center',
    },
    selectionButton: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Config.colorPrimary200,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 15,
        // textAlign: 'center',
        // opacity: 0.2,
        // color: 'white',
    },
    selectionButtonSelected: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Config.colorPrimary900,
        paddingTop: 10,
        paddingBottom: 10,
        // paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: Config.colorAccent700,
        // fontWeight: 'bold',
    },
    tableContainer: {
        flex: 1,
        // borderTopWidth: 1,
        // borderColor: Config.colorPrimary300,
    },
    accessoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: Config.colorPrimary200,
        // borderLeftColor: 'white',
        // borderRightColor: 'white',
        backgroundColor: 'white',
        minHeight: Config.deviceWidth / 8,
        // flex: 1,
        // justifyContent: 'space-around',
        // marginBottom: 5,
    },
    // headerColumn1: {
    //     width: Config.deviceWidth / 10 * 3,  // 3/10ths of width
    //     color: 'white',
    // },
    // headerColumn3: {
    //     marginLeft: 15, // cant get text to center, so manual margin
    //     color: 'white',
    // },
    columnThumb: {
        width: Config.deviceWidth / 10 * 2,
        alignItems: 'center',
        // color: 'red',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    columnDesc: {
        width: Config.deviceWidth / 10 * 3,
        // borderWidth: 1,
        alignSelf: 'stretch', 
        justifyContent: 'center',
        // borderColor: 'green',
    },
    columnDescText: {
        color: Config.colorAccent700,
        // opacity: 0.85,
        fontFamily: Config.fontMain,
    },
    columnOptionPriceText: {
        // color: Config.colorAccent700,
        opacity: 0.85,
        textAlign: 'right',
        fontFamily: Config.fontMain,
    },
    columnCoins: {
        width: Config.deviceWidth / 10 * 3,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'green',
    },
    columnBuy: {
        width: Config.deviceWidth / 10 * 2,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    coinsBox: {
        flexDirection: 'row',
        // justifyContent: 'flex-end',
    },
    coinsText: {
        opacity: 0.85,
        // textAlign: 'right',
        fontFamily: Config.fontMain,
    },
    buyCoinsText: {
        // opacity: 0.85,
        color: Config.colorAccent700,
        // fontWeight: 'bold',
        // textAlign: 'right',
        fontFamily: Config.fontMain,
    },
    coinStyle: {
        opacity: 0.85,
    },
    buyCoinStyle: {
        color: Config.colorAccent700,
        fontWeight: 'bold',
        // opacity: 0.85,
    },
    thumbnail: {
        height: Config.deviceWidth / 10,
        width: Config.deviceWidth / 10,
    },
    buyButton: {
        backgroundColor: Config.colorPrimary900,
        paddingLeft: 17,
        paddingRight: 17,
        padding: 5,
        borderRadius: 17,
    },
        // backgroundColor: Config.colorPrimary900,
    // buyButtonText: {
    //     color: 'white',
    // },
};

const mapStateToProps = state => {
    return { 
        coins: state.coins,
        accessories: state.accessories,
        coinsPurchaseOptions: state.coinsPurchaseOptions,
        gamesounds: state.gamesounds,
    };
};

export default connect(mapStateToProps, { toggleSwitchAccessory, coinsSubtract })(Settings);
