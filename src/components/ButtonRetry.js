import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from '../Config';

const ButtonRetry = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <View style={styles.containerStyle}>
                <Icon name="repeat" size={60} color="white" style={{ backgroundColor: 'transparent' }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        width: 180,
        backgroundColor: Config.colorPrimary700,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 70,
    },
};

export { ButtonRetry };
