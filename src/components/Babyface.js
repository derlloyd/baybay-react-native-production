import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Config from '../Config';

const cry = require('../assets/images/babyfacecry.png');
const happy = require('../assets/images/face.png');

// Every accessory layer is present
// Its style determies if it is visible
// Style depends on is prop accessoryname: true was passed to Babyface

class Babyface extends React.Component {

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

        if (this.props.accessories) {
            // then if the baby is not crying
            // all of the accessory layers on top (array of objects in Config file)
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
        }

        return rendered;
    }
    render() {
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
        width: Config.babyfaceDimension,
        height: Config.babyfaceDimension,
    },
    buttonStyle: {
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
