import React from 'react';
import { TextInput, View } from 'react-native';
// import { FontAwesome } from '@exponent/vector-icons';
// must supply the name of the FontAwesome icon as a prop
// https://exponentjs.github.io/vector-icons/
import Icon from 'react-native-vector-icons/FontAwesome';

const InputIcon = ({ icon, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, iconStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
        <Icon name={icon} size={20} style={iconStyle} />
            <TextInput
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText} 
            />
        </View>
    );
};

const styles = {
    iconStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1, // child of container, 1/7 of space for icon
        justifyContent: 'center',
        // alignItems: 'flex-start',
        // borderRadius: 2
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 20, // space between lines of Text
        flex: 6 // child of container, 6/7 of space for text input
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'    // centers vertically
    }
};

export { InputIcon };
