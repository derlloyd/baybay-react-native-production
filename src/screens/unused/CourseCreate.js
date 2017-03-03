import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';
import { Card, CardSection, Button } from './common';
import { courseUpdate, courseCreate, courseFormClear } from '../actions';

class CourseCreate extends Component {
    componentWillMount() {
        // make sure form is always empty initially
        // dispatch action that resets form
        this.props.courseFormClear();
    }

    onButtonPress() {
        // call course Create
        const { name, phone, shift, desc, videoId } = this.props;

        // picker value is an empty string initially
        this.props.courseCreate({ name, phone, shift, desc, videoId });
    }

    render() {
        return (
            <Card>
                <CourseForm {...this.props} />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift, desc, videoId } = state.courseForm;

    return { name, phone, shift, desc, videoId };
};

export default connect(mapStateToProps, { courseUpdate, courseCreate, courseFormClear })(CourseCreate);
// access to an action creator in a component
// import connect helper and action creator

// cardSection 
// style={{ flex: 1 }} // expand to fill available area
