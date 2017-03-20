import React from 'react';
import firebase from 'firebase';
import { View, Text, Switch, Image, TouchableOpacity, ScrollView, NativeModules, Platform, AlertIOS, Alert, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';
import * as Animatable from 'react-native-animatable';

import { Babyface, Confirm, SettingsHeader, Spinner } from '../components';
import Config from '../Config';
import { toggleSwitchAccessory, coinsSubtract, saveUserInfoToFirebase } from '../actions';

const InAppBilling = require('react-native-billing');

const { InAppUtils } = NativeModules;

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyModal: false, 
            coinsModal: false, 
            babyModal: false, 
            buyCoinsView: true, 
            inAppModal: false, 
            accessory: '',
            products: '',
            buyOption: '',
        };
    }
    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.getIOSPurchaseOptions();
        } else {
            this.getAndroidPurchaseOptions5();
        }
    }
    componentWillReceiveProps(nextProps) {
        // if user is signed in firebase, save updated user data to firebase

        const user = firebase.auth().currentUser;
        if (user) { this.props.saveUserInfoToFirebase(user.uid, this.props, nextProps); } 
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
    onAcceptInAppModal() {
        if (Platform.OS === 'ios') {
            this.purchaseIosProduct();
        } else {
            this.purchaseAndroidProduct();
        }

        this.setState({ inAppModal: false });
    }
    onDeclineInAppModal() {
        this.setState({ inAppModal: false });
    }
    async getAndroidPurchaseOptions() {
        // const products = [
        //     'purchase_1000_coins',
        //     'purchase_2500_coins',
        //     'purchase_7000_coins',
        //     'purchase_16000_coins',
        // ];

        // sample data until can test on android device
        const sorted = [
            { coins: 1000, coinsString: '1,000', priceString: '$1.00', identifier: 'purchase_1000_coins' },
            { coins: 2500, coinsString: '2,500', priceString: '$2.00', identifier: 'purchase_2500_coins' },
            { coins: 7000, coinsString: '7,000', priceString: '$4.00', identifier: 'purchase_7000_coins' },
            { coins: 16000, coinsString: '16,000', priceString: '$10.00', identifier: 'purchase_16000_coins' },
        ];

        this.setState({ products: sorted });

        // To be sure the service is close before opening it
        await InAppBilling.close();
        try {
            await InAppBilling.open();
            // inappbilling.getAvailableProducts(success, fail)
            // It provides a json array of the list of owned products as a parameter
            InAppBilling.getAvailableProducts((result) => {
                // IF OK, add fields coins, coinsString, priceString, identifier 
                // sort then add product details to state
                Alert.alert('getAvailableProducts success', JSON.stringify(result), [{ text: 'OK', onPress: () => {} }]);

                const resultNew = result.map((option) => {
                    // option should contain title, priceText, description, currency, productId, re-map
                    const newOption = {};
                    newOption.coinsString = option.description;
                    newOption.coins = Number(option.description.replace(',', ''));
                    newOption.priceString = option.priceText;
                    newOption.identifier = option.productId;

                    return newOption;
                });

                this.setState({ products: resultNew });
            }, (err) => {
                // Alert.alert('InAppBilling Error', err, [{ text: 'OK', onPress: () => {} }]);
                // console.log(err);
            });
        } catch (err) {
            Alert.alert('InAppBilling Error', err, [{ text: 'OK', onPress: () => {} }]);
            // console.log(err);
        } finally {
            await InAppBilling.close();
        }
    }
    async getAndroidPurchaseOptionsOld() {
        const products = [
            'purchase_1000_coins',
            'purchase_2500_coins',
            'purchase_7000_coins',
            'purchase_16000_coins',
        ];

        // sample data until can test on android device
        const sorted = [
            { coins: 1000, coinsString: '1,000', priceString: '$1.00', identifier: 'purchase_1000_coins' },
            { coins: 2500, coinsString: '2,500', priceString: '$2.00', identifier: 'purchase_2500_coins' },
            { coins: 7000, coinsString: '7,000', priceString: '$4.00', identifier: 'purchase_7000_coins' },
            { coins: 16000, coinsString: '16,000', priceString: '$10.00', identifier: 'purchase_16000_coins' },
        ];

        this.setState({ products: sorted });

        // To be sure the service is close before opening it
        await InAppBilling.close();
        // try {
        //     await InAppBilling.open();
        //     const productDetails = await InAppBilling.getProductDetails(products);
        //     console.log('productdetails: ', productDetails);            
        //     // IF OK, add fields coins, coinsString, priceString, identifier 
        //     // sort then add product details to state
        //     // const resultNew = productDetails.map((option) => {
        //     //     const newOption = option;

        //     //     return newOption;
        //     // });
        //     // this.setState({ products: resultNew });
        // } catch (err) {
        //     console.log(err);
        //     // Alert.alert('InAppBilling Error', err, [{ text: 'OK', onPress: () => {} }]);
        // } finally {
        //     await InAppBilling.close();
        // }
    }
    async getAndroidPurchaseOptions3() {
        // sample data until can test on android device
        const sorted = [
            { coins: 1000, coinsString: '1,000', priceString: '$1.00', identifier: 'purchase_1000_coins' },
            { coins: 2500, coinsString: '2,500', priceString: '$2.00', identifier: 'purchase_2500_coins' },
            { coins: 7000, coinsString: '7,000', priceString: '$4.00', identifier: 'purchase_7000_coins' },
            { coins: 16000, coinsString: '16,000', priceString: '$10.00', identifier: 'purchase_16000_coins' },
        ];

        this.setState({ products: sorted });

        const products = [
            'purchase_1000_coins',
            'purchase_2500_coins',
            'purchase_7000_coins',
            'purchase_16000_coins',
        ];

        const newProductsArray = products.map(async (id) => {
            const idInfo = {};
            // To be sure the service is close before opening it
            await InAppBilling.close();
            try {
                await InAppBilling.open();
                InAppBilling.getProductDetails(id)
                .then((details) => {
                    idInfo.identifier = details.productId;
                    idInfo.priceString = details.priceText;
                    idInfo.coinsString = details.description;
                    idInfo.coins = Number(details.description.replace(',', ''));
                    return idInfo;
                });
            } catch (err) {
                // console.log(err);
            } finally {
                await InAppBilling.close();
            }
        });

        this.setState({ products: newProductsArray });
    }
    async getAndroidPurchaseOptions4() {
        // sample data until can test on android device
        const sorted = [
            { coins: 1000, coinsString: '1,000', priceString: '$1.00', identifier: 'purchase_1000_coins' },
            { coins: 2500, coinsString: '2,500', priceString: '$2.00', identifier: 'purchase_2500_coins' },
            { coins: 7000, coinsString: '7,000', priceString: '$4.00', identifier: 'purchase_7000_coins' },
            { coins: 16000, coinsString: '16,000', priceString: '$10.00', identifier: 'purchase_16000_coins' },
        ];

        this.setState({ products: sorted });

        const products = [
            'purchase_1000_coins',
            'purchase_2500_coins',
            'purchase_7000_coins',
            'purchase_16000_coins',
        ];

        const newProductsArray = products.map(async (productId) => {
            const idInfo = {};

            InAppBilling.open()
                .then(async () => {
                    const details = await InAppBilling.getProductDetails(productId);
                    idInfo.ok = 123;
                    idInfo.identifier = details.productId;
                    idInfo.priceString = details.priceText;
                    idInfo.coinsString = details.description;
                    idInfo.coins = Number(details.description.replace(',', ''));
                })
                .then(() => InAppBilling.close());

            return idInfo;
        });

        this.setState({ products: newProductsArray });
        // Alert.alert('State products', JSON.stringify(this.state.products));
        Alert.alert('State products', JSON.stringify(newProductsArray));
    }
    getAndroidPurchaseOptions5() {
        // sample data until can test on android device
        const data = [
            { coins: 1000, coinsString: '1,000', priceString: '$', identifier: 'purchase_1000_coins' },
            { coins: 2500, coinsString: '2,500', priceString: '$', identifier: 'purchase_2500_coins' },
            { coins: 7000, coinsString: '7,000', priceString: '$', identifier: 'purchase_7000_coins' },
            { coins: 16000, coinsString: '16,000', priceString: '$', identifier: 'purchase_16000_coins' },
        ];

        this.setState({ products: data });

        // productIdsfrom Google Play Developer console
        const products = [
            'purchase_1000_coins',
            'purchase_2500_coins',
            'purchase_7000_coins',
            'purchase_16000_coins',
        ];

        InAppBilling.open()
            .then(async () => {
                // get all info on above product ids
                const productsDetails = await InAppBilling.getProductDetailsArray(products);

                // add more custom values to each object
                const addedProductDetails = productsDetails.map((obj) => {
                    const newObj = Object.assign({}, obj);      // assign existing values, just for fun
                    newObj.identifier = obj.productId;
                    newObj.priceString = obj.priceText;
                    newObj.coinsString = obj.description;
                    newObj.coins = Number(obj.description.replace(',', ''));
                    return newObj;
                });

                // sort by newly created coins value
                const sorted = addedProductDetails.sort((a, b) => {
                    return a.coins - b.coins;
                });

                // add to state to re-render
                this.setState({ products: sorted });
            })
            .then(() => InAppBilling.close())
            .catch((err) => Alert.alert('InAppBilling Error', JSON.stringify(err)));
    }
    getIOSPurchaseOptions() {
        // product ids from itunes connect
        const products = [
            'com.BayBay.Purchase.Coin1000',
            'com.BayBay.Purchase.Coin2500',
            'com.BayBay.Purchase.Coin7000',
            'com.BayBay.Purchase.Coin16000',
        ];
        InAppUtils.loadProducts(products, (error, result) => {
            const resultNew = result.map((option) => {
                // pull coins out of title string
                const str = option.title;
                const coinsString = str.substring(8, str.length - 6);
                const coins = Number(coinsString.replace(',', ''));
                // add key/value pairs
                const newOption = option;
                newOption.coinsString = coinsString;
                newOption.coins = coins;
                return newOption;
            });

            // sort by newly created coins value
            const sorted = resultNew.sort((a, b) => {
                return a.coins - b.coins;
            });

            // add to state to re-render
            this.setState({ products: sorted });
        });
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
    
    purchaseIosProduct() {
        const productIdentifier = this.state.buyOption.identifier;

        InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
            if (error) {
                // AlertIOS.alert('Purchase Not Completed', error.message);
            }

            if (response && response.productIdentifier) {
                // AlertIOS.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
                //unlock store here.
                this.props.coinsSubtract(-this.state.buyOption.coins);
            }
        });
    }
    purchaseAndroidProduct() {
        const productIdentifier = this.state.buyOption.identifier;
        // test with static responses use android.test.purchased
        // InAppBilling.open()
        // .then(async () => { 
        //     const productDetails = await InAppBilling.getProductDetails(productIdentifier);
        //     console.log('product details ', productDetails);
        // })
        // .then(() => InAppBilling.close());
        
        // should work only on actual device
        InAppBilling.open()
        .then(() => InAppBilling.purchase(productIdentifier))
            .then(() => {
                // console.log('You purchased: ', details.productId);
                this.props.coinsSubtract(-this.state.buyOption.coins);
                return InAppBilling.close();
            })
            .catch((err) => {
                Alert.alert('Purchase Not Completed', JSON.stringify(err));
                InAppBilling.close();
            });
    }

    playSuccessSound() {
        // get random songname
        const array = this.props.gamesounds[0].urls;
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
    reverseCoinView() {
        this.setState({ buyCoinsView: !this.state.buyCoinsView });
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

        if (this.state.products === '') {
            return (
                <View style={styles.spinner}>
                    <Spinner />
                </View>
            );
        }

        // one row for each accessory (array of objects in Config file)
            this.state.products.forEach((option, i) => {
                rendered.push(
                    <View 
                        key={i}
                        style={styles.accessoryRow}
                    >
                        <View style={styles.columnCoins}>
                            <TouchableOpacity style={styles.coinsBox} onPress={() => this.buyCoins(option)}>
                                <Text style={styles.buyCoinsText} >+ {option.coinsString} </Text>
                                <Icon 
                                    name={Config.coinIconName}
                                    size={15} 
                                    style={styles.buyCoinStyle}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.columnDesc}>
                            <Text style={styles.columnOptionPriceText} onPress={() => this.buyCoins(option)} >
                                {option.priceString}
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

    render() {
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
                    buyCoins={{ coins: this.state.buyOption.coins, coinsString: this.state.buyOption.coinsString, price: this.state.buyOption.priceString }}
                />

            </View>       
        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Config.colorPrimary50,
    },
    selectionButtonContainer: {
        flexDirection: 'row',
    },
    spinner: {
        position: 'absolute',
        top: 100,
        left: Config.deviceWidth / 2,
    },
    selectionButton: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Config.colorPrimary200,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectionButtonSelected: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Config.colorPrimary900,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: Config.colorAccent700,
    },
    tableContainer: {
        flex: 1,
    },
    accessoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Config.colorPrimary200,
        backgroundColor: 'white',
        minHeight: Config.deviceWidth / 8,
    },
    columnThumb: {
        width: Config.deviceWidth / 10 * 2,
        alignItems: 'center',
    },
    columnDesc: {
        width: Config.deviceWidth / 10 * 3,
        alignSelf: 'stretch', 
        justifyContent: 'center',
    },
    columnDescText: {
        color: Config.colorAccent700,
        fontFamily: Config.fontMain,
    },
    columnOptionPriceText: {
        opacity: 0.85,
        textAlign: 'right',
        fontFamily: Config.fontMain,
    },
    columnCoins: {
        width: Config.deviceWidth / 10 * 3,
        alignItems: 'center',
    },
    columnBuy: {
        width: Config.deviceWidth / 10 * 2,
        alignItems: 'center',
    },
    coinsBox: {
        flexDirection: 'row',
    },
    coinsText: {
        opacity: 0.85,
        fontFamily: Config.fontMain,
    },
    buyCoinsText: {
        color: Config.colorAccent700,
        fontFamily: Config.fontMain,
    },
    coinStyle: {
        opacity: 0.85,
    },
    buyCoinStyle: {
        color: Config.colorAccent700,
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
});

const mapStateToProps = state => {
    return { 
        coins: state.coins,
        accessories: state.accessories,
        gamesounds: state.gamesounds,
    };
};

export default connect(mapStateToProps, { toggleSwitchAccessory, saveUserInfoToFirebase, coinsSubtract })(Settings);
