import React from 'react';
import {
  // StyleSheet,
  Text,
  View,
  // Platform,
  // TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { AdMobInterstitial } from 'react-native-admob';

// AdMobInterstitial.setAdUnitID('ca-app-pub-6283261521073320/9700118297');
// AdMobInterstitial.setTestDeviceID('EMULATOR');

class AdMob extends React.Component {

  componentDidMount() {
    // AdMobInterstitial.requestAd(AdMobInterstitial.showAd);

    // AdMobInterstitial.addEventListener('interstitialDidClose',
    //   () => {
    //     console.log('interstitialDidClose');
    //     // AdMobInterstitial.requestAd((error) => error && console.log(error));
    //     // Actions.pop();
    //     // this.popBack();
    //   }
    // );

    // AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
    //   () => {
    //     console.log('interstitialWillLeaveApplication');
    //     // AdMobInterstitial.requestAd((error) => error && console.log(error));
    //     // this.popBack();
    //   }
    // );
    
    // AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
    //   () => {
    //     console.log('interstitialDidFailToLoad');
    //     // this.popBack();
    //   }
    // );
  }
  popBack() {
        Actions.pop();
  }
  render() {
    return (
        <View>
            <Text onPress={() => this.popBack()}>ok11111111</Text>
            <Text onPress={() => this.popBack()}>ok11111111</Text>
            <Text onPress={() => this.popBack()}>ok11111111</Text>
            <Text onPress={() => this.popBack()}>ok11111111</Text>
            <Text onPress={() => this.popBack()}>ok11111111</Text>
        </View>
    );
  }

}

export default AdMob;



/*

// Name: afterCorrectOrWrong
// Format: Interstitial
// ID: ca-app-pub-6283261521073320/9700118297

// google's sample unit id ca-app-pub-3940256099942544/2934735716
	"$(OTHER_LDFLAGS)", 

import React from 'react';
// import firebase from 'firebase';
import { 
  AdMobInterstitial, 
} from 'react-native-admob';
import { View, Text } from 'react-native';

// const AdMob = require('NativeModules').AdMobManager;


class Admob extends React.Component {
    componentDidMount() {
    // AdMobInterstitial.setTestDeviceID('EMULATOR');
    // AdMobInterstitial.setAdUnitID('ca-app-pub-6283261521073320/9700118297');
  }
  componentWillUnmount() {
    // AdMobInterstitial.removeAllListeners();
  }
  showInterstital() {
    // AdMobInterstitial.showAd((error) => error && console.log(error));
  }
    render() {
        // for loading Interstitial Ad
        // AdMob.loadInterstitial('ca-app-pub-6283261521073320/9700118297');

        // for showing Interstitial Ad
        // AdMob.showInterstitial();

        // // Display an interstitial
        AdMobInterstitial.setAdUnitID('ca-app-pub-6283261521073320/9700118297');
        AdMobInterstitial.setTestDeviceID('EMULATOR');
        // AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
        // AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
        AdMobInterstitial.showAd((error)=>{if(error) Alert.alert(error)});
        return (
            <View><Text>ok</Text></View>
        );
    }
}

const styles = {
    containerStyle: {
        marginTop: 5,
        // borderWidth: 1,
        // backgroundColor: 'red',
        // borderColor: 'red',
        // height: Config.bannerHeight,
    }
};

export default Admob;
*/

/*    
  componentDidMount() {
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    AdMobInterstitial.setAdUnitID('ca-app-pub-6283261521073320/9700118297');

    AdMobInterstitial.addEventListener('rewardedVideoDidRewardUser',
      (type, amount) => console.log('rewardedVideoDidRewardUser', type, amount)
    );
    AdMobInterstitial.addEventListener('rewardedVideoDidLoad',
      () => console.log('rewardedVideoDidLoad')
    );
    AdMobInterstitial.addEventListener('rewardedVideoDidFailToLoad',
      (error) => console.log('rewardedVideoDidFailToLoad', error)
    );
    AdMobInterstitial.addEventListener('rewardedVideoDidOpen',
      () => console.log('rewardedVideoDidOpen')
    );
    AdMobInterstitial.addEventListener('rewardedVideoDidClose',
      () => {
        console.log('rewardedVideoDidClose');
        AdMobInterstitial.requestAd((error) => error && console.log(error));
      }
    );
    AdMobInterstitial.addEventListener('rewardedVideoWillLeaveApplication',
      () => console.log('rewardedVideoWillLeaveApplication')
    );

    AdMobInterstitial.requestAd((error) => error && console.log(error));
  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  showRewarded() {
    AdMobInterstitial.showAd((error) => error && console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TouchableHighlight>
            <Text onPress={this.showRewarded} style={styles.button}>
              Show Rewarded Video and preload next
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
*/

   
// const styles = StyleSheet.create({
//   container: {
//     marginTop: (Platform.OS === 'ios') ? 30 : 10,
//     flex: 1,
//     alignItems: 'center',
//   },
//   button: {
//     color: '#333333',
//     marginBottom: 15,
//   },
// });
