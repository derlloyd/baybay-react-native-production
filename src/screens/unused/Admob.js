/*import React, { Component } from 'react';
import {
//   AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { AdMobInterstitial, AdMobBanner, PublisherBanner } from 'react-native-admob';


class AdmobExample extends Component {

  constructor() {
    super();
    this.state = {
      bannerSize: 'smartBannerPortrait',
    };
    this.setBannerSize = this.setBannerSize.bind(this);
  }

  componentDidMount() {
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    AdMobInterstitial.setAdUnitId('ca-app-pub-6283261521073320/1099294691');

    AdMobInterstitial.addEventListener('interstitialDidLoad',
      () => console.log('interstitialDidLoad event'));
    AdMobInterstitial.addEventListener('interstitialDidClose',
      this.interstitialDidClose);
    AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
      () => console.log('interstitialDidFailToLoad event'));
    AdMobInterstitial.addEventListener('interstitialDidOpen',
      () => console.log('interstitialDidOpen event'));
    AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
      () => console.log('interstitalWillLeaveApplication event'));

    AdMobInterstitial.requestAd((error) => error && console.log(error));
  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  interstitialDidClose() {
    console.log('interstitialDidClose event');
    AdMobInterstitial.requestAd((error) => error && console.log(error));
  }

  showInterstital() {
    AdMobInterstitial.showAd((error) => error && console.log(error));
  }

  setBannerSize() {
    const { bannerSize } = this.state;
    this.setState({
      bannerSize: bannerSize === 'smartBannerPortrait' ?
        'mediumRectangle' : 'smartBannerPortrait',
    });
  }

  render() {
    const { bannerSize } = this.state;
    console.log(bannerSize);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TouchableHighlight>
            <Text onPress={this.showInterstital} style={styles.button}>
              Show interstital and preload next
            </Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text onPress={this.setBannerSize} style={styles.button}>
              Set banner size to {bannerSize === 'smartBannerPortrait' ?
                'mediumRectangle' : 'smartBannerPortrait'}
            </Text>
          </TouchableHighlight>
        </View>
        <AdMobBanner
          bannerSize={this.state.bannerSize}
          testDeviceID="EMULATOR"
          adUnitID="ca-app-pub-6283261521073320/1099294691"
        />
      </View>
    );
  }
}
        // <PublisherBanner
        //   bannerSize="fullBanner"
        //   adUnitID="ca-app-pub-6283261521073320/1099294691"
        //   testDeviceID="EMULATOR"
        //   didFailToReceiveAdWithError={this.bannerError}
        //   // admobDispatchAppEvent={this.adMobEvent} 
        // />

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 30 : 10,
    flex: 1,
    alignItems: 'center',
  },
  button: {
    color: '#333333',
    marginBottom: 15,
  },
});

export default AdmobExample;*/
