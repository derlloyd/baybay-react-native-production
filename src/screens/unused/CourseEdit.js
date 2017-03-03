import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';
import { Card, CardSection, Button, Confirm } from './common';
import { courseUpdate, courseSave, courseDelete } from '../actions';

class CourseEdit extends Component {
    state = { showModal: false }

    componentWillMount() {
        // check props and add them to reducer
        _.each(this.props.course, (value, prop) => {
            this.props.courseUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        
        this.props.courseSave({ name, phone, shift, uid: this.props.course.uid });
    }

    onAccept() {
        const { uid } = this.props.course;
        this.props.courseDelete({ uid });
    }

    onDecline() {
        // hide modal when user clicks NO
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Card>
                <CourseForm {...this.props} />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>
                
                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Delete Course
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this course?
                </Confirm>

            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.courseForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { courseUpdate, courseDelete, courseSave })(CourseEdit);
