// define all scenes that can be visited by app

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Text } from 'react-native';

import Welcome from './screens/Welcome';
import Categories from './screens/Categories';
import ChallengeGrid from './screens/ChallengeGrid';
import Artist from './screens/Artist';
import Song from './screens/Song';
import Wrong from './screens/Wrong';
import Correct from './screens/Correct';
import Settings from './screens/Settings';
import Config from './Config';

// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={selected ? styles.selected : styles.default}>{title}</Text>
  );
};

const styles = {
    default: {
        color: 'black',
    },
    selected: {
        color: 'white',
        fontWeight: 'bold',
    }
};

const RouterComponent = () => {
    return (
        <Router 
            sceneStyle={{ backgroundColor: 'white' }} 
            hideNavBar
        >

            <Scene key="main">
                <Scene 
                    key="welcome" 
                    component={Welcome} 
                    hideNavBar 
                    initial 
                />

                <Scene
                    key="categories" 
                    component={Categories} 
                    type="reset"
                    // title="Select Category"
                    // leftTitle="Home"
                    // onLeft={() => Actions.welcome()} 
                    // rightTitle="Store"
                    // onRight={() => Actions.setings_tabs()}
                />

                <Scene 
                    key="challenges" 
                    type="reset"
                    component={ChallengeGrid} 
                    // title="Select a challenge" 
                    // leftTitle="Categories"
                    // onLeft={() => Actions.categories()} 
                    // rightTitle="Store"
                    // onRight={() => Actions.setings_tabs()}
                />

                <Scene 
                    key="artist" 
                    component={Artist} 
                    // animation="fade"
                    // title="Guess the ARTIST" 
                    // onLeft={() => Actions.pop(1)} 
                />

                <Scene 
                    key="song" 
                    component={Song} 
                    animation="fade"
                    // title="Guess the SONG" 
                    // onLeft={() => Actions.pop(2)} 
                />
            
                <Scene 
                    key="wrong" 
                    component={Wrong} 
                    animation="fade"
                    // direction='vertical' 
                />
                
                <Scene 
                    key="correct" 
                    component={Correct} 
                    animation="fade"
                    // direction='vertical' 
                />

            </Scene>
            
                <Scene 
                    key="settings_tabs" 
                    // tabs 
                    // direction='vertical' 
                    tabBarStyle={{ backgroundColor: Config.colorPrimary300 }} 
                >

                    <Scene key="tab3" title="Settings" icon={TabIcon}>
                        <Scene 
                            key="settings_accessories" 
                            title="Settings" 
                            component={Settings} 
                        />
                    </Scene>
                </Scene>
        
        </Router>
    );
};

export default RouterComponent;
