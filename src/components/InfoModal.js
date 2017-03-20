import React from 'react';
import { View, Modal, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';

import { SliderEntry, itemWidth } from './';
import Config from '../Config';
import Strings from '../Strings';

const slides = [
    {
        title: `${Strings.instructionsLine1}

${Strings.instructionsLine3}`,
        subtitle: '',
        illustration: require('../assets/images/info/1.png')
    },
    {
        title: Strings.instructionsLine4,
        subtitle: '',
        illustration: require('../assets/images/info/4.png')
    },
    {
        title: Strings.instructionsLine5,
        subtitle: '',
        illustration: require('../assets/images/info/5.png')
    },
    {
        title: Strings.instructionsLine6,
        subtitle: '',
        illustration: require('../assets/images/info/6.png')
    },
    {
        title: Strings.instructionsLine7,
        subtitle: '',
        illustration: require('../assets/images/info/7.png')
    },
    {
        title: Strings.instructionsLine8,
        subtitle: '',
        illustration: require('../assets/images/info/8.png')
    },
    {
        title: `${Strings.instructionsLine9}

${Strings.instructionsLine10}`,
        subtitle: '',
        illustration: Platform.OS === 'ios' ? require('../assets/images/info/10ios.png') : require('../assets/images/info/10.png')
    },
    {
        title: Strings.instructionsLine11,
        subtitle: '',
        illustration: Platform.OS === 'ios' ? require('../assets/images/info/11ios.png') : require('../assets/images/info/11.png')
    },
    {
        title: `${Strings.fullyLicensed}

${Strings.haveFun}

${Strings.InfoEmail}`,
        subtitle: '',
        illustration: require('../assets/images/info/end.png')
    }
];

class InfoModal extends React.Component {

    renderSlides(entries) {
        return entries.map((entry, i) => {
            return (
                <SliderEntry
                    key={i}
                    {...entry}
                />
            );
        });
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}   // bool, true visible, false hidden
                transparent
                animationType="fade"   // or "slide" or none
                onRequestClose={() => {}} // android requirement
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={this.props.onAccept}
                    >
                        <Image 
                            source={require('../assets/images/title.png')} 
                            style={styles.titleImage} 
                            resizeMode={Image.resizeMode.contain} 
                        />
                        <Icon 
                            name="times"
                            size={35} 
                            style={{ paddingLeft: 10 }}
                            color="white"
                        />
                   </TouchableOpacity>

                    <Carousel
                        sliderWidth={Config.deviceWidth}
                        itemWidth={itemWidth}
                        firstItem={0}
                        inactiveSlideScale={0.9}
                        // inactiveSlideOpacity={0.6}
                        enableMomentum={true}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContainer}
                        showsHorizontalScrollIndicator={false}
                        snapOnAndroid={true}
                        removeClippedSubviews={false}
                    >
                        { this.renderSlides(slides) }
                    </Carousel>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(10, 20, 50, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? Config.statusBarPadding * 2 : 20,
    },
    titleImage: {
        alignSelf: 'center',
        width: Config.deviceWidth / 2,
        height: (Config.deviceWidth / 2) / 3,  // approx ratio is width = height * 3
        marginBottom: 20,
    },
    slider: {
    },
    sliderContainer: {
    },
    backButton: {
        width: 60,
        height: (Config.deviceWidth / 2) / 3,
        marginLeft: 5,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        paddingTop: Platform.OS === 'ios' ? Config.statusBarPadding * 2 : 20,
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

export { InfoModal };
