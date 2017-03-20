import React from 'react';
import { View } from 'react-native';

// can pass multiple styles into an array, the one on the right overrides
const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }
};

export { CardSection };
