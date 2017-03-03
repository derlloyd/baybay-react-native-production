import React from 'react';
import { View } from 'react-native';
// import { 
//   AdMobBanner, 
// //   AdMobInterstitial, 
// //   PublisherBanner,
// //   AdMobRewarded
// } from 'react-native-admob';

// import Config from '../Config';

// can pass multiple styles into an array, the one on the right overrides
// https://github.com/sbugert/react-native-admob


class BannerSpace extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle} />
        );
    }
}
                // <AdMobBanner
                //     bannerSize="fullBanner"
                //     adUnitID="ca-app-pub-6283261521073320/1099294691"
                //     testDeviceID="EMULATOR"
                //     didFailToReceiveAdWithError={this.bannerError} 
                // />

const styles = {
    containerStyle: {
        marginTop: 5,
        // borderWidth: 1,
        // backgroundColor: 'red',
        // borderColor: 'red',
        // height: Config.bannerHeight,
    }
};

export { BannerSpace };

// Prop value	Description	Size
// banner	Standard Banner for Phones and Tablets	320x50
// largeBanner	Large Banner for Phones and Tablets	320x100
// mediumRectangle	IAB Medium Rectangle for Phones and Tablets	300x250
// fullBanner	IAB Full-Size Banner for Tablet	468x60
// leaderboard	IAB Leaderboard for Tablets	728x90
// smartBannerPortrait	Smart Banner for Phones and Tablets (default)	Screen width x 32
// smartBannerLandscape	Smart Banner for Phones and Tablets	Screen width x 32
