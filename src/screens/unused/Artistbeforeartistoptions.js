import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Player } from 'react-native-audio-toolkit';
import { Button, Babyface } from '../components';
import { fetchGamesounds, fetchChallengeShortSound, fetchChallengeLongSound, removeWrongOption } from '../actions';
import Config from '../Config';

class Artist extends React.Component {
    state = {
        option0: true,
        option1: true,
        option2: true,
        option3: true,
        option4: true,
    }
    componentWillMount() {
        // load short and long mp3s, pass the challenge object
        this.props.fetchChallengeShortSound(this.props.selected.challenge);
        this.props.fetchChallengeLongSound(this.props.selected.challenge);
    }

    onPressOption(option) {
        if (option.correct) {
            // option contains correct key
            Actions.song();
        } else {
            // no correct key, wrong option
            Actions.wrong();
        }
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
    removeWrongOption() {
        console.log('removing wrong option');
        // console.log('options array: ', this.props.selected.challenge.artistOptions);
        // this.props.selected.challenge.artistOptions[0] = [ {} hide: true ];
        this.props.selected.challenge.artistOptions[0] = { ...this.props.selected.challenge.artistOptions[0], hide: true };
        console.log('after options array: ', this.props.selected.challenge.artistOptions);

    }
    // switch() {
    //     this.setState({
    //         state0: !this.state.state0
    //     });
    // }
    render() {
        // get list from props
        // const optionList = this.props.selected.challenge.artistOptions.map((option, i) => {
        //     // function that renders each option
        //     return (
        //         <Button key={i} onPress={() => { this.onPressOption(option); }}>
        //             {option.name}
        //         </Button>
        //     );
        // });
                // <Button style={{ flex: 0 }} onPress={this.playChallengeBabySound.bind(this)}>
                //     play babysound
                // </Button>
                    // {optionList}
                // <Button onPress={this.switch()}>switch</Button>
                console.log('props: ', this.props.selected);
        return (
            <View style={styles.container}>
                <View style={styles.babyContainer}>
                    <Babyface onPress={this.playChallengeBabySound.bind(this)} />
                </View>
                <View style={styles.optionsContainer}>

                    <Button onPress={() => { this.props.removeWrongOption(this.props.selected.challenge); }}>
                        Remove wrong
                    </Button>

                    {this.props.selected.challenge.artistOptions[0].hide ? (
                        <Button>
                            -
                        </Button>
                    ) : (
                        <Button onPress={() => { this.onPressOption(this.props.selected.challenge.artistOptions[0]); }}>
                            {this.props.selected.challenge.artistOptions[0].name}
                        </Button>
                    )}

                    {this.state.option1 ? (
                        <Button onPress={() => { this.onPressOption(this.props.selected.challenge.artistOptions[1]); }}>
                            {this.props.selected.challenge.artistOptions[1].name}
                        </Button>
                    ) : (
                        <Button>
                            -
                        </Button>
                    )}

                    <Button onPress={() => { this.onPressOption(this.props.selected.challenge.artistOptions[2]); }}>
                        {this.props.selected.challenge.artistOptions[2].name}
                    </Button>
                    
                    <Button onPress={() => { this.onPressOption(this.props.selected.challenge.artistOptions[3]); }}>
                        {this.props.selected.challenge.artistOptions[3].name}
                    </Button>
                    
                    <Button onPress={() => { this.onPressOption(this.props.selected.challenge.artistOptions[4]); }}>
                        {this.props.selected.challenge.artistOptions[4].name}
                    </Button>
              
                </View>       
            </View>       
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    babyContainer: {
        flex: 1,
    },
    optionsContainer: {
        flex: 1,
    }
};

const mapStateToProps = state => {
    // console.log('artist mapstatetoprops: ', state);
    return { 
        // currentChallenge: state.currentChallenge,
        selected: state.selected 
    };
};

export default connect(mapStateToProps, { fetchGamesounds, fetchChallengeShortSound, fetchChallengeLongSound, removeWrongOption })(Artist);


// <Button onPress={() => { this.onPressOption(this.props.selected.challenge.artistOptions[4]); }}>
//                         {this.props.selected.challenge.artistOptions[4].name}
//                     </Button>
