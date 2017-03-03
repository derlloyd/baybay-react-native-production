import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';

// const happy = 'https://baybay.co/assets/images/babyface/happy-1000x1000.png';
// const happyClick = 'https://baybay.co/assets/images/babyface/happyclick-1000x1000.png';
// const cry = 'https://baybay.co/assets/images/babyface/cry-1000x1000.png';
// const cryClick = 'https://baybay.co/assets/images/babyface/cryclick-1000x1000.png';
const cry = require('../assets/images/babyfacecry.png');
const happy = require('../assets/images/face.png');

// const greeneyes = require('../assets/images/babyfacegreeneyes.png');
// const blueeyes = require('../assets/images/babyfaceblueeyes.png');
// const aviator = require('../assets/images/sunglassesaviator.png');
// const rainbow = require('../assets/images/sunglassesrainbow.png');
// const headphones = require('../assets/images/phones.png');
// const fedora = require('../assets/images/hat.png');

// const accessories = [
//     { id: 'ac001', name: 'greeneyes', cost: 1000, image: require('../assets/images/babyfacegreeneyes.png') },
//     { id: 'ac002', name: 'blueeyes', cost: 1000, image: require('../assets/images/babyfaceblueeyes.png') },
//     { id: 'ac003', name: 'aviator', cost: 1000, image: require('../assets/images/sunglassesaviator.png') },
//     { id: 'ac004', name: 'rainbow', cost: 1000, image: require('../assets/images/sunglassesrainbow.png') },
//     { id: 'ac005', name: 'headphones', cost: 1000, image: require('../assets/images/phones.png') },
//     { id: 'ac006', name: 'fedora', cost: 1000, image: require('../assets/images/hat.png') },
// ];
const accessories = [
    { name: 'greeneyes', cost: 1000, image: require('../assets/images/babyfacegreeneyes.png') },
    { name: 'blueeyes', cost: 1000, image: require('../assets/images/babyfaceblueeyes.png') },
    { name: 'aviator', cost: 1000, image: require('../assets/images/sunglassesaviator.png') },
    { name: 'rainbow', cost: 1000, image: require('../assets/images/sunglassesrainbow.png') },
    { name: 'headphones', cost: 1000, image: require('../assets/images/phones.png') },
    { name: 'fedora', cost: 1000, image: require('../assets/images/hat.png') },
];

// function formula1() {
//     return require('../assets/images/babyfacegreeneyes.png');
// }
// const accessories = [
//     { id: 'ac001', name: 'greeneyes', cost: 1000, image: 'babyfacegreeneyes.png', formula: () => { require('../assets/images/babyfacegreeneyes.png'); } },
//     { id: 'ac002', name: 'blueeyes', cost: 1000, image: 'babyfaceblueeyes.png', formula: () => { require('../assets/images/babyfaceblueeyes.png'); } },
//     { id: 'ac003', name: 'aviator', cost: 1000, image: 'sunglassesaviator.png', formula: () => { require('../assets/images/sunglassesaviator.png'); } },
//     { id: 'ac004', name: 'rainbow', cost: 1000, image: 'sunglassesrainbow.png', formula: () => { require('../assets/images/sunglassesrainbow.png'); } },
//     { id: 'ac005', name: 'headphones', cost: 1000, image: 'phones.png', formula: () => { require('../assets/images/phones.png'); } },
//     { id: 'ac006', name: 'fedora', cost: 1000, image: 'hat.png', formula: () => { require('../assets/images/hat.png'); } },
// ];

// Every accessory layer is present
// Its style determies if it is visible
// Style depends on is prop accessoryname: true was passed to Babyface

                // source={{ uri: happy }}  // format for getting images from remote uri
class Babyface extends React.Component {
    componentWillMount() {
        // for each accessory, check if it is loaded locally in assets

        // then check if it is in localstorage

        // if not, get it from remote storage

        // if yes, render each one

    }
    // renderAccessories() {
    //     const rendered = accessories.map((accessory, i) => {
    //         return (
    //             <Text key={i}>{accessory.name}</Text>
    //         );
    //     });

    //     return rendered;
    // }
    
    // renderAccessoriesOK2() {
    //     const rendered = [(
    //         <Text>START</Text>
    //         )];
    //     accessories.forEach((accessory, i) => {
    //         rendered.push(
    //             <Text key={i}>{accessory.name}</Text>
    //         );
    //     });

    //     return rendered;
    // }

    renderAccessories2() {
        // main happy babyface is first layer
        const rendered = [(
            <Image
                key={'x1'} 
                source={happy}
                style={styles.imageStyle} 
            />
        )];
        // then crying babyface layer
        rendered.push(
            <Image 
                key={'x2'}
                source={cry}
                style={this.props.isCrying ? styles.overlay : styles.hidden} 
            />
        );
        // then all of the accessory layers on top
        accessories.forEach((accessory, i) => {
            const propIsTrue = 'this.props.accessories.greeneyes';
            // const propIsTrue = 'this.props.accessories.' + accessory.name;
            // const path = '../assets/images/babyfaceblueeyes.png';
            // const src = require(accessory.image);
            console.log('istrue: ', propIsTrue);
            rendered.push(
                <Image
                    key={i} 
                    source={accessory.image}
                    style={this.props.accessories[accessory.name] ? styles.overlay : styles.hidden}
                />
            );
        });
        console.log(rendered);
        return rendered;
    }

    renderAccessoriesOK() {
        return (
            <View>
                <Image 
                    source={happy}
                    style={styles.imageStyle} 
                />
                <Image 
                    source={cry}
                    style={this.props.isCrying ? styles.overlay : styles.hidden} 
                />


                <Image 
                    source={require('../assets/images/babyfacegreeneyes.png')}
                    style={this.props.accessories.greeneyes ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={require('../assets/images/babyfaceblueeyes.png')}
                    style={this.props.accessories.blueeyes ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={require('../assets/images/sunglassesaviator.png')}
                    style={this.props.accessories.aviator ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={require('../assets/images/sunglassesrainbow.png')}
                    style={this.props.accessories.rainbow ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={require('../assets/images/phones.png')}
                    style={this.props.accessories.headphones ? styles.overlay : styles.hidden} 
                />
                <Image 
                    source={require('../assets/images/hat.png')}
                    style={this.props.accessories.fedora ? styles.overlay : styles.hidden} 
                />
            </View>
        );
    }
    render() {
        console.log(this.props);
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.buttonStyle}>
                <View>
                    
                    
                    {this.renderAccessories2()}

                </View>
            </TouchableOpacity>
        );
    }
}

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
