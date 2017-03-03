import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonItunes = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <View style={styles.containerStyle}>
                <Icon name="apple" size={45} color="white" />
                <View style={styles.textBox}>
                    <Text style={styles.textStyle}>
                        Get it on
                    </Text>
                    <Text style={styles.itunesTextStyle}>
                        iTunes
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        // flex: 0,    // expand to fill the space
        // alignSelf: 'stretch',   // position self using flexbox rules
        width: 180,
        backgroundColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',     //close to native ios blue
        // marginLeft: 5,
        // marginRight: 5,
        // minHeight: 20
    },
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 70,
        // paddingLeft: 15,
    },
    textBox: {
        flexDirection: 'column',
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 15,
        // padding: 10,
        // paddingBottom: 10
    },
    itunesTextStyle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '500',
        paddingLeft: 15,
        // padding: 10,
        // paddingBottom: 10
    },
};

export { ButtonItunes };
