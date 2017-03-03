import React from 'react';
import { View, Text, Switch, TouchableOpacity, AsyncStorage, LayoutAnimation } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import awaitEach from 'await-each';
import { Player } from 'react-native-audio-toolkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from '../components';
import { challengeUpdate, resetShortSound } from '../actions';
import Config from '../Config';

class ChallengeGrid extends React.Component {
    state = {
        renderedChallenges: '',
        SwitchIsOn: false,      // false default off position to the left
    }
    componentWillMount() {
        LayoutAnimation.easeInEaseOut();
        this.getChallenges();
    }
    componentDidMount() {
        // reset value of props.selected.shortSoundLoaded to false
        this.props.resetShortSound();
    }
    componentWillReceiveProps() {
        // this is called to re-render when coming from another scene
        this.componentWillMount();
    }
    getChallenges() {
        // get challenges of this level out of props, create new array of objects
        // user could have completed some, so need to iterate through them to
        // add property done: true, false or null
        const newChallengesObject = [];
        awaitEach(this.props.selected.level.challenges, async (challenge) => {
            await
            AsyncStorage.getItem(challenge.challengeId, async (err, result) => {
                // search local storage to see if challenge was completed
                // add the done: true or false key/value to the object
                await
                newChallengesObject.push({ challengeId: challenge.challengeId, done: result });
            });
            // now array of objects is created, render each challenge in it
            const renderedChallenges = newChallengesObject.map(this.renderChallenges.bind(this));
            // update state to re-render component
            this.setState({ renderedChallenges });
        });
    }
    renderChallenges(challenge, i) {
        // possible onPress methods
        const click = () => {
            // pass as argument the challenge object selected, saves to state
            this.props.challengeUpdate(this.props.allChallenges[challenge.challengeId]);
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
        if (challenge.done === 'false') {
            gridText = (
                <Text style={styles.challengeTextStyleTried}>
                    {((i + 1) < 10) ? `0${(i + 1).toString()}` : (i + 1).toString()}
                </Text>
            );
        }

        // if challenge completed, display some Icon
        if (challenge.done === 'true') {
            // if Switch in ON position (value true), render music note
            // and change onPress method to play sound
            if (this.state.SwitchIsOn) {
                gridText = (
                    <Icon name="music" size={40} color="yellow" />
                );
                challengeOnPress = playSound;
            } else {
                // else render checkmark check-circle-o, keep default onclick
                gridText = (
                    <Icon name="check" size={40} color="yellow" />
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
    toggleSwitch(value) {
        this.setState({ SwitchIsOn: value });
        // re-render
        this.getChallenges();
    }
    render() {
        // console.log(this.props);
        // on first run, value is empty, so render ...
        const renderAll = this.state.renderedChallenges || <Text>...</Text>;
        return (
            <View style={styles.screenContainer}>
                
                <Header 
                    onPressBack={() => { Actions.categories(); }} 
                    title="Select Challenge" 
                    coins={this.props.coins}
                />
                
                <View style={styles.challengeContainerStyle}>

                    {renderAll}

                </View>

                <View style={styles.switchContainer}>
                    <Switch
                        onValueChange={(value) => this.toggleSwitch(value)}
                        style={styles.switch}
                        onTintColor="#00ff00"
                        // thumbTintColor="#0000ff"
                        // tintColor="#ff0000"
                        value={this.state.SwitchIsOn}
                    />
                </View>

            </View>       
        );
    }
}

const styles = {
    screenContainer: {
        flex: 1,
        // marginBottom: 20,
    },
    switchContainer: {
        flex: 1,
        // alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: 'darkblue', 
    },
    switch: {
        // flex: 1,
    },
    challengeContainerStyle: {
        // borderWidth: 2,
        // borderColor: 'darkblue', 
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    challengeStyle: { 
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 70,
        // borderWidth: 2,
        // borderColor: 'darkblue', 
        backgroundColor: 'rgb(235, 30, 216)',   // light purple
        borderRadius: 20,
        marginTop: 20,
    },
    challengeTextStyle: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        // paddingLeft: 15
    },
    challengeTextStyleTried: {
        fontSize: 25,
        color: 'grey',
        fontWeight: 'bold',
        // paddingLeft: 15
    }
    // challengeStyleSuccess: { 
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: 70,
    //     width: 70,
    //     borderWidth: 2,
    //     borderColor: 'blue', 
    //     backgroundColor: 'rgb(0, 230, 120)',
    //     borderRadius: 15,
    //     // margin: 10,
    // },
    // levelsContainer: { 
    //     flexDirection: 'column',
    //     alignSelf: 'stretch',
    //     marginTop: 5   // space between
    //     // borderBottomWidth: 1
    // },
    // levelStyle: { 
    //     borderWidth: 1,
    //     borderColor: '#ddd',    // light grey
    //     // padding: 3,
    //     marginBottom: 5
    // },
    // levelNameStyle: { 
    //     fontSize: 13
    // },
    // leveldescriptionStyle: { 
    //     fontSize: 10
    // }
};

const mapStateToProps = state => {
    return { 
        allChallenges: state.allChallenges, 
        selected: state.selected,
        coins: state.coins,
    };
};

export default connect(mapStateToProps, { challengeUpdate, resetShortSound })(ChallengeGrid);


    // render() {
        // old method that works but does not render different style
        // const renderAllChallenges = this.props.level.challenges.map(this.renderChallenges.bind(this));
