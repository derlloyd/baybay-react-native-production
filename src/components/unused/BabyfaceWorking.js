import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

// const happy = 'https://baybay.co/assets/images/babyface/happy-1000x1000.png';
// const happyClick = 'https://baybay.co/assets/images/babyface/happyclick-1000x1000.png';
// const cry = 'https://baybay.co/assets/images/babyface/cry-1000x1000.png';
// const cryClick = 'https://baybay.co/assets/images/babyface/cryclick-1000x1000.png';
const cry = require('../assets/images/babyfacecry.png');
const happy = require('../assets/images/face.png');
const greeneyes = require('../assets/images/babyfacegreeneyes.png');
const blueeyes = require('../assets/images/babyfaceblueeyes.png');
const aviator = require('../assets/images/sunglassesaviator.png');
const rainbow = require('../assets/images/sunglassesrainbow.png');
const headphones = require('../assets/images/phones.png');
const fedora = require('../assets/images/hat.png');

                // source={{ uri: happy }}  // format for getting images from remote uri
const Babyface = ({ 
    onPress, 
    isCrying,
    accessories,    // object containing key-value pairs of visible accessories
 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <View>
                <Image 
                    source={happy}
                    style={styles.imageStyle} 
                />
                <Image 
                    source={cry}
                    style={isCrying ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={greeneyes}
                    style={accessories.greeneyes ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={blueeyes}
                    style={accessories.blueeyes ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={aviator}
                    style={accessories.aviator ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={rainbow}
                    style={accessories.rainbow ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={headphones}
                    style={accessories.headphones ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={fedora}
                    style={accessories.fedora ? styles.overlay : styles.hidden} 
                />
            </View>
        </TouchableOpacity>
    );
};
            // <Image 
            //     source={{ uri: cry }}
            //     style={[styles.imageStyle, imageStyle]} 
            // />

const babyDimension = 250;  // pixels

const styles = {
    imageStyle: {
        alignSelf: 'center',
        // color: '#007aff',   // '#007aff'
        // fontSize: 16,
        // fontWeight: '500',
        width: babyDimension,
        height: babyDimension,
        // paddingTop: 10,
        // paddingBottom: 10,
        // borderWidth: 4,
        // borderColor: 'orange',
    },
    buttonStyle: {
        // flex: 0,    // expand to fill the space
        alignSelf: 'center',   // position self using flexbox rules
        // justifyContent: 'center',
        // backgroundColor: '#fff',
        // borderRadius: 5,     // rounded corners
        borderWidth: 1,
        borderColor: 'darkblue',
        // marginLeft: 5,
        // marginRight: 5,
        // minHeight: 50
    },
    overlay: {
        width: babyDimension,
        height: babyDimension,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    hidden: {
        width: 0,
        height: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,

    }
};

export { Babyface };

//                 <Image 
//                     source={rainbow}
//                     style={styles.overlay} 
//                 />
//                 <Image 
//                     source={headphones}
//                     style={styles.overlay} 
//                 />
//                 <Image 
//                     source={fedora}
//                     style={styles.overlay} 
//                 />