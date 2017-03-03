import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
// import styles from '../styles/SliderEntry.style';
import Config from '../Config';

class SliderEntry extends Component {

    // static propTypes = {
    //     title: PropTypes.string.isRequired,
    //     subtitle: PropTypes.string,
    //     illustration: PropTypes.string,
    // };
//  numberOfLines={6}
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
                      source={{ uri: illustration }}
                      style={styles.image}
                    />
                    <View style={styles.radiusMask} />
                </View>
                <View style={styles.textContainer}>
                    { uppercaseTitle }
                </View>
            </View>
        );
    }
}
                    // <Text style={styles.subtitle} numberOfLines={6}>{ subtitle }</Text>


const slideHeight = Math.round(Config.deviceHeight * 0.7);
const slideWidth = Math.round(Config.deviceWidth * 0.75);

// export const sliderWidth = viewportWidth;
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
        borderBottomWidth: 1,
        borderColor: Config.colorAccent900,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: Config.colorAccent500,
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
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: Config.fontMain,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 6,
        // color: colors.gray,
        fontFamily: Config.fontMain,
        fontSize: 12,
        fontStyle: 'italic'
    },
});

export { SliderEntry, itemWidth };


// console.log('dimensionex ', Config.deviceWidth, Config.deviceHeight);
// // const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
// const viewportWidth = Config.deviceWidth;  // get from Config
// const viewportHeight = Config.deviceHeight; // get from Config

// const slideHeight = viewportHeight * 1;
// const slideWidth = viewportWidth * 1;

// // const sliderWidth = viewportWidth;
// const itemHorizontalMargin = viewportWidth * 0.02;      // Math.round((0.02 * viewportWidth))
// const itemWidth = slideWidth + itemHorizontalMargin * 2;

// const entryBorderRadius = 15;

// const stylesss = StyleSheet.create({
//     slideInnerContainer: {
//         width: itemWidth,
//         height: slideHeight,
//         paddingHorizontal: itemHorizontalMargin,
//         paddingBottom: 18 // needed for shadow
//     },
//     imageContainer: {
//         flex: 1,
//         backgroundColor: 'white',
//         borderTopLeftRadius: entryBorderRadius,
//         borderTopRightRadius: entryBorderRadius
//     },
//     image: {
//         ...StyleSheet.absoluteFillObject,
//         resizeMode: 'cover',
//         // borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
//         borderRadius: entryBorderRadius,
//         borderTopLeftRadius: entryBorderRadius,
//         borderTopRightRadius: entryBorderRadius
//     },
//     // image's border radius is buggy on ios; let's hack it!
//     radiusMask: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: entryBorderRadius,
//         backgroundColor: 'white'
//     },
//     textContainer: {
//         justifyContent: 'center',
//         paddingTop: 20 - entryBorderRadius,
//         paddingBottom: 20,
//         paddingHorizontal: 16,
//         backgroundColor: 'white',
//         borderBottomLeftRadius: entryBorderRadius,
//         borderBottomRightRadius: entryBorderRadius
//     },
//     title: {
//         // color: colors.black,
//         fontSize: 13,
//         fontWeight: 'bold',
//         letterSpacing: 0.5
//     },
//     subtitle: {
//         marginTop: 6,
//         // color: colors.gray,
//         fontSize: 12,
//         fontStyle: 'italic'
//     },
// });

// render() {
//         const { title, subtitle, illustration, even } = this.props;

//         const uppercaseTitle = title ? (
//             <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{ title.toUpperCase() }</Text>
//         ) : false;

//         return (
//             <TouchableOpacity
//               activeOpacity={0.7}
//               style={styles.slideInnerContainer}
//             //   onPress={() => { alert(`You've clicked '${title}'`); }}
//             >
//                 <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
//                     <Image
//                       source={{ uri: illustration }}
//                       style={styles.image}
//                     />
//                     <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
//                 </View>
//                 <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
//                     { uppercaseTitle }
//                     <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>{ subtitle }</Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     }
