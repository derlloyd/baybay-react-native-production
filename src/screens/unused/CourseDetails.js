import React from 'react';
import { View, Text } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button, Card, CardSection } from './common';
import { courseSubscribe } from '../actions';

class CourseDetails extends React.Component {
    onAddPress() {
        // display modal saying course added,
        // options: get started or add more
        // console.log('modal options tbd');
        // console.log(this.props.course);
        this.props.courseSubscribe(this.props.course);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Text style={{ fontSize: 18 }}>
                        {this.props.course.val.name}
                    </Text>
                </CardSection>

                <CardSection>
                    <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
                    <Text>
                        Description:{this.props.course.val.desc}
                    </Text>
                </CardSection>

                <CardSection>
                    <Text>Display list of videos in the course</Text>
                </CardSection>

                <CardSection>
                    <Text>
                        {this.props.course.val.owner}
                    </Text>
                        <Text>Display info about the owner</Text>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onAddPress.bind(this)}>
                        Add
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default connect(null, { courseSubscribe })(CourseDetails);
