import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Coins } from './';
import Config from '../Config';

const SettingsHeader = ({ onPressBack, title, coins }) => {
    // const backChevron = (
    //     <View style={styles.backButton}>
    //         <TouchableOpacity onPress={onPressBack}>
    //             <Icon 
    //                 name="chevron-left"
    //                 size={30} 
    //                 color="white"
    //             />
    //         </TouchableOpacity>
    //     </View>
    // );

    return (
        <View style={styles.containerStyle}>

            <Text style={styles.textStyle}>{title}</Text>

            <Coins coins={coins} pop nobars />

            <View style={styles.backButton}>
                <TouchableOpacity onPress={onPressBack}>
                    <Icon 
                        name="times"
                        size={30} 
                        color="white"
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        // flex: 1,
        alignItems: 'center',
        backgroundColor: Config.colorPrimary100,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 0
        },
        paddingTop: Config.statusBarPadding,
    },
    backButton: {
        flex: 1,
        width: 60,
        marginRight: 5,
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // borderWidth: 1,
    },
    textStyle: {
        color: 'white',
        flex: 1,
        // alignItems: 'center',
        fontSize: 20,
        // fontWeight: 'bold',
    }
};

export { SettingsHeader };
