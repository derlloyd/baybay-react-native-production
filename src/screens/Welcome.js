import React from 'react';
import firebase from 'firebase';
import { View, Text, Image, AsyncStorage, StatusBar, TouchableOpacity, Linking, NetInfo, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import { Player } from 'react-native-audio-toolkit';

const FBSDK = require('react-native-fbsdk');

const { LoginButton, AccessToken } = FBSDK;
// import LocalizedStrings from 'react-native-localization';

// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, ButtonFb, Babyface, Confirm, InfoModal, Spinner } from '../components';
import { 
    // loginWithFacebook, 
    // playAnonymous, 
    signOut, 
    getInitialCoins, 
    fetchAllChallenges, 
    getInitialAccessories, 
    getInitialChallenges,
    getInitialLevels,
    fetchInitialLevels,
    fetchIntroBabysounds,
    fetchAllGamesounds,
    // fetchChallengeShortSound,
    // fetchAllCoinsPurchaseOptions, 
} from '../actions';
import Config from '../Config';
import Strings from '../Strings';

// react-native-flags to change languages

// const title = require('../assets/images/title.png');

class Welcome extends React.Component {
    state = { okModal: false, okModalText: '', infoModal: false }

    componentWillMount() {
        // hide status bar for all scenes
        // StatusBar.setHidden(true);
        // StatusBar.setBarStyle({ barStyle: 'light-content' });
        StatusBar.setBarStyle('light-content', true);

        // load gamesound names to redux state
        this.props.fetchAllGamesounds();

        // load challenges objects to redux state
        this.props.fetchAllChallenges();

        // load coin purchase options to redux state
        // this.props.fetchAllCoinsPurchaseOptions();

        // babysounds for face onPress
        this.props.fetchIntroBabysounds();

        this.checkInternet();

        this.checkForUser();

        this.loadAsyncData();

        this.clearLongSounds();
    }
    
    clearLongSounds() {
        // delete challenge long sound mp3s to save space
        RNFetchBlob.fs.unlink(Config.localChallengesLong).then(() => {
            // console.log('cleared: ', Config.localChallengesLong);
        });
        // delete challenge short sound mp3s to save space
        // RNFetchBlob.fs.unlink(Config.localChallenges).then(() => {
        //     console.log('cleared: ', Config.localChallenges);
        // });
    }
    checkForUser() {
      

        // console.log('loading firebase');
        // get firebase info from async storage, if they exist
        // AsyncStorage.getItem('firebase*', (err, obj) => {
        //     if (obj) {
        //         console.log('retrieved : ', JSON.parse(obj));
        //         // this.props.getInitialAccessories(JSON.parse(accessories));
        //     }
        //     console.log('firebase err, ', err);
        // });


    }
    loadAsyncData() {
        // get users' coins from async storage, if they exist
        AsyncStorage.getItem('coins', (err, coins) => {
            if (coins) {
                this.props.getInitialCoins(Number(coins));
            }
        });

        // get users' accessories from async storage, if they exist
        AsyncStorage.getItem('accessories', (err, accessories) => {
            if (accessories) {
                // console.log('retrieved : ', JSON.parse(accessories));
                this.props.getInitialAccessories(JSON.parse(accessories));
            }
        });

        // get users' completed challenges from async storage, if they exist
        AsyncStorage.getItem('challenges', (err, challenges) => {
            if (challenges) {
                console.log('chalenges retrieved : ', JSON.parse(challenges));
                this.props.getInitialChallenges(JSON.parse(challenges));
            }
        });

        // get users' completed levels from async storage, if they exist
        AsyncStorage.getItem('levels', (err, levels) => {
            if (levels) {
                // console.log('levels retrieved : ', JSON.parse(levels));
                this.props.getInitialLevels(JSON.parse(levels));
            } else {
                // fetch free levels from website, only once
                this.props.fetchInitialLevels();
                // console.log('no saved levels, add free ones to async');
            }
        });
    }
    checkInternet() {
        // check if app can connect to baybay website
        Linking.canOpenURL(Config.baybayWebsite).then(supported => {
            if (!supported) {
                // console.log('Unable to access: ', Config.baybayWebsite);
                const message = 'Internet connection required to play BayBay';
                this.setState({ okModalText: message, okModal: !this.state.okModal });
            } else {
                console.log('Linking.canOpenURL is supported');
                // return Linking.openURL(Config.baybayWebsite);
            }
            }).catch(err => console.error('An error occurred', err));

        
        // Android 
        // To request network info, you need to add the following line to 
        // your app's AndroidManifest.xml:

        // <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /> 
        // Asynchronously determine if the device is connected and 
        // details about that connection.
        

        NetInfo.fetch().done((reach) => {
            console.log('NetInfo.fetch result ', reach);
        });
        
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('NetInfo.isconnected says device is ', (isConnected ? 'online' : 'offline'));
        });
    }
    deleteAsyncChallenges() {
        // AsyncStorage.removeItem('challenges');

        AsyncStorage.removeItem('challenges');
        AsyncStorage.removeItem('shortsounds');

        console.log('deleted challenges, now reload');
        // path to IOS localstorage

        // file:///Users/dereklloyd/Library/Developer/CoreSimulator/Devices/718F164D-6DC9-45A1-8243-2A71D3D25B84/data/Containers/Data/Application/F09DBFC1-D1C8-46B0-AEB9-222A6B46EA3A/Documents/RCTAsyncLocalStorage_V1/manifest.json
    }
    deleteLocalChallengesBlob() {
        // delete challenge short sound mp3s to save space
        RNFetchBlob.fs.unlink(Config.localChallenges).then(() => {
            console.log('cleared: ', Config.localChallenges);
        });
    }
    deleteAsync() {
        AsyncStorage.removeItem('levels');
        AsyncStorage.removeItem('coins');
        AsyncStorage.removeItem('accessories');
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('user_data');

        console.log('deleted accessories and coins, now reload');
    }
    onPlayPress() {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getToken().then(data => console.log(data));
                // console.log('get token ', user.getToken());
                // User is signed in, go to next screen
                console.log('signed in firebase OK!!!!!!!!!!!!!!!!!!: ', user);
            } else {
                // No user is signed in.
                console.log('no one signed in, now check...');
                
                // check asyncStorage to see if refresh token is there
                AsyncStorage.getItem('fbAccessToken', (err, userInfo) => {
                    if (userInfo) {
                        const userObj = JSON.parse(userInfo);
                        console.log('user stored in async: ', userObj);
                        // login firebase with access token
                        firebase.auth().signInAnonymously(userObj.token).catch((error) => {
                            console.log('error: ', error.code, error.message);
                        });
                    } else {
                        console.log('there is no user stored in async, do not login');
                        // log user in Anonymous, and save user info to async storage
                        // this.props.playAnonymous();
                    }
                });
            }
        });
        console.log('now change screens');
        // Actions.categories();
        // Actions.admob();
    }
    playSound() {
        // get random songname
        const array = this.props.shortsounds;
        const randomIndex = Math.floor(Math.random() * array.length);
        const songName = array[randomIndex].shortUrl;

        const songNameEncoded = songName.replace(/ /g, '%20');
        new Player('file://' + Config.localChallenges + songNameEncoded).play();
    }
    signOut() {
        console.log('signing out');
        this.props.signOut();
    }
    viewModal() {
        Strings.setLanguage('it');
        this.setState({});
        // this.setState({ okModalText: 'this is some error message' });
        // this.setState({ okModal: !this.state.okModal });
    }
    renderBabyface() {
        if (this.props.shortsounds) {
            return (
                <Babyface 
                    onPress={this.playSound.bind(this)}
                    accessories={this.props.accessories}
                />
            );
        }
        return (
                <Spinner style={{ height: 200, width: 200 }} />
            );
    }
    onFbLoginFinished(error, result) {
        if (error) {
            console.log('facebook login has error: ', result.error);
        } else if (result.isCancelled) {
            console.log('facebook login cancelled.');
        } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    console.log('facebook logged in success, here is access token: ', data.accessToken.toString());

                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
                    firebase.auth().signInWithCredential(credential).then((user) => {
                        console.log('Firebase Sign In Success', user);
                    }, (err) => {
                        console.log('Firebase Sign In Error', err);
                    });

                    // const auth = firebase.auth();
                    // // const provider = firebase.auth.FacebookAuthProvider;
                    // const provider = new firebase.auth.FacebookAuthProvider();
                    // const credential = provider.credential(data.accessToken);
                    // auth.signInWithCredential(credential);
                    // AsyncStorage.setItem('fbAccessToken', data.accessToken.toString());
                    // now login firebase
                }
            );
        }
    }
    onFbLogoutFinished() {
        console.log('facebook logged out.');
        // firebase logout also
        firebase.auth().signOut().then(() => console.log('firebase logged out'));
    }
    render() {
        // console.log('props ', this.props);
        // <Icon 
        //                 name="hand-pointer-o"
        //                 size={60} 
        //                 style={{ color: 'white' }}
        //                 iconStyle={{ color: 'white', backgroundColor: 'white' }}
        //             />
                    // <ButtonFb onPress={this.onFbButtonPress.bind(this)}>
                    //     Login Facebook
                    // </ButtonFb>
        return (
            <View style={{ flex: 1, backgroundColor: Config.colorPrimary100 }}>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: 50 }}>

                    <Image 
                        source={require('../assets/images/backdrop.png')}    
                        style={styles.backdropImage}
                    />

                    <View style={{ alignItems: 'center', flexGrow: 1 }}>
                        {this.renderBabyface()}
                    </View>

                    <Image source={require('../assets/images/title.png')} style={styles.title} resizeMode={Image.resizeMode.contain} />
                   
                   
                    <Button style={{ flex: 0 }} onPress={this.onPlayPress.bind(this)}>{Strings.play.toUpperCase()}</Button>

                    <Button style={{ flex: 0 }} onPress={() => this.setState({ infoModal: !this.state.infoModal })}>
                        {Strings.instructions.toUpperCase()}
                    </Button>

                    <LoginButton
                        readPermissions={['public_profile']}
                        // readPermissions={["email","public_profile","friends"]}
                        // publishPermissions={['publish_actions']}
                        onLoginFinished={this.onFbLoginFinished.bind(this)}
                        onLogoutFinished={this.onFbLogoutFinished.bind(this)} 
                    />

                    <Text style={{ fontFamily: Config.fontMain }}>OKOKHere is the new text</Text>
                    <Text style={{ margin: 5, borderWidth: 1, flex: 0 }} onPress={this.viewModal.bind(this)}>
                        MODAL!!!
                    </Text>

                    <Text style={{ margin: 5, borderWidth: 1, fontFamily: Config.fontMain }} onPress={this.deleteAsync.bind(this)}>
                        async delete accesories + coins + levels
                    </Text>
                    
                    <Text style={{ margin: 5, borderWidth: 1 }} onPress={this.deleteAsyncChallenges.bind(this)}>
                        async delete challenges
                    </Text>

                    <Text style={{ margin: 5, borderWidth: 1 }} onPress={this.deleteLocalChallengesBlob.bind(this)}>
                        blob delete challenges
                    </Text>

                    <Text style={{ margin: 5, borderWidth: 1 }} onPress={this.signOut.bind(this)}>
                        SIGN OUT
                    </Text>
                    

                </View>
                
                <Text style={styles.errorTextStyle}>
                    {this.props.auth.error}
                </Text>

                <Text style={styles.errorDetailTextStyle}>
                    {this.props.auth.errorDetail}
                </Text>

                <InfoModal
                    visible={this.state.infoModal}
                    onAccept={() => { this.setState({ infoModal: !this.state.infoModal }); }}
                />

                <Confirm
                    ok
                    visible={this.state.okModal}
                    onAccept={() => { this.setState({ okModal: !this.state.okModal }); }}
                >
                    {this.state.okModalText}
                </Confirm>
            </View>       
        );
    }
}

                        //     (error, result) => {
                        //         if (error) {
                        //             console.log("login has error: " + result.error);
                        //         } else if (result.isCancelled) {
                        //             console.log("login is cancelled.");
                        //         } else {
                        //             AccessToken.getCurrentAccessToken().then(
                        //                 (data) => {
                        //                     AsyncStorage.setItem('fbAccessToken', data.accessToken.toString());
                        //                     console.log('logged in, here is access token: ', data.accessToken.toString());
                        //                 }
                        //             );
                        //         }
                        //     }
                        // }
