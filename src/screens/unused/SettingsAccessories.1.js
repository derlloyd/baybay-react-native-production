import React from 'react';
import { View, Text, Switch, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Babyface, Confirm, SettingsHeader } from '../components';
import Config from '../Config';
import { toggleSwitchAccessory, coinsSubtract } from '../actions';

class SettingsAccessories extends React.Component {
    state = { 
        buyModal: false, 
        coinsModal: false, 
        babyModal: false, 
        buyCoinsView: true, 
        inAppModal: false, 
        accessory: '',
        buyOption: '',
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
                        name="diamond"
                        size={15} 
                        color={Config.colorPrimary300}
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
                        <View style={styles.columnThumb}>
                            <TouchableOpacity onPress={() => this.previewAccessory(accessory)} >
                                <Image
                                    key={i} 
                                    source={accessory.image}
                                    style={styles.thumbnail}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.columnDesc}>
                            <Text style={styles.columnDescText} onPress={() => this.previewAccessory(accessory)} >
                                {accessory.desc}
                            </Text>
                        </View>
                        
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
                            <View style={styles.coinsBox}>
                                <Text style={styles.coinsText}>+ {option.coins} </Text>
                                <Icon 
                                    name="diamond"
                                    size={15} 
                                    color={Config.colorPrimary300}
                                />
                            </View>
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
    // renderAccessoryView() {
    //     const smallBabyfaceDimesions = Config.babyfaceDimension * 0.8;
    //     return (
    //         <View>
    //             <Babyface 
    //                 onPress={this.playSound}
    //                 accessories={this.props.accessories}
    //                 imageStyle={{ height: smallBabyfaceDimesions, width: smallBabyfaceDimesions }}
    //                 overlay={{ height: smallBabyfaceDimesions, width: smallBabyfaceDimesions }}
    //             />

    //             <View style={styles.tableContainer}>
    //                 {this.renderTable()}
    //             </View>
    //         </View>
    //     );
    // }
    // renderCoinsView() {
    //     return (
    //         <Text>COINSSS</Text>
    //     );
    // }
    render() {
        // console.log('main props.accessories ', this.props.accessories);
        const smallBabyfaceDimesions = Config.babyfaceDimension * 0.8;
        const renderAccessoryBabyface = (
                <Babyface 
                    onPress={this.playSound}
                    accessories={this.props.accessories}
                    imageStyle={{ height: smallBabyfaceDimesions, width: smallBabyfaceDimesions }}
                    overlay={{ height: smallBabyfaceDimesions, width: smallBabyfaceDimesions }}
                />
        );
        const renderAccessoryView = (
            <View style={styles.tableContainer}>
                {this.renderAccessoryTable()}
            </View>
        );
        const renderCoinsView = (
                <View style={styles.tableContainer}>
                    {this.renderCoinsPurchaseTable()}
                </View>
        );
        // console.log('props ', this.props);
        return (
            <View style={styles.screenContainer}>

                <SettingsHeader 
                    backClose
                    onPressBack={() => { Actions.pop(); }} 
                    title="" 
                    coins={this.props.coins}
                />

                <View style={styles.selectionButtonContainer}>
                    <Text
                        style={this.state.buyCoinsView ? styles.selectionButtonSelected : styles.selectionButton} 
                        onPress={this.state.buyCoinsView === false ? () => { this.setState({ buyCoinsView: !this.state.buyCoinsView }); } : () => {}} 
                    >
                        Coins
                    </Text>
                    <Text
                        style={this.state.buyCoinsView ? styles.selectionButton : styles.selectionButtonSelected} 
                        onPress={this.state.buyCoinsView ? () => { this.setState({ buyCoinsView: !this.state.buyCoinsView }); } : () => {}} 
                    >
                        Accessories
                    </Text>
                </View>

                {this.state.buyCoinsView ? <View /> : renderAccessoryBabyface}
                {this.state.buyCoinsView ? renderCoinsView : renderAccessoryView}

                <Confirm
                    visible={this.state.buyModal}
                    onAccept={this.onAcceptBuyModal.bind(this)}
                    onDecline={this.onDeclineBuyModal.bind(this)}
                >
                    Are you sure you want to buy {this.state.accessory.desc} for {this.state.accessory.cost} coins?
                </Confirm>

                <Confirm
                    visible={this.state.coinsModal}
                    onAccept={this.onAcceptCoinsModal.bind(this)}
                    onDecline={this.onDeclineCoinsModal.bind(this)}
                >
                    Insufficient coins. Would you like to buy more?
                </Confirm>

                <Confirm
                    babyface={this.state.accessory.name}
                    visible={this.state.babyModal}
                    onAccept={this.closeBabyModal.bind(this)}
                    onDecline={this.closeBabyModal.bind(this)}
                >
                    NO TEXT NECESSARY {this.state.accessory.name}
                </Confirm>

                <Confirm
                    visible={this.state.inAppModal}
                    onAccept={this.onAcceptInAppModal.bind(this)}
                    onDecline={this.onDeclineInAppModal.bind(this)}
                >
                    Are you sure you want to buy {this.state.buyOption.coins} coins?
                </Confirm>
            </View>       
        );
    }
}

                // <View style={styles.tableHeader} >
                //     <Text style={styles.columnThumb}>
                //         preview
                //     </Text>

                //     <Text style={styles.column2} />

                //     <Text style={styles.columnDesc}>
                //         Accessory
                //     </Text>
                // </View>

                // <View style={styles.screenHeader}>
                //     <Icon 
                //         onPress={this.onPressClose} 
                //         name="window-close-o" 
                //         size={Config.deviceWidth / 7} 
                //         color="blue" 
                //     />
                // </View>
                // <Coins coins={this.props.coins} />


