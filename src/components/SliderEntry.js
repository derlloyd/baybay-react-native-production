import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Config from '../Config';

class SliderEntry extends Component {

    render() {
        const { title, illustration } = this.props;

        const uppercaseTitle = title ? (
            <Text style={styles.title}>{ title.toUpperCase() }</Text>
        ) : false;

        return (
            <View
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
            >
                <View style={styles.imageContainer}>
                    <Image
                      source={illustration}
                      style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    { uppercaseTitle }
                </View>
            </View>
        );
    }
}

const slideHeight = Math.round(Config.deviceHeight * 0.7);
const slideWidth = Math.round(Config.deviceWidth * 0.75);

const itemHorizontalMargin = Math.round(Config.deviceWidth * 0.02);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const styles = StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        backgroundColor: Config.colorPrimary200,
        borderBottomWidth: 4,
        borderColor: Config.colorAccent500,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: slideWidth,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: Config.colorPrimary,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
    },
    title: {
        color: 'white',
        fontFamily: Config.fontMain,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
});

export { SliderEntry, itemWidth };
