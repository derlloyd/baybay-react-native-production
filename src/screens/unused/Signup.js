import React, { Component } from 'react';
// import Exponent from 'exponent';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, createUser, loginWithFacebook } from '../actions';
import { Card, CardSection, Button, ButtonFb, Spinner, InputIcon } from '../components';

class SignupForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    // onLoginButtonPress() {
    //     const { email, password } = this.props;
    //     this.props.loginUser({ email, password });
    // }

    onSignupButtonPress() {
        const { email, password } = this.props;
        this.props.createUser({ email, password });
    }
    async onFacebookButtonPress() {
        // const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
        //     '1659497924064037', {
        //         permissions: ['public_profile'],
        //     });
        // this.props.loginWithFacebook({ type, token });
    }
    renderButton() {
        if (this.props.loading) {
            return (
                <CardSection style={{ flexDirection: 'column', minHeight: 90 }}>
                    <Spinner size="large" />
                </CardSection>
            );
        }
                // <Button style={{ flex: 1 }} onPress={this.onSignupButtonPress.bind(this)}>
                //     Signup
                // </Button>
        return (
            <CardSection style={{ flexDirection: 'column', minHeight: 90 }}>
                <Button style={{ flex: 0 }} onPress={this.onSignupButtonPress.bind(this)}>
                    Sign Up With Email
                </Button>
                <Text style={styles.forgotPwTextStyle}>
                    Don't worry, we will NEVER share your email.
                </Text>
            </CardSection>
            
        );
    }
    renderFbButton() {
        if (this.props.loading) {
            return (
                <CardSection style={{ flexDirection: 'column', minHeight: 90 }}>
                    <Spinner size="large" />
                </CardSection>
            );
        }
        return (
            <ButtonFb onPress={this.onFacebookButtonPress.bind(this)}>
                Sign Up With Facebook
            </ButtonFb>
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                

                <Card>
                    <CardSection>
                        <InputIcon 
                            icon="envelope-o"
                            placeholder="Ex. you@gmail.com"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>

                    <CardSection>
                        <InputIcon
                            secureTextEntry
                            icon="lock"
                            placeholder="Enter a Password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>
                    
                    {this.renderButton()}

                </Card>

                <Text style={styles.errorTextStyle}> 
                    {this.props.error}
                </Text>

                <Text style={styles.errorDetailTextStyle}> 
                    {this.props.errorDetail}
                </Text>
                
                {this.renderFbButton()}

            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        marginTop: 20,
        fontSize: 20,
        alignSelf: 'center',
        color: 'red' 
    },
    errorDetailTextStyle: {
        fontSize: 13,
        alignSelf: 'center',
        color: 'red',
        marginBottom: 30 
    },
    forgotPwTextStyle: {
        fontSize: 12,
        marginTop: 20,
        alignSelf: 'center',
        color: 'grey',
        fontStyle: 'italic' 
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, errorDetail, loading } = auth;
    // pull values off of this.state, return as an object

    return { email, password, error, errorDetail, loading };
};

export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    loginUser, 
    createUser,
    loginWithFacebook
 })(SignupForm);