const styles = {
    screenContainer: {
        // flex: 1,
        // marginBottom: 50,
        // backgroundColor: Config.colorAccent100,
    },
    // screenHeader: {
    //     flexDirection: 'row',
    //     justifyContent: 'flex-end',
    // },
    // tableHeader: {
    //     flexDirection: 'row',
    //     flex: 0,
    //     height: Config.deviceWidth / 9,
    //     alignItems: 'center',
    //     paddingLeft: 10,
    //     // justifyContent: 'flex-start',
    //     // borderWidth: 1,
    //     borderColor: Config.colorPrimary200,
    //     // backgroundColor: Config.colorPrimary100,
    //     // borderBottom: 2,
    //     borderBottomWidth: 1,
    // },
    selectionButtonContainer: {
        // flex: 0,
        // alignItems: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'row',
        // alignItems: 'center',
    },
    selectionButton: {
        // justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: Config.colorPrimary300,
        padding: 20,
        // borderRadius: 15,
        textAlign: 'center',
        color: 'white',
    },
    selectionButtonSelected: {
        flex: 1,
        backgroundColor: Config.colorPrimary900,
        padding: 20,
        textAlign: 'center',
        // borderRadius: 15,
        color: Config.colorAccent300,
        fontWeight: 'bold',
        // borderWidth: 1,
        // borderBottomWidth: 5,
        // borderColor: Config.colorAccent500,
    },
    tableContainer: {
        flex: 1,
        // backgroundColor: Config.colorPrimary300,
        // marginLeft: 10,
        // marginRight: 10,
        borderTopWidth: 1,
        borderColor: Config.colorPrimary300,
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
        color: Config.colorAccent900,
        // opacity: 0.85,
    },
    columnOptionPriceText: {
        color: Config.colorAccent900,
        textAlign: 'right',
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
    },
    thumbnail: {
        height: Config.deviceWidth / 9,
        width: Config.deviceWidth / 9,
    },
    buyButton: {
        backgroundColor: Config.colorPrimary900,
        paddingLeft: 17,
        paddingRight: 17,
        padding: 8,
        borderRadius: 17,
    },
    // buyButtonText: {
    //     color: 'white',
    // },
};

const mapStateToProps = state => {
    return { 
        coins: state.coins,
        accessories: state.accessories,
        coinsPurchaseOptions: state.coinsPurchaseOptions,
    };
};

export default connect(mapStateToProps, { toggleSwitchAccessory, coinsSubtract })(SettingsAccessories);
