import React from 'react';
import { Text } from 'react-native';

class CategoryListItem2 extends React.Component {
    render() {
        return (
            <Text>{this.props.category.categoryDescription}</Text>
        );
    }
}

export default CategoryListItem2;
