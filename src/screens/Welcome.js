import React from 'react';
import firebase from 'firebase';
import { View, Text, Image, AsyncStorage, StatusBar, Linking, NetInfo, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import { Player } from 'react-native-audio-toolkit';
// import LocalizedStrings from 'react-native-localization';

// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Babyface, Confirm, InfoModal, Spinner } from '../components';
import { 
    // loginWithFacebook, 
    // playAnonymous, 
    // signOut, 
    getInitialCoins, 
    fetchAllChallenges, 
    getInitialAccessories, 
    getInitialChallenges,
    getInitialLevels,
    fetchInitialLevels,
    fetchIntroBabysounds,
    fetchAllGamesounds,
    saveUserInfoToFirebase,
    // mergeFirebaseInfoToAsyncStorage,
    // fetchChallengeShortSound,
    // fetchAllCoinsPurchaseOptions, 
} from '../actions';
import Config from '../Config';
import Strings from '../Strings';

const FBSDK = require('react-native-fbsdk');

const { LoginButton, AccessToken } = FBSDK;

// react-native-flags to change languages

// const title = require('../assets/images/title.png');

class Welcome extends React.Component {
    state = { okModal: false, okModalText: 'ok', infoModal: false }

    componentWillMount() {
        // hide status bar for all scenes
        // StatusBar.setHidden(true);
        // StatusBar.setBarStyle({ barStyle: 'light-content' });
        StatusBar.setBarStyle('light-content', true);

        // load gamesound names to redux state
        this.props.fetchAllGamesounds();

        // load challenges objects to redux state
        this.props.fetchAllChallenges();

        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         console.log('Firebase signed in, user: ', user);
        //     } else {
        //         console.log('No firebase user.');
        //         // No user is signed in.
        //     }
        // });

        // babysounds for face onPress
        this.props.fetchIntroBabysounds();

        this.checkInternet();

        this.loadAsyncData();

        this.clearLongSounds();
    }
    componentWillReceiveProps(nextProps) {
        // if user is signed in firebase, save updated user data to firebase

        const user = firebase.auth().currentUser;
        if (user) { this.props.saveUserInfoToFirebase(user.uid, this.props, nextProps); } 
    }
    onFbLoginFinished(error, result) {
        if (error) {
            console.log('facebook login has error: ', result.error);
        } else if (result.isCancelled) {
            console.log('facebook login cancelled.');
        } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    console.log('facebook log in success');

                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
                    firebase.auth().signInWithCredential(credential).then((user) => {
                        console.log('Firebase Sign In Success', user.uid);

                        // check if there is already saved data in firebase, if so, merge it with current data
                        firebase.database().ref('users/' + user.uid + '/coins').once('value').then((snapshot) => {
                            console.log('found coins ', snapshot.val());
                            if (snapshot.val() === null) {
                                console.log('there was no saved data in firebase ', snapshot.val());
                            } else {
                                console.log('data in firebase found, load it');
                                this.getFirebaseData(user.uid);
                            }
                            // AsyncStorage.mergeItem('coins', JSON.stringify(snapshot.val()));
                        });
                        // this.getFirebaseData(user.uid);
                        // const asyncObj = this.getAsyncData();
                        // const merged = { ...firebaseObj, ...asyncObj };
                        // console.log('retrieved objects ', firebaseObj, asyncObj, merged);
                        // merge firebase info to asyncdata if any exists, then pass to redux store in callback loadAsyncData
                        // firebase.database().ref('users/' + user.uid + '/coins').once('value').then((snapshot) => {
                        //     console.log('coins from firebase ', snapshot.val());
                        // });

                        // this.props.mergeFirebaseInfoToAsyncStorage(user.uid, this.loadAsyncData.bind(this));
                    }, (err) => {
                        console.log('Firebase Sign In Error', err);
                    }).then(() => {
                        // finally switch screens
                        // Actions.categories();
                    });
                }
            );
        }
    }
    onFbLogoutFinished() {
        console.log('facebook logged out.');
        firebase.auth().signOut().then(() => console.log('firebase logged out'));
    }
    getFirebaseData(uid) {
        const newObj = {};

        // get info from firebase
        firebase.database().ref('users/' + uid + '/coins').once('value').then((snapshot) => {
            newObj.coins = snapshot.val();
            if (snapshot.val() !== null) {
                // use coins in firebase, all other parameters merge
                AsyncStorage.setItem('coins', JSON.stringify(snapshot.val()));
            }
        })
        .then(() => {
            firebase.database().ref('users/' + uid + '/levels').once('value').then((snapshot) => {
                newObj.levels = snapshot.val();
                if (snapshot.val() !== null) {
                    AsyncStorage.mergeItem('levels', JSON.stringify(snapshot.val()));
                }
            })
            .then(() => {
                firebase.database().ref('users/' + uid + '/challenges').once('value').then((snapshot) => {
                    newObj.challenges = snapshot.val();
                    if (snapshot.val() !== null) {
                        AsyncStorage.mergeItem('challenges', JSON.stringify(snapshot.val()));
                    }
                })
                .then(() => {
                    firebase.database().ref('users/' + uid + '/accessories').once('value').then((snapshot) => {
                        newObj.accessories = snapshot.val();
                        if (snapshot.val() !== null) {
                            AsyncStorage.mergeItem('accessories', JSON.stringify(snapshot.val()));
                        }
                    })
                    .then(() => {
                        console.log('from firebase', newObj);
                        // data from firebase is now loaded into asyncStorage
                        // now load async to redux state
                        this.loadAsyncData();
                    });
                });
            });
        });
    }
    //     const newObj = {};
    //     firebase.database().ref('users/' + uid + '/coins').once('value').then((snapshot) => {
    //         newObj.coins = snapshot.val();
    //     })
    //     .then(() => {
    //         firebase.database().ref('users/' + uid + '/levels').once('value').then((snapshot) => {
    //             newObj.levels = snapshot.val();
    //         })
    //         .then(() => {
    //             firebase.database().ref('users/' + uid + '/challenges').once('value').then((snapshot) => {
    //                 newObj.challenges = snapshot.val();
    //             })
    //             .then(() => {
    //                 firebase.database().ref('users/' + uid + '/accessories').once('value').then((snapshot) => {
    //                     newObj.accessories = snapshot.val();
    //                 });
    //             });
    //         });
    //     });

    //     return newObj;
    // }

    clearLongSounds() {
        // delete challenge long sound mp3s to save space
        RNFetchBlob.fs.unlink(Config.localChallengesLong).then(() => {
            console.log('cleared: ', Config.localChallengesLong);
        });
        // delete challenge short sound mp3s to save space
        RNFetchBlob.fs.unlink(Config.localChallenges).then(() => {
            console.log('cleared: ', Config.localChallenges);
        });
    }
    // loadObjData(data) {
    //     console.log('loadObjData..............', data);
    //     // sends data from object into redux state
    //     if (data.coins != null) {
    //         this.props.getInitialCoins(Number(data.coins));
    //     }
    //     if (data.accessories != null) {
    //         this.props.getInitialAccessories(data.accessories);
    //     }
    //     if (data.challenges != null) {
    //         this.props.getInitialChallenges(data.challenges);
    //     }
    //     if (data.levels != null) {
    //         this.props.getInitialLevels(data.levels);
    //     }
    // }
    // getAsyncData() {
    //     const newObj = {};

    //     AsyncStorage.getItem('coins', (err, coins) => {
    //         if (coins) {
    //             newObj.coins = coins;
    //         }
    //     })
    //     .then(() => {
    //         AsyncStorage.getItem('accessories', (err, accessories) => {
    //             if (accessories) {
    //                 newObj.accessories = accessories;
    //             }
    //         })
    //         .then(() => {
    //             AsyncStorage.getItem('challenges', (err, challenges) => {
    //                 if (challenges) {
    //                     newObj.challenges = challenges;
    //                 }
    //             })
    //             .then(() => {
    //                 AsyncStorage.getItem('levels', (err, levels) => {
    //                     if (levels) {
    //                         newObj.levels = levels;
    //                     }
    //                 });
    //             });
    //         });
    //     });

    //     return newObj;
    // }
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
                // console.log('chalenges retrieved : ', JSON.parse(challenges));
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
            // supported and online in ios simulator
            if (!supported) {
                this.setState({ okModalText: Strings.sorryNoInternet });
                this.setState({ okModal: true });
            } else {
                console.log('Linking.canOpenURL is supported, device online');
            }
            }).catch(err => console.error('An error occurred', err));

        // NetInfo.fetch().done((reach) => {
        //     console.log('NetInfo.fetch result ', reach);
        // });
        
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     // NOT connected offline in ios simulator
        //     if (!isConnected) {
        //         this.setState({ okModalText: Strings.sorryNoInternet });
        //         this.setState({ okModal: true });
        //     }
        //     console.log('NetInfo.isconnected says device is ', (isConnected ? 'online' : 'offline'));
        // });
    }
    deleteAsyncChallenges() {
        // const uid = firebase.auth().currentUser.uid;
        // // AsyncStorage.removeItem('challenges');
        // // const uid = firebase.auth().currentUser.uid;
        // // firebase.database().ref('users/' + uid + '/levels').set(this.props.levels);
        // // AsyncStorage.removeItem('challenges');
        // // AsyncStorage.removeItem('shortsounds');
        // firebase.database().ref('users/' + uid + '/coins').once('value').then((snapshot) => {
        //     console.log('coins from firebase ', snapshot.val());
        // });
        // this.props.mergeFirebaseInfoToAsyncStorage(uid, this.loadAsyncData.bind(this));
        // console.log('deleted challenges, now reload');
        // path to IOS localstorage
// this.loadAsyncData();
        // file:///Users/dereklloyd/Library/Developer/CoreSimulator/Devices/718F164D-6DC9-45A1-8243-2A71D3D25B84/data/Containers/Data/Application/F09DBFC1-D1C8-46B0-AEB9-222A6B46EA3A/Documents/RCTAsyncLocalStorage_V1/manifest.json
    }
    deleteLocalChallengesBlob() {
        // delete challenge short sound mp3s to save space
        // RNFetchBlob.fs.unlink(Config.localChallenges).then(() => {
        //     console.log('cleared: ', Config.localChallenges);
        // });
                // delete challenge long sound mp3s to save space
        RNFetchBlob.fs.unlink(Config.localChallengesLong).then(() => {
            console.log('cleared: ', Config.localChallengesLong);
        });
        // delete challenge short sound mp3s to save space
        RNFetchBlob.fs.unlink(Config.localChallenges).then(() => {
            console.log('cleared: ', Config.localChallenges);
        });
    }
    deleteAsync() {
        AsyncStorage.removeItem('levels');
        AsyncStorage.removeItem('coins');
        AsyncStorage.removeItem('accessories');
        AsyncStorage.removeItem('challenges');
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('user_data');
        AsyncStorage.removeItem('shortsounds');

        console.log('deleted accessories and coins, now reload');
    }

    playSound() {
        // get random songname to play on babyface press
        const array = this.props.shortsounds;
        const randomIndex = Math.floor(Math.random() * array.length);
        const songName = array[randomIndex].shortUrl;

        const songNameEncoded = songName.replace(/ /g, '%20');
        new Player('file://' + Config.localChallenges + songNameEncoded).play();
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
    
    render() {
        // console.log('props ', this.props);
        return (
            <View style={{ flex: 1, backgroundColor: Config.colorPrimary100 }}>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: 10 }}>

                    <Image 
                        source={require('../assets/images/backdrop.png')}    
                        style={styles.backdropImage}
                    />

                    <View style={{ alignItems: 'center', flexGrow: 1 }}>
                        {this.renderBabyface()}
                    </View>

                    <Image source={require('../assets/images/title.png')} style={styles.title} resizeMode={Image.resizeMode.contain} />
                   
                   
                    <Button onPress={() => Actions.categories()}>{Strings.play.toUpperCase()}</Button>

                    <Button onPress={() => this.setState({ infoModal: !this.state.infoModal })}>
                        {Strings.instructions.toUpperCase()}
                    </Button>

                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <LoginButton
                            readPermissions={['public_profile']}
                            // readPermissions={["email","public_profile","friends"]}
                            // publishPermissions={['publish_actions']}
                            onLoginFinished={this.onFbLoginFinished.bind(this)}
                            onLogoutFinished={this.onFbLogoutFinished.bind(this)} 
                        />
                    </View>
                    
                    <Text style={{ margin: 5, borderWidth: 1, fontFamily: Config.fontMain }} onPress={this.deleteAsync.bind(this)}>
                        clear asyncStorage
                    </Text>
                    
                    <Text style={{ margin: 5, borderWidth: 1 }} onPress={this.deleteAsyncChallenges.bind(this)}>
                        merge firebase
                    </Text>

                    <Text style={{ margin: 5, borderWidth: 1 }} onPress={this.deleteLocalChallengesBlob.bind(this)}>
                        blob delete challenges short and long
                    </Text>
                    
                </View>

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

const mapStateToProps = state => {
    return { 
        shortsounds: state.shortsounds,
        coins: state.coins,
        accessories: state.accessories,
        levels: state.levels,
        gamesounds: state.gamesounds,
        challenges: state.challenges,
        // auth: state.auth,
        // errorDetail, 
        // loading 
    };
};

export default connect(mapStateToProps, {
    // loginWithFacebook,
    // signOut,
    // playAnonymous,
    getInitialCoins,
    fetchAllChallenges,
    getInitialAccessories,
    getInitialChallenges,
    getInitialLevels,
    fetchInitialLevels,
    fetchAllGamesounds,
    fetchIntroBabysounds,
    saveUserInfoToFirebase,
    // mergeFirebaseInfoToAsyncStorage,
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
