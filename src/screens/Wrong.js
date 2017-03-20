import React from 'react';
import firebase from 'firebase';
import { View, Text, LayoutAnimation, AsyncStorage, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';
import * as Animatable from 'react-native-animatable';

import { ButtonRetry, Babyface, Header, Confirm } from '../components';
import Config from '../Config';
import Strings from '../Strings';
import { rewardChallenge, saveChallenge, challengeUpdate, saveUserInfoToFirebase } from '../actions';

class Wrong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challengeNum: '', 
            displayMessage: '', 
            dance: true,
            babyClicks: 0,
            confirmOkModal: false,
            confirmOkModalMessage: '', 
        };
    }

    componentWillMount() {
        LayoutAnimation.spring();

        // play crying sound
        this.playCrySound();

        // display message if first time played
        AsyncStorage.getItem('challenges', (err, challenges) => {
            // console.log('async challenges result: ', challenges);
            if (!challenges) {
                // there are no values, this is the first true, show messsage
                return this.setState({ 
                    confirmOkModal: true, 
                    confirmOkModalMessage: Strings.strokeBaybayToStopCrying, 
                });
            }
            if (challenges) {
                if (challenges.includes('false') === false) {
                    // there are no false values, this will be the first time user got one wrong
                    return this.setState({ 
                        confirmOkModal: true, 
                        confirmOkModalMessage: Strings.strokeBaybayToStopCrying, 
                    });
                }
            }
        });

        // set static values to state
        const i = this.props.selected.challengeIndex;
        const challengeNumber = ((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString();
        
        this.setState({ 
            challengeNum: challengeNumber,
            displayMessage: this.getDisplayMessage(),
         });
    }
    componentDidMount() {
        // in WRONG screen, check if key value pair exists (true or false), if so, do nothing
        // if key/value does not exist, create id: FALSE to indicate that
        // the first time the user played, they guessed WRONG
        const id = this.props.selected.challenge.challengeId;

        if (this.props.challenges.hasOwnProperty(id)) {
            // console.log('value exists, played before');
        } else {
            // console.log('neverplayed, add FALSE');
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

    getDisplayMessage() {
        // possible displayed messages
        // not all languages have 17 options
        const messages = [
            Strings.youreWrong,
            Strings.youreWrong2 ? Strings.youreWrong2 : Strings.youreWrong,
            Strings.youreWrong3 ? Strings.youreWrong3 : Strings.youreWrong,
            Strings.youreWrong4 ? Strings.youreWrong4 : Strings.youreWrong,
            Strings.youreWrong5 ? Strings.youreWrong5 : Strings.youreWrong,
            Strings.youreWrong6 ? Strings.youreWrong6 : Strings.youreWrong,
            Strings.youreWrong7 ? Strings.youreWrong7 : Strings.youreWrong,
            Strings.youreWrong8 ? Strings.youreWrong8 : Strings.youreWrong,
        ];

        // return random message to display
        return messages[Math.floor(Math.random() * messages.length)].toUpperCase();
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
                <Animatable.View>
                    <Text style={styles.textMessage}>{this.state.displayMessage}</Text>
                </Animatable.View>
            );
        }
        return (
                <Animatable.View 
                    animation='fadeOut'
                >
                    <Text style={styles.textMessage}>{this.state.displayMessage}</Text>
                </Animatable.View>
            );
    }
   
    render() {
        return (
            <View style={styles.screenContainer}>
                
                <Animatable.Image 
                    source={require('../assets/images/backclouds.png')}    
                    style={styles.backdropImage}
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

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Config.colorWrongBg,
    },
    backdropImage: {
        position: 'absolute',
        width: Config.deviceWidth,
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
    },
    containerBottom: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
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
    headerNumberFormat: {
        color: Config.colorAccent500,
    },
});

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
