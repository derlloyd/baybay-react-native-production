import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CourseStoreList from './CourseList';
import { Card, CardSection, Button, Confirm, InputIcon } from './common';
import { courseUpdate, courseSave, courseDelete } from '../actions';
// import BottomTab from './BottomTab';

class UserInfo extends Component {
    state = { showModal: false }

    componentWillMount() {
        // check props and add them to reducer
        _.each(this.props.course, (value, prop) => {
            this.props.courseUpdate({ prop, value });
        });
    }

    onLogoutPress() {
        firebase.auth().signOut()
            .then(() => {
                // Sign-out successful.
                // redirect to welcome screen
                //CONFIRM MODAL                     ######### MAJOR ISSUE - cannot log back in after logging out
                Actions.pop(3);
            }, (error) => {
                // An error happened.
                console.log(error);
            });
    }
    // onSaveButtonPress() {
        // const { name, phone, shift } = this.props;
        // this.props.courseSave({ name, phone, shift, uid: this.props.course.uid });

        // TBD save new user info
    // }

    // onAccept() {
    //     // const { uid } = this.props.course;
    //     // this.props.courseDelete({ uid });
    //     console.log('accepted modal');
    //     this.setState({ showModal: false });
    // }

    // onDecline() {
    //     // hide modal when user clicks NO
    //     this.setState({ showModal: false });
    // }

    createCoursePress() {
        Actions.courseCreate();
    }

    render() {
        // need to display a form to edit user into
        // then a list of courses created
        // const parentScene = this.props.parent;
        const { currentUser } = firebase.auth();
        console.log(currentUser);
                        // <Entypo name="youtube" size={100} color="red" />
        return (
            <View style={{ flex: 1 }}>
                <Card>
                    <CardSection style={{ backgroundColor: '#F2F2F2' }}>
                        <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold' }}>Edit Your Profile</Text>
                        <TouchableHighlight>
                        <View style={{ borderWidth: 1, borderColor: 'grey', paddingLeft: 2, paddingRight: 2, flexDirection: 'row', alignItems: 'center' }} onPress={() => console.log('save changes')}>
                            <Text style={{ color: 'grey' }}>Save </Text>
                            <Icon name="save" size={25} color="grey" />
                        </View>
                        </TouchableHighlight>
                    </CardSection>

                    <CardSection>
                        <InputIcon icon="user" placeholder="import username" />
                    </CardSection>

                    <CardSection>
                        <InputIcon icon="envelope-o" placeholder="import email" />
                    </CardSection>

                    <CardSection>
                        <InputIcon icon="info-circle" placeholder="enter info about you" />
                    </CardSection>

                </Card>

                <Card style={{ flex: 1 }}>
                    <CardSection style={{ backgroundColor: '#F2F2F2' }}>
                        <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold' }}>Courses Created</Text>
                        <View style={{ borderWidth: 1, borderColor: 'blue', paddingLeft: 2, paddingRight: 2, flexDirection: 'row', alignItems: 'center' }} onPress={this.createCoursePress.bind(this)}>
                            <Text style={{ color: 'blue' }}>Add </Text>
                            <Icon name="plus-circle" size={25} color="blue" />
                        </View>
                    </CardSection>

                    <CardSection>
                        <Text>list of courses created (if any)- CourseStoreList component</Text>
                    </CardSection>

                </Card>
                    
                <Card>
                    <CardSection>
                        <Button onPress={this.onLogoutPress.bind(this)}>
                            Sign Out
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.courseForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { courseUpdate, courseDelete, courseSave })(UserInfo);
