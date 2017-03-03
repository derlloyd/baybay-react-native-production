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
        // borderBottomWidth: 1,
        // padding: 5, // spacing around
        // backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };
