import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Babyface } from '../components';
import { saveChallenge } from '../actions';

class Wrong extends React.Component {
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
    onPressTryAgain() {
        Actions.pop();
    }

    onPressBackToChallenges() {
        Actions.challenges({ level: this.props.selected.level });
    }
    
    playSuccessSound() {
        // get random songname
        const soundArray = this.props.gamesounds[3].urls;
        const randomIndex = Math.floor(Math.random() * soundArray.length);
        const songName = soundArray[randomIndex].url;
        
        const songNameEncoded = songName.replace(/ /g, '%20');

        new Player('file://' + Config.localGamesounds + songNameEncoded).play();
    }
    render() {
        // console.log(this.props);
        return (
            <View>

                <Text>WRONG</Text>
                <Babyface isCrying accessories={{ }} />
                <Button onPress={this.onPressTryAgain.bind(this)}>
                    try again
                </Button>

                <Button onPress={this.onPressBackToChallenges.bind(this)}>
                    Back to challenges
                </Button>

            </View>       
        );
    }
}

const mapStateToProps = state => {
    return { 
        currentChallenge: state.currentChallenge,
        selected: state.selected,
        coins: state.coins, 
        challenges: state.challenges,
    };
};

export default connect(mapStateToProps, { saveChallenge })(Wrong);
