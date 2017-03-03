import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// import { itemWidth } from './Info/styles/SliderEntry.style';
import SliderEntry, { itemWidth } from './Info/components/SliderEntry';
// import styles from './Info/styles/index.style';
import { ENTRIES1 } from './Info/entries';
import Config from '../Config';

export default class Info extends React.Component {

    getSlides(entries) {
        if (!entries) {
            return false;
        }

        return entries.map((entry, index) => {
            return (
                <SliderEntry
                  key={`carousel-entry-${index}`}
                //   even={(index + 1) % 2 === 0}
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

                    { this.getSlides(ENTRIES1) }

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
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
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

// export default Info;

                // </ScrollView>
    // get example2() {
    //     return (
    //         <Carousel
    //           sliderWidth={sliderWidth}
    //           itemWidth={itemWidth}
    //           inactiveSlideScale={1}
    //           inactiveSlideOpacity={1}
    //           enableMomentum={false}
    //           autoplay={true}
    //           autoplayDelay={500}
    //           autoplayInterval={2500}
    //           containerCustomStyle={styles.slider}
    //           contentContainerCustomStyle={styles.sliderContainer}
    //           showsHorizontalScrollIndicator={false}
    //           snapOnAndroid={true}
    //           removeClippedSubviews={false}
    //         >
    //               { this.getSlides(ENTRIES2) }
    //           </Carousel>
    //     );
    // }
                    // <Text style={styles.title}>Example 2</Text>
                    // <Text style={styles.subtitle}>Autoplay | No momentum</Text>
                    // { this.example2 }
