import React from 'react';
import firebase from 'firebase';
import { View, LayoutAnimation, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Player } from 'react-native-audio-toolkit';

import { Header, Spinner, ButtonOption, Babyface, Confirm, HelpButton, BannerSpace } from '../components';
import { fetchChallengeShortSound, fetchChallengeLongSound, removeWrongOption, saveUserInfoToFirebase } from '../actions';
import Config from '../Config';
import Strings from '../Strings';

class Artist extends React.Component {
    state = { babyClicks: 0, optionsModal: false, coinsModal: false, confirmOkModal: false, confirmOkModalMessage: '' }

    componentWillMount() {
        // display message if first time played
        AsyncStorage.getItem('challenges', (err, challenges) => {
            if (!challenges) {
                this.setState({ 
                    confirmOkModal: !this.state.confirmOkModal, 
                    confirmOkModalMessage: Strings.clickCorrectArtistRemoveByClicking, 
                });
            }
        });

        LayoutAnimation.spring();
        // load short and long mp3s, pass the challenge object
        this.props.fetchChallengeShortSound(this.props.selected.challenge);
        this.props.fetchChallengeLongSound(this.props.selected.challenge);
    }
    componentWillReceiveProps(nextProps) {
        // if user is signed in firebase, save updated user data to firebase

        const user = firebase.auth().currentUser;
        if (user) { this.props.saveUserInfoToFirebase(user.uid, this.props, nextProps); } 
    }

    clickOption(option) {
        if (this.state.babyClicks === 0) {
            return this.setState({ 
                    confirmOkModal: !this.state.confirmOkModal, 
                    confirmOkModalMessage: Strings.holdOnPleaseListenOnce, 
                });
        }
        // stop sound if currently playing
        if (this.shortSound) {
            this.shortSound.destroy();
        }
        if (option.correct) {
            // option contains correct key, next guess
            this.playMidSuccessSound();
            Actions.song();
        } else {
            // no correct key, wrong option, wrong screen
            Actions.wrong();
        }
    }

    playMidSuccessSound() {
        // get random songname
        const array = this.props.gamesounds[0].urls;
        const randomIndex = Math.floor(Math.random() * array.length);
        const songName = array[randomIndex].url;
        const songNameEncoded = songName.replace(/ /g, '%20');
        
        new Player('file://' + Config.localGamesounds + songNameEncoded).play();
    }

    clickRemoveOption() {
        // check if user has enough coins to remove, or does he need to buy more
        if (this.props.coins >= Config.purchaseOptionCost) {
            this.setState({ optionsModal: !this.state.optionsModal });
        } else {
            this.setState({ coinsModal: !this.state.coinsModal });
        }
    }

    onAcceptOptionsModal() {
        this.props.removeWrongOption(this.props.selected.artistOptions, 'artist');
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
        const optionList = this.props.selected.artistOptions.map((option, i) => {
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
    renderBabyface() {
        if (this.props.selected.shortSoundLoaded) {
            return (
                <Babyface onPress={this.clickBaby.bind(this)} accessories={this.props.accessories} />
            );
        }
        return (
                <Spinner style={{ height: 200, width: 200 }} />
            );
    }

    render() {
        // console.log(this.state);

        const i = this.props.selected.challengeIndex;
        const challengeNumber = ((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString();
        
        return (
            <View style={styles.screenContainer}>
                <Image 
                    source={require('../assets/images/backdrop.png')}    
                    style={styles.backdropImage}
                />
                
                <Header 
                    onPressBack={() => { Actions.challenges(); }} 
                    title="" 
                    coins={this.props.coins} 
                    challengeNumber={challengeNumber}
                    levelName={`${Strings.level} ${this.props.selected.level.levelNum}`}
                    categoryName={this.props.selected.category.categoryName}
                />
                <View style={styles.container}>
                    <View style={styles.topContainer}>

                            {this.renderBabyface()}
                        
                        <View style={styles.helpContainer}>
                            <HelpButton onPress={this.clickRemoveOption.bind(this)} />
                        </View>

                    </View>

                    <View style={styles.optionsContainer}>
                        
                        {this.renderOptionList()}

                    </View>       

                </View>
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

                <BannerSpace />
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Config.colorPrimary50,
        // marginBottom: Config.bannerHeight,
        // marginBottom: 60,
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
        // alignSelf: 'center',
        // alignSelf: 'stretch',
        // borderWidth: 5,
        // borderColor: 'black',
    },
    topContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    helpContainer: {
        // flex: 1,
        position: 'absolute',
        // left: 300,
        // marginRight: 25,
        right: 0,
        bottom: 0,
    },
    optionsContainer: {
        flex: 1,
    }
});

// makes state available as props
const mapStateToProps = state => {
    return { 
        selected: state.selected, 
        coins: state.coins,
        accessories: state.accessories,
        gamesounds: state.gamesounds,
        // confirmOkMessage: 'this is a confirmOK message',
    };
};

export default connect(mapStateToProps, { 
    // fetchGamesounds, 
    fetchChallengeShortSound, 
    fetchChallengeLongSound, 
    removeWrongOption, 
    saveUserInfoToFirebase,
})(Artist);


        // get list of options from props
        // const optionList = this.props.selected.artistOptions.map((option, i) => {
        //     // function that renders each option
        //     if (option.hide) {
        //         // inactive button
        //         return (
        //             <ButtonOptionDisabled key={i}>
        //                 -
        //             </ButtonOptionDisabled>
        //         );
        //     }
        //     // standard option button
        //     return (
        //         <ButtonOption key={i} correct={option.correct} onPress={() => { this.clickOption(option); }}>
        //             {option.name}
        //         </ButtonOption>
        //     );
        // });
            
                    // <Button onPress={() => { this.props.removeWrongOption(this.props.selected.artistOptions, 'artist'); }}>
                    //     REMOVE 1 WRONG
                    // </Button>
                            // onPress={() => { this.props.removeWrongOption(this.props.selected.artistOptions, 'artist'); }}
                // <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                //         show modal
                //     </Button>
                            // onPress={() => this.setState({ optionsModal: !this.state.optionsModal })}
                // console.log('this props: ', this.props);
        // const list = this.renderOptionList.bind(this);
