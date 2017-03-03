import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// import { itemWidth } from './Info/styles/SliderEntry.style';
import { SliderEntry, itemWidth } from '../components';
// import SliderEntry, { itemWidth } from './Info/components/SliderEntry';
// import styles from './Info/styles/index.style';
// import { ENTRIES1 } from './Info/entries';
import Config from '../Config';

const slides = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    }
];

export default class Info extends React.Component {

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
            <View style={styles.container}>
                <Text style={styles.title}>Example 1</Text>
                <Text style={styles.subtitle}>Momentum | Scale | Opacity</Text>

                <Carousel
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    firstItem={1}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.6}
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
        );
    }
}

const sliderWidth = Config.deviceWidth;
// const itemWidth = Config

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    },
    title: {
        marginTop: 15,
        backgroundColor: 'transparent',
        color: 'white',
        // color: 'rgba(255, 255, 255, 0.9)',
        // opacity: 0.9,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: 'white',
        // color: 'rgba(255, 255, 255, 0.75)',
        opacity: 0.9,
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        // marginBottom: 30
    },
    sliderContainer: {
    }
});