const styles = StyleSheet.create({
    backdropImage: {
        position: 'absolute',
        width: Config.deviceWidth,
        height: Config.deviceWidth / 2 * 3, //ratio of height/width is 3/2
        top: 0,
    },
    errorTextStyle: {
        marginTop: 20,
        fontSize: 20,
        alignSelf: 'center',
        color: 'red' 
    },
    errorDetailTextStyle: {
        fontSize: 13,
        alignSelf: 'center',
        color: 'red',
        marginBottom: 30 
    },
    title: {
        alignSelf: 'center',
        width: Config.deviceWidth - 20,
        height: (Config.deviceWidth - 20) / 3,  // approx ratio is width = height * 3
    }
});

// let strings = new LocalizedStrings({
//   "en-US":{
//     how:"How do you want your egg today?",
//     boiledEgg:"Boiled egg",
//     softBoiledEgg:"Soft-boiled egg",
//     choice:"How to choose the egg"
//   },
//   en:{
//     how:"How do you want your egg today?",
//     boiledEgg:"Boiled egg",
//     softBoiledEgg:"Soft-boiled egg",
//     choice:"How to choose the egg"
//   },
//   it: {
//     how:"Come vuoi il tuo uovo oggi?",
//     boiledEgg:"Uovo sodo",
//     softBoiledEgg:"Uovo alla coque",
//     choice:"Come scegliere l'uovo"
//   }
// });

