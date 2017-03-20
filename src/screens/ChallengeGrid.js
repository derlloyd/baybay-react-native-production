import React from 'react';
import firebase from 'firebase';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Header } from '../components';
import { challengeUpdate, resetShortSound, saveUserInfoToFirebase } from '../actions';
import Config from '../Config';
import Strings from '../Strings';

class ChallengeGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SwitchIsOn: false,      // false default off position to the left
        };
    }
    componentDidMount() {
        // reset value of props.selected.shortSoundLoaded to false
        this.props.resetShortSound();
    }
    componentWillReceiveProps(nextProps) {
        // if user is signed in firebase, save updated user data to firebase

        const user = firebase.auth().currentUser;
        if (user) { this.props.saveUserInfoToFirebase(user.uid, this.props, nextProps); } 
    }
    getChallenges() {
        // get challenges of this level out of props, create new array of objects
        // user could have completed some, so need to iterate through them to
        // add property done: true, false or null
        const newChallengesObject = [];

        this.props.selected.level.challenges.forEach((challenge) => {
            // whatever value of this.props.challenges[challenge.challengeId], push it to done
            newChallengesObject.push({ challengeId: challenge.challengeId, done: this.props.challenges[challenge.challengeId] });
        });
        // now array of objects is created, render each challenge in it
        const renderedChallenges = newChallengesObject.map(this.renderChallenges.bind(this));

        return renderedChallenges;
    }
    renderChallenges(challenge, i) {
        // possible onPress methods
        const click = () => {
            // pass as argument the challenge object selected, saves to state
            this.props.challengeUpdate(this.props.allChallenges[challenge.challengeId], i);
            // then change screens
            Actions.artist();
        };

        const playSound = () => {
            // fn when music note challenge clicked
            const songName = this.props.allChallenges[challenge.challengeId].shortUrl;
            // replace space in songName with space character
            const songNameEncoded = songName.replace(/ /g, '%20');
            new Player('file://' + Config.localChallenges + songNameEncoded).play();
        };

        // define default onPress method of click to play challenge 
        let challengeOnPress = click;

        // default text to display in the challenge box (done is null)
        let gridText = (
            <Text style={styles.challengeTextStyle}>
                {((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString()}
            </Text>
        );

        // if challenge tried, but failed, change font style
        if (challenge.done === false) {
            gridText = (
                <Text style={styles.challengeTextStyleTried}>
                    {((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString()}
                </Text>
            );
        }

        // if challenge completed, display some Icon
        if (challenge.done === true) {
            // if Switch in ON position (value true), render music note
            // and change onPress method to play sound
            if (this.state.SwitchIsOn) {
                gridText = (
                    <Icon name="music" size={40} color={Config.colorAccent500} />
                );
                challengeOnPress = playSound;
            } else {
                // else render checkmark check-circle-o, keep default onclick
                gridText = (
                    <Icon name="check" size={40} color={Config.colorAccent500} />
                );
            }
        }

        // function that renders each option
        return (
            <View key={challenge.challengeId} >
                <TouchableOpacity
                    onPress={() => challengeOnPress()}
                >
                    <View style={styles.challengeStyle}>
                        {gridText}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        // console.log(this.props);
        return (
            <View style={styles.screenContainer}>
                
                <Header 
                    onPressBack={() => { Actions.categories(); }} 
                    title="" 
                    coins={this.props.coins} 
                    levelName={`${Strings.level} ${this.props.selected.level.levelNum}`}
                    categoryName={this.props.selected.category.categoryName}
                />

                <View style={styles.challengeContainerStyle}>

                    {this.getChallenges()}

                </View>

                <View style={styles.switchContainer}>
                    <Icon name="check" size={20} color={Config.colorAccent500} />
                    <Switch
                        onValueChange={(value) => this.setState({ SwitchIsOn: value })}
                        style={styles.switch}
                        onTintColor={Config.colorAccent500}
                        thumbTintColor={Config.colorPrimary800} 
                        tintColor={Config.colorPrimary}    
                        value={this.state.SwitchIsOn}
                    />
                    <Icon name="music" size={20} color={Config.colorAccent500} />
                </View>

            </View>       
        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        // marginBottom: 20,
        backgroundColor: Config.colorPrimary50,
    },
    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: 'darkblue', 
    },
    switch: {
        // flex: 1,
        transform: [{
            scale: 1.2,
            // scaleY: 4.8,
        }],
        margin: 15,
    },
    challengeContainerStyle: {
        // borderWidth: 2,
        // borderColor: 'darkblue', 
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    challengeStyle: { 
        alignItems: 'center',
        justifyContent: 'center',
        height: Config.deviceWidth / 5.2,   // to ensure max 4 per row
        width: Config.deviceWidth / 5.2,
        // borderWidth: 2,
        // borderColor: 'darkblue', 
        // backgroundColor: 'rgb(235, 30, 216)',   // light purple
        backgroundColor: Config.colorPrimary800,
        borderRadius: 20,
        marginTop: 20,
    },
    challengeTextStyle: {
        fontSize: 25,
        color: 'white',
        fontFamily: Config.fontMain,
        // fontWeight: 'bold',
        // paddingLeft: 15
    },
    challengeTextStyleTried: {
        fontSize: 25,
        // color: 'grey',
        fontFamily: Config.fontMain,
        opacity: 0.54,
        // fontWeight: 'bold',
        // paddingLeft: 15
    }
});

const mapStateToProps = state => {
    return { 
        allChallenges: state.allChallenges, 
        selected: state.selected,
        coins: state.coins,
        challenges: state.challenges,
    };
};

export default connect(mapStateToProps, { challengeUpdate, resetShortSound, saveUserInfoToFirebase })(ChallengeGrid);
