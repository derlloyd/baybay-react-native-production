import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { courseSubscribe } from '../actions';

class CourseStoreListItem extends React.Component {
    onRowPress() {
        // want to go to employeeEdit form on selected employee
        // pass it as props
        Actions.courseDetails({ course: this.props.course });
    }

    onAddPress() {
        // add this course to users collection
        // console.log(this.props);
        this.props.courseSubscribe({ uid: this.props.course.uid });
    }

    render() {
        // CourseStoreList passed a prop of course, 
        // contains object { uid: 'xxx', val: { name: 'course1', desc: '...', ...}}
        const { name } = this.props.course.val;
        return (
            <CardSection style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                    <View>
                        <Text style={styles.titleStyle}>
                            {name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Button onPress={this.onAddPress.bind(this)}>Add</Button>
            </CardSection>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        width: 300
    }
};

// const mapStateToProps = (state) => {
//     const { uid } = state.courseForm;

//     return { uid };
// };

export default connect(null, { courseSubscribe })(CourseStoreListItem);
