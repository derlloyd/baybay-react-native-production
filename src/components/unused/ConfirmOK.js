import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';


// assume we will get an onaccept and ondecline function
const ConfirmOK = ({ children, visible, onAccept, style }) => {
    return (
        <Modal
            visible={visible}   // bool, true visible, false hidden
            transparent
            animationType="fade"   // or "slide" or none
            onRequestClose={() => {}} // android requirement
        >
            <View style={[styles.containerStyle, style]}>
                <CardSection style={styles.cardSectionStyle}>
                    <Text style={styles.textStyle}>
                        {children}
                    </Text>
                </CardSection>

                <CardSection>
                    <Button onPress={onAccept}>OK</Button>
                </CardSection>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        color: 'white',
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 100, 0.95)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'

    }
};

export { ConfirmOK };
