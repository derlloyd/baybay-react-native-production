import React from 'react';
import { TextInput, View, Text } from 'react-native';

const InputNoLabel = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
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
// old label
// <Text style={labelStyle}>{label}</Text>

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23, // space between lines of Text
        flex: 1 // child of container, 2/3 of space for inputStyle
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1 // child of container, 1/3 of space for inputStyle
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { InputNoLabel };
