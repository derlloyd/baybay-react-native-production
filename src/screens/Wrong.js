import React from 'react';
import firebase from 'firebase';
import { View, Text, TouchableOpacity, Platform, Image, LayoutAnimation, AsyncStorage, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';
// import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { ButtonRetry, Babyface, BannerSpace, Header, Confirm } from '../components';
import Config from '../Config';
import Strings from '../Strings';
import { rewardChallenge, saveChallenge, challengeUpdate, saveUserInfoToFirebase } from '../actions';

class Wrong extends React.Component {
    state = { 
        // rewardMessageVisible: false,
        // artistName: '', 
        // songName: '', 
        challengeNum: '', 
        dance: true,
        babyClicks: 0,
        confirmOkModal: false,
        confirmOkModalMessage: '', 
    };

    componentWillMount() {
        LayoutAnimation.spring();

        // play crying sound
        this.playCrySound();

        // display message if first time played
        AsyncStorage.getItem('challenges', (err, challenges) => {
            if (!challenges) {
                // there are no values, this is the first true, show messsage
                return this.setState({ 
                    confirmOkModal: !this.state.confirmOkModal, 
                    confirmOkModalMessage: Strings.strokeBaybayToStopCrying, 
                });
            }
        });

        // set static values to state
        const i = this.props.selected.challengeIndex;
        const challengeNumber = ((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString();
        
        this.setState({ 
            // artistName: this.props.selected.challenge.artistName, 
            // songName: this.props.selected.challenge.songName,
            challengeNum: challengeNumber,
         });
    }
    componentDidMount() {
        // in WRONG screen, check if key value pair exists (true or false), if so, do nothing
        // if key/value does not exist, create id: FALSE to indicate that
        // the first time the user played, they guessed WRONG
        const id = this.props.selected.challenge.challengeId;

        if (this.props.challenges.hasOwnProperty(id)) {
            console.log('value exists, played before');
        } else {
            console.log('neverplayed, add FALSE');
            this.props.saveChallenge(id, false);
        }
    }
    componentWillReceiveProps(nextProps) {
        // if user is signed in firebase, save updated user data to firebase

        const user = firebase.auth().currentUser;
        if (user) { this.props.saveUserInfoToFirebase(user.uid, this.props, nextProps); } 
    }

    onPressBackToChallenges() {
        // stop if playing
        if (this.crySound) {
            this.crySound.destroy();
        }
        Actions.challenges();
    }
    onAcceptConfirmOKModal() {
        this.setState({ confirmOkModal: false });
    }
    onPressTryAgain() {
        // stop if playing
        if (this.crySound) {
            this.crySound.destroy();
        }
        Actions.pop();
    }
    playCrySound() {
        // get random songname
        const array = this.props.gamesounds[2].urls;
        const randomIndex = Math.floor(Math.random() * array.length);
        const songName = array[randomIndex].url;
        const songNameEncoded = songName.replace(/ /g, '%20');
        
        const crySound = new Player('file://' + Config.localGamesounds + songNameEncoded);
        crySound.looping = true;
        
        crySound.play();
        // this.crySound = crySound.play();
        this.crySound = crySound;
    }
    playMidSuccessSound() {
        // get random songname
        const array = this.props.gamesounds[0].urls;
        const randomIndex = Math.floor(Math.random() * array.length);
        const songName = array[randomIndex].url;
        const songNameEncoded = songName.replace(/ /g, '%20');
        
        new Player('file://' + Config.localGamesounds + songNameEncoded).play();
    }
    clickCryingBaby() {
        this.setState({ babyClicks: this.state.babyClicks + 1 });
    }
    renderBaby() {
        if (this.state.babyClicks <= 3) {
            // less than 4 clicks, baby is crying and shaking
            return (
                <Animatable.View 
                    ref="view" 
                    style={{ alignItems: 'center' }}
                    animation="bounce" 
                    easing="linear" 
                    iterationCount="infinite"
                >
                    <Babyface 
                        isCrying
                        onPress={this.clickCryingBaby.bind(this)} 
                        animated='flash'
                        // accessories={this.props.accessories} 
                    />
                </Animatable.View>
            );
        }
        // more than 4 clicks, baby stops moving, regular face
        return (
            <Animatable.View 
                style={{ alignItems: 'center' }}
                animation="fadeIn" 
            >
                <Babyface
                    onPress={this.playMidSuccessSound.bind(this)}
                    // isCrying 
                    // animated='flash'
                    // onPress={this.playChallengeBabySound.bind(this)} 
                    // accessories={this.props.accessories} 
                />
            </Animatable.View>
        );
    }
    renderRetryButton() {
        // only show retry button after baby clicked 4 times
        if (this.state.babyClicks <= 3) {
            return;
        }
        // console.log('stop sound, render button');
        this.crySound.destroy();
        return (
            <Animatable.View 
                animation='fadeIn'
                // iterationCount="infinite"
            >
                <ButtonRetry onPress={this.onPressTryAgain.bind(this)} />
            </Animatable.View>
        );
    }
    renderWrongMessage() {
        // show message until clicked 3 times
        if (this.state.babyClicks <= 3) {
            return (
                <Animatable.View 
                    // animation='fadeOut'
                >
                    <Text style={styles.textMessage}>{Strings.youreWrong.toUpperCase()}</Text>
                </Animatable.View>
            );
        }
        return (
                <Animatable.View 
                    animation='fadeOut'
                >
                    <Text style={styles.textMessage}>{Strings.youreWrong.toUpperCase()}</Text>
                </Animatable.View>
            );
    }
   
    render() {
        // console.log(this.props);
        return (
            <View style={styles.screenContainer}>
                
                <Animatable.Image 
                    source={require('../assets/images/backclouds.png')}    
                    style={styles.backdropImage}
                    // animation='fadeIn'
                    iterationCount="infinite"
                />

                <Header 
                    onPressBack={() => { this.onPressBackToChallenges(); }} 
                    title="" 
                    noCoins
                    coins={this.props.coins} 
                    challengeNumber={this.state.challengeNum}
                    levelName={`${Strings.level} ${this.props.selected.level.levelNum}`}
                    categoryName={this.props.selected.category.categoryName}
                />


                {this.renderBaby()}
                
                <View style={styles.container}>

                    {this.renderWrongMessage()}
                    
                </View>

                <View style={styles.containerBottom}>
                    {this.renderRetryButton()}
                </View>

                <BannerSpace />

                <Confirm
                    ok
                    visible={this.state.confirmOkModal}
                    onAccept={this.onAcceptConfirmOKModal.bind(this)}
                >
                    {this.state.confirmOkModalMessage}
                </Confirm>

            </View>       
        );
    }
}
                    // <Text style={styles.textMessage}>{Strings.youreWrong.toUpperCase()}</Text>
                        // <ButtonItunes onPress={this.onPressItunesButton.bind(this)} />

const styles = {
    screenContainer: {
        flex: 1,
        backgroundColor: Config.colorWrongBg,
    },
    backdropImage: {
        position: 'absolute',
        width: Config.deviceWidth,
        // height: Config.deviceWidth / 2 * 3, //ratio of height/width is 3/2
        height: Config.deviceHeight,
        bottom: 0,
    },
    backLightImage: {
        position: 'absolute',
        width: Config.deviceWidth,
        height: Config.deviceWidth, //ratio of height/width is 3/2
        top: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        // borderWidth: 5,
        // borderColor: 'black',
    },
    containerBottom: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        // borderWidth: 5,
        // borderColor: 'black',
    },
    // controlsContainer: {
    //     flexDirection: 'row',
    //     // justifyContent: 'center',
    //     // borderWidth: 1,
    //     alignSelf: 'stretch',
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    //     marginTop: 10,
    //     marginBottom: 10,
    // },
    // rewardMessage: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: Config.colorAccent900,
    //     backgroundColor: Config.colorAccent500,
    //     // paddingLeft: 5,
    //     // paddingRight: 5,
    //     padding: 7,
    //     margin: 5,
    //     borderRadius: 15,
    //     position: 'absolute',
    //     // left: 300,
    //     // marginRight: 25,
    //     right: 20,
    //     top: Config.headerHeight,
    // },
    // rewardMessageText: {
    //     // padding: 3,
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: Config.colorPrimary300,
    //     fontFamily: Config.fontMain,
    //     // textShadowColor: Config.colorAccent700,
    //     // textShadowRadius: 1,
    //     // textShadowOffset: {
    //     //     height: 1,
    //     //     width: 1
    //     // },
    // },
    textMessage: {
        padding: 3,
        backgroundColor: 'transparent',
        fontSize: 35,
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: Config.fontMain,
        color: Config.colorAccent700,
        textShadowColor: Config.colorPrimary900,
        textShadowRadius: 1,
        textShadowOffset: {
            height: 1,
            width: 1
        },
    },
    // textArtistName: {
    //     // padding: 3,
    //     fontSize: 22,
    //     // fontWeight: 'bold',
    //     textAlign: 'center',
    //     color: Config.colorPrimary,
    //     backgroundColor: 'transparent',
    //     fontFamily: Config.fontMain,
    //     // textShadowColor: Config.colorAccent700,
    //     // textShadowRadius: 1,
    //     // textShadowOffset: {
    //     //     height: 1,
    //     //     width: 1
    //     // },
    // },
    // textSongName: {
    //     // padding: 3,
    //     textAlign: 'center',
    //     backgroundColor: 'transparent',
    //     fontFamily: Config.fontMain,
    //     fontSize: 20,
    //     // fontWeight: 'bold',
    //     color: Config.colorPrimary,
    // },
    headerNumberFormat: {
        // fontSize: 25,
        color: Config.colorAccent500,
        // fontWeight: 'bold',
        // paddingLeft: 15
    },
    // itunesBadge: {
    //     width: 180,     // png is 440 x 160
    //     height: 180 * 160 / 440
    // },
    // googleBadge: {
    //     width: 180,     // png is 564 x 168
    //     height: 180 * 168 / 564
    // },
    // topContainer: {
    //     flex: 0,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    // },
    // helpContainer: {
    //     // flex: 1,
    //     position: 'absolute',
    //     // left: 300,
    //     right: 0,
    //     bottom: 0,
    // },
    // optionsContainer: {
    //     flex: 1,
    // }
};

const mapStateToProps = state => {
    return { 
        allChallenges: state.allChallenges, 
        selected: state.selected,
        coins: state.coins, 
        challenges: state.challenges,
        accessories: state.accessories,
        gamesounds: state.gamesounds,
    };
};

export default connect(mapStateToProps, { rewardChallenge, saveChallenge, challengeUpdate, saveUserInfoToFirebase })(Wrong);
