import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './';

class CategoryListItem extends React.Component {
    componentWillMount() {
        console.log('mounting CategoryListItem');
    }
    onRowPress() {
        // want to go to employeeEdit form on selected employee
        // pass it as props
        // Actions.play({ courseUid: this.props.courseUid });
    }

    render() {
        // const { courseUid } = this.props;
        // console.log(this.props);
            // <Text>{this.props.category.categoryDescription}</Text>
        // return (
        //     <Text>render me</Text>
        // );
        return (
        <TouchableWithoutFeedback onPress={console.log('presseddd')}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {this.props.category.categoryDescription}
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

export default CategoryListItem;
