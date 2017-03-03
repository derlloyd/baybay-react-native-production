import React from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Player } from 'react-native-audio-toolkit';
import { connect } from 'react-redux';
import { Header, Button, ButtonOption, Babyface } from '../components';
import Config from '../Config';
import { removeWrongOption } from '../actions';

class Song extends React.Component {

    componentWillMount() {
        // LayoutAnimation.spring();
    }
    clickBaby() {
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
    
    clickOption(option) {
        // stop sound if currently playing
        if (this.shortSound) {
            this.shortSound.destroy();
        }
        if (option.correct) {
            // option contains correct key
            Actions.correct();
        } else {
            // no correct key, wrong option
            Actions.wrong();
        }
    }

    playSuccessSound() {
        // get random songname
        const randomIndex = Math.floor(Math.random() * this.props.gamesounds[1].urls.length);
        
        const songName = this.props.gamesounds[1].urls[randomIndex].url;
        
        const songNameEncoded = songName.replace(/ /g, '%20');

        new Player('file://' + Config.localGamesounds + songNameEncoded).play();
    }

    render() {
        // get list of options from props
        const optionList = this.props.selected.songOptions.map((option, i) => {
            // function that renders each option
            if (option.hide) {
                // inactive button
                return (
                    <Button key={i}>
                        -
                    </Button>
                );
            }
            // standard option button
            return (
                <ButtonOption key={i} onPress={() => { this.clickOption(option); }}>
                    {option.name}
                </ButtonOption>
            );
        });

        return (
            <View style={styles.screenContainer}>
                
                <Header 
                    onPressBack={() => { Actions.artist(); }} 
                    title="GUESS SONG" 
                    coins={this.props.coins}
                />
                
                <View style={styles.container}>
                    <View style={styles.babyContainer}>
                        <Babyface onPress={this.clickBaby.bind(this)} accessories={{ }} />
                    </View>
                    <View style={styles.optionsContainer}>
                        <Icon 
                            name="question-circle-o" 
                            onPress={() => { this.props.removeWrongOption(this.props.selected.songOptions, 'song'); }}
                            size={60} 
                            color="#900"
                        />
                        
                        {optionList}

                    </View>       
                </View>       
            </View>       
        );
    }
}

const styles = {
    screenContainer: {
        flex: 1,
    },
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

// makes state available as props
const mapStateToProps = state => {
    return { 
        selected: state.selected,
        coins: state.coins,  
        gamesounds: state.gamesounds,
    };
};

export default connect(mapStateToProps, { removeWrongOption })(Song);
