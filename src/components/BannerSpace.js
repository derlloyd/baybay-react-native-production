import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob'; 

class BannerSpace extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <AdMobBanner
                    adUnitID='ca-app-pub-6283261521073320/1099294691'
                    testDeviceID="EMULATOR"
                    // bannerSize="smartBannerPortrait"
                    // didFailToReceiveAdWithError={(err) => console.log(err)}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        marginTop: 5,
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
