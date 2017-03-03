// define all scenes that can be visited by app

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
// import { View, Text, Platform, StyleSheet, Navigator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

import Welcome from './screens/Welcome';
import Categories from './screens/Categories';
import ChallengeGrid from './screens/ChallengeGrid';
import Artist from './screens/Artist';
import Song from './screens/Song';
import Wrong from './screens/Wrong';
import Correct from './screens/Correct';
// import Info from './screens/Info';
import Settings from './screens/Settings';
// import AdmobExample from './screens/Admob';
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
    // if no 'initial' tag, Router uses order of declaration
            // sceneStyle={{ paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight, flex: 1 }} 
            // titleStyle={{ color: 'white' }} 
            // navigationBarStyle={{ backgroundColor: Platform.OS === 'ios' ? 'blue' : 'darkblue' }}
                // <Scene 
                //     key="info" 
                //     component={Info} 
                //     // animation="fade"
                //     // title="Guess the ARTIST" 
                //     // onLeft={() => Actions.pop(1)} 
                // />
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
                    // title="" 
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
                    // <Scene key="tab1" title="Coins" icon={TabIcon}>
                    //     <Scene 
                    //         key="settings_coins" 
                    //         title="Coins" 
                    //         component={SettingsCoins} 
                    //     />
                    // </Scene>

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
