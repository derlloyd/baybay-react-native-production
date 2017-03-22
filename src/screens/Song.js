import React from 'react';
import firebase from 'firebase';
import { View, LayoutAnimation, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';
import FBSDK from 'react-native-fbsdk';
import * as Animatable from 'react-native-animatable';

import { BannerSpace, Header, ButtonOption, Babyface, Confirm, HelpButton } from '../components';
import { fetchChallengeShortSound, fetchChallengeLongSound, removeWrongOption, saveUserInfoToFirebase } from '../actions';
import Config from '../Config';
import Strings from '../Strings';

const { ShareButton } = FBSDK;

class Song extends React.Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://baybay.co',
        };
        this.state = {
            shareLinkContent,
            babyClicks: 0,
            optionsModal: false, 
            coinsModal: false, 
            confirmOkModal: false, 
            confirmOkModalMessage: '',
        };
    }

    componentWillMount() {
        // display message if first time played
        AsyncStorage.getItem('challenges', (err, challenges) => {
            if (!challenges) {
                this.setState({ 
                    confirmOkModal: !this.state.confirmOkModal, 
                    confirmOkModalMessage: Strings.clickCorrectSongRemoveByClicking, 
                });
            }
        });

        LayoutAnimation.spring();
    }
    componentWillReceiveProps(nextProps) {
        // if user is signed in firebase, save updated user data to firebase

        const user = firebase.auth().currentUser;
        if (user) { this.props.saveUserInfoToFirebase(user.uid, this.props, nextProps); } 
    }

    onAcceptOptionsModal() {
        this.props.removeWrongOption(this.props.selected.songOptions, 'song');
        // this.props.purchaseWrongOption();
        this.setState({ optionsModal: false });
    }

    onDeclineOptionsModal() {
        // hide modal when user clicks NO
        this.setState({ optionsModal: false });
    }

    onAcceptCoinsModal() {
        // accept to buy more coins, go to accessories screen
        this.setState({ coinsModal: false });
        Actions.settings_tabs();
    }

    onDeclineCoinsModal() {
        this.setState({ coinsModal: false });
    }

    onAcceptConfirmOKModal() {
        this.setState({ confirmOkModal: false });
    }

    clickRemoveOption() {
        // check if user has enough coins to remove, or does he need to buy more
        if (this.props.coins >= Config.purchaseOptionCost) {
            this.setState({ optionsModal: !this.state.optionsModal });
        } else {
            this.setState({ coinsModal: !this.state.coinsModal });
        }
    }
    clickOption(option) {
        // stop sound if currently playing
        if (this.shortSound) {
            this.shortSound.destroy();
        }
        if (option.correct) {
            // option contains correct key, next guess
            Actions.correct();
        } else {
            // no correct key, wrong option, wrong screen
            Actions.wrong();
        }
    }
    clickBaby() {
        this.setState({ babyClicks: this.state.babyClicks + 1 });
        // stop sound if currently playing
        if (this.shortSound) {
            this.shortSound.destroy();
        }
        // replay
        const fileName = this.props.selected.challenge.shortUrl.replace(/ /g, '%20');
        const filePath = 'file://' + Config.localChallenges + fileName;
        this.shortSound = new Player(filePath).play();
        this.shortSound.play();
    }

    renderOptionList() {
        // get list of options from props
        const optionList = this.props.selected.songOptions.map((option, i) => {
            // function that renders each option
            if (option.hide) {
                // disabled inactive button, no text
                return (
                    <ButtonOption key={i} disabled> </ButtonOption>
                );
            }
            // standard option button
            return (
                <ButtonOption key={i} correct={option.correct} onPress={() => { this.clickOption(option); }}>
                    {option.name}
                </ButtonOption>
            );
        });
        return optionList;
    }

    render() {
        // console.log(this.state);

        const i = this.props.selected.challengeIndex;
        const challengeNumber = ((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString();
        
        return (
            <View style={styles.screenContainer}>
                <Animatable.Image 
                    source={require('../assets/images/backclouds.png')}    
                    style={styles.backdropImageClouds}
                    animation='fadeIn'
                />
                <Image 
                    source={require('../assets/images/backdrop.png')}    
                    style={styles.backdropImage}
                />
                
                <Header 
                    onPressBack={() => { Actions.artist(); }} 
                    title="" 
                    coins={this.props.coins} 
                    challengeNumber={challengeNumber}
                    levelName={`${Strings.level} ${this.props.selected.level.levelNum}`}
                    categoryName={this.props.selected.category.categoryName}
                />

                <View style={styles.container}>

                    <View style={styles.shareButton}>
                        <ShareButton shareContent={this.state.shareLinkContent} />
                    </View>

                    <View style={styles.topContainer}>

                            <Babyface onPress={this.clickBaby.bind(this)} accessories={this.props.accessories} />
                        
                        <View style={styles.helpContainer}>
                            <HelpButton onPress={this.clickRemoveOption.bind(this)} />
                        </View>

                    </View>

                    <View style={styles.optionsContainer}>
                        
                        {this.renderOptionList()}

                    </View>       

                </View>

                <BannerSpace />
                
                <Confirm
                    visible={this.state.optionsModal}
                    onAccept={this.onAcceptOptionsModal.bind(this)}
                    onDecline={this.onDeclineOptionsModal.bind(this)}
                    buyWrongAnswer
                />

                <Confirm
                    visible={this.state.coinsModal}
                    onAccept={this.onAcceptCoinsModal.bind(this)}
                    onDecline={this.onDeclineCoinsModal.bind(this)}
                    nsf
                />

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
        backgroundColor: Config.colorPrimary50,
    },
    backdropImageClouds: {
        position: 'absolute',
        width: Config.deviceWidth,
        height: Config.deviceHeight,
        bottom: 0,
    },
    backdropImage: {
        position: 'absolute',
        width: Config.deviceWidth,
        height: Config.deviceWidth / 2 * 3, //ratio of height/width is 3/2
        top: -50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    topContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    helpContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    optionsContainer: {
        flex: 1,
    },
    shareButton: {
        margin: 10,
        position: 'absolute',
        zIndex: 999,
    },
});

// makes state available as props
const mapStateToProps = state => {
    return { 
        selected: state.selected, 
        coins: state.coins,
        accessories: state.accessories,
        gamesounds: state.gamesounds,
    };
};

export default connect(mapStateToProps, { 
    fetchChallengeShortSound, 
    fetchChallengeLongSound, 
    removeWrongOption, 
    saveUserInfoToFirebase,
})(Song);
