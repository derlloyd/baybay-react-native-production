import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class CourseListItem extends React.Component {
    onRowPress() {
        // want to go to employeeEdit form on selected employee
        // pass it as props
        Actions.play({ courseUid: this.props.courseUid });
    }

    render() {
        const { courseUid } = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {courseUid}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default CourseListItem;