const mapStateToProps = state => {
    return { 
        shortsounds: state.shortsounds,
        coins: state.coins,
        auth: state.auth,
        accessories: state.accessories,
        levels: state.levels,
        gamesounds: state.gamesounds,
        // allChallenges: state.allChallenges,
        // errorDetail, 
        // loading 
    };
};

export default connect(mapStateToProps, {
    // loginWithFacebook,
    signOut,
    // playAnonymous,
    getInitialCoins,
    fetchAllChallenges,
    getInitialAccessories,
    getInitialChallenges,
    getInitialLevels,
    fetchInitialLevels,
    fetchAllGamesounds,
    fetchIntroBabysounds,
    // fetchChallengeShortSound,
    // fetchAllCoinsPurchaseOptions,
})(Welcome);

        
        // not necessary, for testing
        // RNFetchBlob
        //     .config({
        //         // add this option that makes response data to be stored as a file,
        //         // this is much more performant.
        //         fileCache: true,
        //         path: Config.localChallenges + songName,
        //     })
        //     .fetch('GET', Config.remoteChallenges + songNameEncoded, {
        //     })
        //     .then((res) => {
        //         // console.log('The file saved to ', res.path());
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
                // if (this.state.user) {
        //     return (
        //         <Button>
        //             Sign Out
        //         </Button>
        //     );
        // } 
        // if (this.props.auth.loading) {
        //     return (
        //         <CardSection style={{ flexDirection: 'column', minHeight: 90 }}>
        //             <Spinner size="large" />
        //         </CardSection>
        //     );
        // }
        // return (
        //     <ButtonFb onPress={this.onFbButtonPress.bind(this)}>
        //         Login Facebook
        //     </ButtonFb>
        // );
