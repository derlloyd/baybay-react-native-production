import React from 'react';
import { View, Image } from 'react-native';

const Card = (props) => {
    // the url of the image was passed as a prop
    // this is the default image, if none supplied
    // const img = require('../assets/pop-music.jpg');

    // if (props.image) {
    //     // if the image was supplied, load it
    //     // wire this up with actual image from props.image
    //     img = { uri: 'https://facebook.github.io/react/img/logo_og.png' };
    // } else {
    //     const img = require('../assets/pop-music.jpg');
    // }

            // <View style={styles.imageView}>
            //     <Image
            //         style={styles.image}
            //         source={img}
            //     />
            // </View>
    return (
        <View style={[styles.containerStyle, props.style]}>
            <View style={styles.text}>
                {props.children}
            </View>
        </View>
    );
};

// if we pass one comp to another, it will show in the parent as props.children

const styles = {
    containerStyle: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderWidth: 1, // 1 pixel width border
        borderRadius: 5, // rounded corers
        // borderColor: '#ddd',    // light grey
        // borderBottomWidth: 3,   // for the bottom, no border
        // shadowColor: '#000',  // gives definition
        // shadowOffset: { width: 0, height: 2 }, //none on left and right, height yes
        // shadowOpacity: 0.1, // from 0 to 1
        // shadowRadius: 2,    // rounds corners, like border
        // elevation: 10,
        // padding: 5,
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
