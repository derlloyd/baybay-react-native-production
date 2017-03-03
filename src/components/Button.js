import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import Config from '../Config';

const Button = ({ onPress, correct, disabled, style, textStyle, children }) => {
    // can pass style prop to component, it will override default style
    // correct argument passed to correct answer, change underlay color based on this
    // test this as it may allow cheating
    return (
        <TouchableHighlight 
            underlayColor={correct ? Config.colorAccent100 : Config.colorAccent100} 
            onPress={onPress} 
            style={disabled ? styles.buttonStyleDisabled : [styles.buttonStyle, style]}
        >
            <Text style={[styles.textStyle, textStyle]}>
                {children}
            </Text>
        </TouchableHighlight>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'white',   // '#007aff'
        fontSize: 16,
        fontWeight: 'bold',
        // fontFamily: 'KomikaAxis',
        fontFamily: Config.mainFont,
        // fontFamily: 'Noteworthy-Bold',
        // paddingLeft: 15,
        // borderWidth: 1,
    },
    buttonStyle: {
        marginTop: 5,
        // paddingTop: 10,
        // paddingBottom: 10,
        // borderBottomWidth: 4,
        flex: 1,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        justifyContent: 'center',
        backgroundColor: Config.colorPrimary800,
        borderRadius: 10,     // rounded corners
        marginLeft: 15,
        marginRight: 15,
        minHeight: 50,
    },
    buttonStyleDisabled: {
        marginTop: 5,
        // paddingTop: 10,
        // paddingBottom: 10,
        flex: 1,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        justifyContent: 'center',
        backgroundColor: Config.colorPrimary100,
        borderRadius: 10,     // rounded corners
        marginLeft: 15,
        marginRight: 15,
        minHeight: 50,
    }
};

export { Button };

// import React from 'react';
// import { Text, TouchableHighlight } from 'react-native';

// const Button = ({ onPress, style, textStyle, children }) => {
//     // can pass style prop to component, it will override default style
//     return (
//         <TouchableHighlight onPress={onPress} style={[styles.buttonStyle, style]}>
//             <Text style={[styles.textStyle, textStyle]}>
//                 {children}
//             </Text>
//         </TouchableHighlight>
//     );
// };

// const styles = {
//     textStyle: {
//         alignSelf: 'center',
//         color: '#007aff',   // '#007aff'
//         fontSize: 16,
//         fontWeight: '500',
//         // paddingTop: 10,
//         // paddingBottom: 10,
//     },
//     buttonStyle: {
//         flex: 1,    // expand to fill the space
//         alignSelf: 'stretch',   // position self using flexbox rules
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//         // borderRadius: 5,     // rounded corners
//         borderWidth: 1,
//         borderColor: '#007aff',     // close to native ios blue
//         marginLeft: 5,
//         marginRight: 5,
//         minHeight: 50
//     }
// };

// export { Button };
