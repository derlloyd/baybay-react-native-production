// define all scenes that can be visited by app

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { View, Text, Platform, StyleSheet, Navigator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Welcome from './screens/Welcome';
import Categories from './screens/Categories';
import ChallengeGrid from './screens/ChallengeGrid';
import Artist from './screens/Artist';
import Song from './screens/Song';
import Wrong from './screens/Wrong';
import Correct from './screens/Correct';
import SettingsCoins from './screens/SettingsCoins';
import SettingsLevels from './screens/SettingsLevels';
import SettingsAccessories from './screens/SettingsAccessories';

// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};

const RouterComponent = () => {
    // if no 'initial' tag, Router uses order of declaration
            // sceneStyle={{ paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight, flex: 1 }} 
            // titleStyle={{ color: 'white' }} 
            // navigationBarStyle={{ backgroundColor: Platform.OS === 'ios' ? 'blue' : 'darkblue' }}
    return (
        <Router 
            hideNavBar
            sceneStyle={{ paddingTop: 0, flex: 1 }} 
        >

            <Scene key="main">
                <Scene 
                    key="welcome" 
                    component={Welcome} 
                    hideNavBar 
                    title="" 
                    initial 
                />

                <Scene
                    key="categories" 
                    hideNavBar 
                    component={Categories} 
                    title="Select Category"
                    type="reset"
                    hideNavBar={false}
                    leftTitle="Home"
                    onLeft={() => Actions.welcome()} 
                    rightTitle="Store"
                    onRight={() => Actions.setings_tabs()}
                />

                <Scene 
                    key="challenges" 
                    title="Select a challenge" 
                    type="reset"
                    component={ChallengeGrid} 
                    leftTitle="Categories"
                    onLeft={() => Actions.categories()} 
                    rightTitle="Store"
                    onRight={() => Actions.setings_tabs()}
                />

                <Scene 
                    key="artist" 
                    title="Guess the ARTIST" 
                    component={Artist} 
                    // onLeft={() => Actions.pop(1)} 
                />

                <Scene 
                    key="song" 
                    title="Guess the SONG" 
                    component={Song} 
                    // onLeft={() => Actions.pop(2)} 
                />
            
                <Scene 
                    key="wrong" 
                    title="Wrong answer" 
                    direction='vertical' 
                    component={Wrong} 
                />
                
                <Scene 
                    key="correct" 
                    title="Correct answer" 
                    direction='vertical' 
                    component={Correct} 
                />
            </Scene>
            
                <Scene 
                    key="setings_tabs" 
                    tabs 
                    direction='vertical' 
                    tabBarStyle={{ backgroundColor: 'orange' }} 
                >
                    <Scene key="tab1" title="Coins" icon={TabIcon}>
                        <Scene 
                            key="settings_coins" 
                            title="Coins" 
                            component={SettingsCoins} 
                        />
                    </Scene>

                    <Scene key="tab2" title="Levels" icon={TabIcon}>
                        <Scene 
                            key="settings_levels" 
                            title="Levels" 
                            component={SettingsLevels} 
                        />
                    </Scene>

                    <Scene key="tab3" title="Accessories" icon={TabIcon}>
                        <Scene 
                            key="settings_accessories" 
                            title="Accessories" 
                            component={SettingsAccessories} 
                        />
                    </Scene>
                </Scene>

        </Router>
    );
};

export default RouterComponent;

// const styles = StyleSheet.create({
//   navBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'red', // changing navbar color
//   },
//   navTitle: {
//     color: 'white', // changing navbar title color
//   },
//   routerScene: {
//     paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight, // some navbar padding to avoid content overlap
//   },
// })

            // </Scene>
            
            // <Scene key="settings">

// separate scenes with nested components, back button shows only within scenes
// <Scene key="wrong">
//                 <Scene key="wrongscene" hideNavBar title="Wrong answer" component={Wrong} />
//             </Scene>
            
//             <Scene key="correct">
//                 <Scene key="correctscene" hideNavBar title="Correct answer" component={Correct} />
//             </Scene>
            
//             <Scene key="settings">
//                 <Scene key="settingsscene" hideNavBar title="Settings" component={Settings} />
//             </Scene>
