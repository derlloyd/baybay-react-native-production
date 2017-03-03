import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Config from '../Config';

const cry = require('../assets/images/babyfacecry.png');
const happy = require('../assets/images/face.png');

// Every accessory layer is present
// Its style determies if it is visible
// Style depends on is prop accessoryname: true was passed to Babyface

class Babyface extends React.Component {
    // componentWillMount() {
        // accessories now in Config, dont worry about this now

        // for each accessory, check if it is loaded locally in assets
        // then check if it is in localstorage
        // if not, get it from remote storage
        // if yes, render each one
    // }

    renderAccessories() {
        // this will create a string of JSX with all Images
        // main happy babyface is first layer
        const rendered = [(
            <Image
                key={'x1'} 
                source={happy}
                style={[styles.imageStyle, this.props.imageStyle]} 
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
        // then all of the accessory layers on top (array of objects in Config file)
            Config.accessories.forEach((accessory, i) => {
                const namePropIsTrue = this.props.accessories[accessory.name];
                rendered.push(
                    <Image
                        key={i} 
                        source={accessory.image}
                        style={namePropIsTrue ? [styles.overlay, this.props.overlay] : styles.hidden}
                    />
                );
            });

        return rendered;
    }
    onPressAction() {
        // perform passed onPress if there is one
        if (this.props.onPress) {
            this.props.onPress();
        }
        
        // default Animatable action
        let action = 'rubberBand';

        // if one is passed, use that one
        if (this.props.animated) {
            if (this.props.animated === 'none') {
                return;
            }
            action = this.props.animated;
        }

        // trigger animation
        this.refs.view[action](800);
    }
    render() {
        // <Animatable.Text animation="wobble" iterationCount={1} direction="alternate">
        // console.log('dome ', Config.babyfaceDimension);
                // <Animatable.View animation="rubberBand" iterationCount={3} ref="view">
        return (
            <TouchableWithoutFeedback onPress={() => this.onPressAction()} style={[styles.buttonStyle, this.props.buttonStyle]}>
                <Animatable.View ref="view">
                    
                    {this.renderAccessories()}

                </Animatable.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    imageStyle: {
        // alignSelf: 'center',
        // color: '#007aff',   // '#007aff'
        // fontSize: 16,
        // fontWeight: '500',
        width: Config.babyfaceDimension,
        height: Config.babyfaceDimension,
        // paddingTop: 10,
        // paddingBottom: 10,
        // borderWidth: 4,
        // borderColor: 'orange',
    },
    buttonStyle: {
        // flex: 0,    // expand to fill the space
        // alignSelf: 'center',   // position self using flexbox rules
        // justifyContent: 'center',
        // backgroundColor: '#fff',
        // borderRadius: 5,     // rounded corners
        // borderWidth: 5,
        // borderColor: 'red',
    },
    overlay: {
        width: Config.babyfaceDimension,
        height: Config.babyfaceDimension,
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
