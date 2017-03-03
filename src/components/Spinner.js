import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Config from '../Config';

const Spinner = ({ size, style }) => {
    return (
        <View style={[styles.spinnerStyle, style]}>
            <ActivityIndicator size={size || 'large'} color={Config.colorAccent700} />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 2 }],
    }
};

export { Spinner };
