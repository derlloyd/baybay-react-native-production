import { StyleSheet, Platform } from 'react-native';
// import { colors } from './index.style';
import Config from '../../../Config';

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
// console.log('in stylesheet ', viewportWidth, viewportHeight);
// const viewportWidth = Config.deviceWidth;
// const viewportHeight = Config.deviceHeight;
// function wp(percentage) {
//     const value = (percentage * viewportWidth) / 100;
//     return Math.round(value);
// }

const slideHeight = Math.round(Config.deviceHeight * 0.8);
const slideWidth = Math.round(Config.deviceWidth * 0.75);
// Math.round(viewportWidth * 0.75)

// export const sliderWidth = viewportWidth;
const itemHorizontalMargin = Math.round(Config.deviceWidth * 0.02);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // imageContainerEven: {
    //     backgroundColor: colors.black
    // },
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
        backgroundColor: 'white'
    },
    // radiusMaskEven: {
    //     backgroundColor: colors.black
    // },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    // textContainerEven: {
    //     backgroundColor: colors.black
    // },
    title: {
        // color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    // titleEven: {
    //     color: 'white'
    // },
    subtitle: {
        marginTop: 6,
        // color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    // subtitleEven: {
    //     color: 'rgba(255, 255, 255, 0.7)'
    // }
});
