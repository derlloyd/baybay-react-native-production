import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BackButton = ({ onPress }) => {
    return (
        <View style={styles.backButton}>
            <TouchableOpacity onPress={onPress}>
                <Icon 
                    name="chevron-left"
                    size={30} 
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    backButton: {
        // flex: 1,
        width: 60,
        marginLeft: 5,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // borderWidth: 1,
    }
};

export { BackButton };
