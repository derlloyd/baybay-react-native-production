import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Config from '../Config';

const HelpButton = ({ onPress }) => {
    return (
        <Animatable.View 
            // ref="view" 
            // style={{ flex: 1 }}
            animation="pulse"
            easing="ease" 
            iterationCount="infinite"
        >
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text style={styles.text}>?</Text>
            </TouchableOpacity>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 5,
        width: Config.deviceWidth / 6, 
        height: Config.deviceWidth / 6, 
        borderWidth: 1, 
        borderColor: Config.colorAccent900, 
        justifyContent: 'center', 
        backgroundColor: Config.colorAccent700, 
        borderRadius: Config.deviceWidth / 12,
    },
    text: {
        fontSize: 50, 
        fontFamily: Config.fontMain,
        // fontWeight: 'bold', 
        color: 'white', 
        textAlign: 'center', 
        backgroundColor: 'transparent',
    },
});

export { HelpButton };

        // <View style={[styles.style, style]}>
        //     <TouchableOpacity>
        //         <Icon 
        //             name="question-circle" 
        //             onPress={onPress}
        //             size={65} 
        //             style={styles.mainIconStyle}
        //             iconStyle={styles.iconStyle}
        //             color={Config.colorAccent700}
        //         />
        //     </TouchableOpacity>
        // </View>
