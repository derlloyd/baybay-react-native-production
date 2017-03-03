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
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: Strings.instructionsLine4,
        subtitle: '',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: Strings.instructionsLine5,
        subtitle: '',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: Strings.instructionsLine6,
        subtitle: '',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: Strings.instructionsLine7,
        subtitle: '',
        illustration: 'http://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: `${Strings.instructionsLine9}

${Strings.instructionsLine10}`,
        subtitle: '',
        illustration: 'http://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: `${Strings.fullyLicensed}

${Strings.haveFun}

${Strings.InfoEmail}`,
        subtitle: '',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
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
                            size={30} 
                            style={{ paddingLeft: 10 }}
                            color="white"
                        />
                   </TouchableOpacity>

                    <Carousel
                        sliderWidth={Config.deviceWidth}
                        itemWidth={itemWidth}
                        firstItem={1}
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
        // backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
        // marginBottom: 30
    },
    sliderContainer: {
        // borderColor: 'red',
        // borderWidth: 2,
    },
    backButton: {
        // flex: 1,
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
        // left: 300,
        // marginRight: 25,
        right: 0,
        top: 0,
        // bottom: 0,
    },
    // title: {
    //     marginTop: 30,
    //     backgroundColor: 'transparent',
    //     color: 'white',
    //     // color: 'rgba(255, 255, 255, 0.9)',
    //     // opacity: 0.9,
    //     fontSize: 22,
    //     fontWeight: 'bold',
    //     textAlign: 'center'
    // },
    // subtitle: {
    //     marginTop: 5,
    //     marginBottom: 15,
    //     backgroundColor: 'transparent',
    //     color: 'white',
    //     // color: 'rgba(255, 255, 255, 0.75)',
    //     opacity: 0.9,
    //     fontSize: 16,
    //     fontStyle: 'italic',
    //     textAlign: 'center'
    // },
});

export { InfoModal };
