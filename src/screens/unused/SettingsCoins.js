import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../components';

class SettingsCoins extends React.Component {
    
    onPressClose() {
        Actions.pop();
    }

    onPressNext() {
        // back to Artist screen, but with new props
        Actions.pop({ popNum: 2 });
    }

    onPressBackToLevels() {
        Actions.pop({ popNum: 3 });
    }
    
    render() {
        return (
            <View>
                <Button onPress={this.onPressClose}>
                    CLOSE
                </Button>
                
                <Text>1 SETTINGS</Text>
                <Text>2 SETTINGS</Text>
                <Text>3 SETTINGS</Text>
                <Text>4 SETTINGS</Text>
                <Text>5 SETTINGS</Text>


            </View>       
        );
    }
}

export default SettingsCoins;
