import React from 'react';
import firebase from 'firebase';
import { View, Text, TouchableOpacity, Platform, Image, LayoutAnimation, AsyncStorage, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { ButtonNext, Babyface, BannerSpace, Header, Confirm } from '../components';
import Config from '../Config';
import Strings from '../Strings';
import { rewardChallenge, saveChallenge, challengeUpdate, saveUserInfoToFirebase } from '../actions';

const animationSchemaSwing = {
  0: {
    rotateZ: '0deg',
  },
  0.2: {
    rotateZ: '-10deg',
  },
  0.4: {
    rotateZ: '0deg',
  },
  0.6: {
    rotateZ: '10deg',
  },
  1: {
    rotateZ: '0deg',
  },
};

const animationSchemaRotate = {
  0: {
    rotateZ: '0deg',
    opacity: 1,
  },
  1: {
    rotateZ: '22.5deg',
    opacity: 0.5,
  },
};

const animationSchemaRotateRev = {
  0: {
    rotateZ: '11.25deg',
    opacity: 1,
  },
  1: {
    rotateZ: '-11.25deg',
    opacity: 0.5,
  },
};


class Correct extends React.Component {
    state = { 
        rewardMessageVisible: false, 
        artistName: '', 
        songName: '', 
        challengeNum: '', 
        dance: true,
        confirmOkModal: false,
        confirmOkModalMessage: '', 
    };

    componentWillMount() {
        LayoutAnimation.spring();
        // play happy baby win sound
        // start longsound
        this.playChallengeLongSound(); 

        // display message if first time played
        AsyncStorage.getItem('challenges', (err, challenges) => {
            if (!challenges) {
                // there are no values, this is the first true, show messsage
                return this.setState({ 
                    confirmOkModal: !this.state.confirmOkModal, 
                    confirmOkModalMessage: Strings.congratsOnWinning200Coins, 
                });
            }
        });

        // set static values to state
        const i = this.props.selected.challengeIndex;
        const challengeNumber = ((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString();
        
        this.setState({ 
            artistName: this.props.selected.challenge.artistName, 
            songName: this.props.selected.challenge.songName,
            challengeNum: challengeNumber,
         });
    }
    componentDidMount() {
        // if challenge was never played, reward user with coins
        // check props.challenges for key with current challenge id
        const id = this.props.selected.challenge.challengeId;
        if (this.props.challenges.hasOwnProperty(id)) {
            // console.log('value exists, played before, no reward');
        } else {
            // this challenge never played, solved first guess
            // is this the first true in async challenge (solved on first try)?
            // check if challenges in async contain any true values
            // if not, show first time message 
            AsyncStorage.getItem('challenges', (err, challenges) => {
                if (challenges) {
                    if (challenges.includes('true') === false) {
                        // there are no true values, this will be the first
                        this.setState({ 
                            confirmOkModal: true, 
                            confirmOkModalMessage: Strings.congratsOnWinning200Coins, 
                        });
                    }
                }
            });

            this.setState({ rewardMessageVisible: true });
            this.props.rewardChallenge();    // dispatches action that adds coins
        }

        // in both cases, save challenge as true, will render checkmark
        this.props.saveChallenge(id, true);
        this.playSuccessSound();
    }
    componentWillReceiveProps(nextProps) {
        // if user is signed in firebase, save updated user data to firebase

        const user = firebase.auth().currentUser;
        if (user) { this.props.saveUserInfoToFirebase(user.uid, this.props, nextProps); } 
    }

    onPressStoreBadge() {
        // stop music
        this.longSound.destroy();

        // link to itunes store
        if (Platform.OS === 'ios') {
            return Linking.openURL(this.props.selected.challenge.itunes);
        }

        // link to google play store
        const { artistName, songName } = this.props.selected.challenge;
        const searchString = artistName.replace(/ /g, '+') + '+' + songName.replace(/ /g, '+');
        const url = `https://play.google.com/store/search?q=${searchString}&c=music`;
        return Linking.openURL(url);
    }
    onPressNext() {
        this.stopChallengeLongSound();
        const thisChallengeIndex = this.props.selected.challengeIndex;
        const nextChallengeIndex = this.props.selected.challengeIndex + 1;
        const totalChallenges = this.props.selected.level.challenges.length - 1;    // length is 16, but last index is 15
        
        // if this is the last challenge in the level, go back to challenge grid
        if (thisChallengeIndex === totalChallenges) {
            Actions.challenges();
        } else {
            // otherwise play next challenge back to Artist screen
            // get next available challenges' challengeId
            const nextChallengeId = this.props.selected.level.challenges[nextChallengeIndex].challengeId;
            // pass as argument the challenge object selected, saves to state
            this.props.challengeUpdate(this.props.allChallenges[nextChallengeId], nextChallengeIndex);
            // console.log('new challengeUpdate arguments ', nextChallengeId, nextChallengeIndex);
            // then change screens
            Actions.artist();
        }
    }

    onPressBackToChallenges() {
        this.stopChallengeLongSound();
        Actions.challenges();
    }
    playSuccessSound() {
        // get random songname
        const array = this.props.gamesounds[1].urls;
        const randomIndex = Math.floor(Math.random() * array.length);
        const songName = array[randomIndex].url;
        const songNameEncoded = songName.replace(/ /g, '%20');
        
        new Player('file://' + Config.localGamesounds + songNameEncoded).play();
    }


    playChallengeLongSound() {
        // make baby move
        this.setState({ dance: true });

        // stop if currently playing
        if (this.longSound) {
            this.longSound.destroy();
        }
        // replay
        const fileName = this.props.selected.challenge.longUrl.replace(/ /g, '%20');
        const filePathLong = 'file://' + Config.localChallengesLong + fileName;
        
        this.longSound = new Player(filePathLong);
        // this.longSound.duration = 10;
        this.longSound.play();
    }
    stopChallengeLongSound() {
        // stop baby
        this.setState({ dance: false });
        this.longSound.destroy();
    }
    
    onAcceptConfirmOKModal() {
        this.setState({ confirmOkModal: false });
    }

    playChallengeBabySound() {
        // stop if currently playing
        if (this.shortSound) {
            this.shortSound.destroy();
        }
        // replay
        const fileName = this.props.selected.challenge.shortUrl.replace(/ /g, '%20');
        const filePath = 'file://' + Config.localChallenges + fileName;
        this.shortSound = new Player(filePath).play();
        this.shortSound.play();
    }
    renderStoreBadge() {
        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity onPress={this.onPressStoreBadge.bind(this)}>
                    <Image 
                        source={require('../assets/images/itunes.png')}    
                        style={styles.itunesBadge}
                    />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity onPress={this.onPressStoreBadge.bind(this)}>
                <Image 
                    source={require('../assets/images/google.png')}    
                    style={styles.googleBadge}
                />
            </TouchableOpacity>
        );
    }
    renderBaby() {
        if (this.state.dance) {
            return (
                <Animatable.View 
                    ref="view" 
                    style={{ alignItems: 'center' }}
                    animation={animationSchemaSwing} 
                    easing="linear" 
                    iterationCount="infinite"
                >
                    <Babyface 
                        onPress={this.playChallengeBabySound.bind(this)} 
                        accessories={this.props.accessories} 
                        animated='none'
                    />
                </Animatable.View>
            );
        }
        return (
            <Animatable.View 
                style={{ alignItems: 'center' }}
            >
                <Babyface 
                    onPress={this.playChallengeBabySound.bind(this)} 
                    accessories={this.props.accessories} 
                />
            </Animatable.View>
        );
    }
    renderRewardMessage() {
        return (
            <Animatable.View 
                style={styles.rewardMessage}
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite"
            >
                <Text style={styles.rewardMessageText}> + {Config.challengeReward} </Text>
                <Icon 
                    name={Config.coinIconName}
                    size={20}
                    color={Config.colorPrimary300}
                />
            </Animatable.View>
        );
    }

    render() {
                // <Image 
                //     source={require('../assets/images/backconfetti.png')}    
                //     style={styles.backdropImage}
                // />
        return (
            <View style={styles.screenContainer}>
                <Animatable.Image 
                    source={require('../assets/images/backclouds.png')}    
                    style={styles.backdropImageClouds}
                    animation='fadeIn'
                    // iterationCount="infinite"
                />
                <Animatable.Image 
                    source={require('../assets/images/backconfetti.png')}    
                    style={styles.backdropImage}
                    animation='fadeOutDown'
                    iterationCount="infinite"
                />


                <Animatable.Image
                    source={require('../assets/images/light.png')}   
                    style={styles.backLightImage}
                    animation={animationSchemaRotate} 
                    // animation="rotate" 
                    // easing="ease-in-out" 
                    iterationCount="infinite"
                />

                <Animatable.Image
                    source={require('../assets/images/light.png')}   
                    style={styles.backLightImage}
                    animation={animationSchemaRotateRev} 
                    // animation="rotate" 
                    // easing="ease-in-out" 
                    iterationCount="infinite"
                />

                <Header 
                    onPressBack={() => { this.onPressBackToChallenges(); }} 
                    title="" 
                    coins={this.props.coins} 
                    challengeNumber={this.state.challengeNum}
                    levelName={`${Strings.level} ${this.props.selected.level.levelNum}`}
                    categoryName={this.props.selected.category.categoryName}
                />


                {this.renderBaby()}
                
                {this.state.rewardMessageVisible ? this.renderRewardMessage() : null }

                <View style={styles.container}>


                    <Text style={styles.textMessage}>{Strings.goodGuess.toUpperCase()}</Text>
                    <Text style={styles.textArtistName}>{this.state.artistName.toUpperCase()}</Text>
                    <Text style={styles.textSongName}>{this.state.songName.toUpperCase()}</Text>
                    
                    <View style={styles.controlsContainer}>
                        <TouchableOpacity
                            onPress={this.playChallengeLongSound.bind(this)}
                        >
                            <Icon 
                                name="circle"
                                size={60} 
                                color='white'
                                style={{ position: 'absolute' }}
                            />
                            <Icon 
                                name="play-circle"
                                size={60} 
                                color='black'
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </TouchableOpacity>

                        {this.renderStoreBadge()}

                        <TouchableOpacity
                            onPress={this.stopChallengeLongSound.bind(this)}
                        >
                            <Icon 
                                name="circle"
                                size={60} 
                                color='white'
                                style={{ position: 'absolute' }}
                            />
                            <Icon 
                                name="stop-circle"
                                size={60} 
                                color='black'
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <ButtonNext onPress={this.onPressNext.bind(this)} />
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
                        // <ButtonItunes onPress={this.onPressItunesButton.bind(this)} />

const styles = {
    screenContainer: {
        flex: 1,
        backgroundColor: Config.colorAccent200,
    },
    backdropImageClouds: {
        position: 'absolute',
        width: Config.deviceWidth,
        // height: Config.deviceWidth / 2 * 3, //ratio of height/width is 3/2
        height: Config.deviceHeight,
        bottom: 0,
    },
    backdropImage: {
        position: 'absolute',
        width: Config.deviceWidth,
        height: Config.deviceWidth / 2 * 3, //ratio of height/width is 3/2
        top: 0,
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
    controlsContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // borderWidth: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    rewardMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Config.colorAccent900,
        backgroundColor: Config.colorAccent500,
        // paddingLeft: 5,
        // paddingRight: 5,
        padding: 7,
        margin: 5,
        borderRadius: 15,
        position: 'absolute',
        // left: 300,
        // marginRight: 25,
        right: 20,
        top: Config.headerHeight,
    },
    rewardMessageText: {
        // padding: 3,
        fontSize: 20,
        // fontWeight: 'bold',
        color: Config.colorPrimary300,
        fontFamily: Config.fontMain,
        // textShadowColor: Config.colorAccent700,
        // textShadowRadius: 1,
        // textShadowOffset: {
        //     height: 1,
        //     width: 1
        // },
    },
    textMessage: {
        padding: 3,
        backgroundColor: 'transparent',
        fontSize: 35,
        // fontWeight: 'bold',
        fontFamily: Config.fontMain,
        color: Config.colorAccent700,
        textShadowColor: Config.colorPrimary900,
        textShadowRadius: 1,
        textShadowOffset: {
            height: 1,
            width: 1
        },
    },
    textArtistName: {
        // padding: 3,
        fontSize: 22,
        // fontWeight: 'bold',
        textAlign: 'center',
        color: Config.colorPrimary,
        backgroundColor: 'transparent',
        fontFamily: Config.fontMain,
        // textShadowColor: Config.colorAccent700,
        // textShadowRadius: 1,
        // textShadowOffset: {
        //     height: 1,
        //     width: 1
        // },
    },
    textSongName: {
        // padding: 3,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontFamily: Config.fontMain,
        fontSize: 20,
        // fontWeight: 'bold',
        color: Config.colorPrimary,
    },
    headerNumberFormat: {
        // fontSize: 25,
        color: Config.colorAccent500,
        // fontWeight: 'bold',
        // paddingLeft: 15
    },
    itunesBadge: {
        width: 180,     // png is 440 x 160
        height: 180 * 160 / 440
    },
    googleBadge: {
        width: 180,     // png is 564 x 168
        height: 180 * 168 / 564
    },
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

export default connect(mapStateToProps, { rewardChallenge, saveChallenge, challengeUpdate, saveUserInfoToFirebase })(Correct);
