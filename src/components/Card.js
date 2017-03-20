import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            <View style={styles.text}>
                {props.children}
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderWidth: 1, // 1 pixel width border
        borderRadius: 5, // rounded corers
        marginLeft: 5,  // space between l and r
        marginRight: 5,
        marginTop: 10   // space between cards
    },
    image: {
        borderRadius: 5, // rounded corers
        height: 40,
        width: 40,
        margin: 3   // space around
    },
    imageView: {
        flex: 1
    },
    text: {
        flex: 6
    }
};

export { Card };
