import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { courseFetchAll } from '../actions';
import CourseStoreListItem from './CourseStoreListItem';
import { Card } from './common';

class CourseStoreList extends Component {
    componentWillMount() {
        this.props.courseFetchAll();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ allCourses }) {
        // boilerplate
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(allCourses);
    }

    renderRow(course) {
        // custom component
        return <CourseStoreListItem course={course} />;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                
            </View>
        );
    }
}
                // <BottomTab parentScene={parentScene} />


// helper library lodash
// need to convert employees object to an array for ListView
// result will be objects as 
// { shift: 'mon', name: 'd', phone: '11', id: 'uid448595KK'}
// _.map will push objects into an array
    
const mapStateToProps = (state) => {
    const allCourses = _.map(state.allCourses, (val, uid) => {
        const newObj = { val };
        newObj.uid = uid;

        return newObj;
    });

    return { allCourses };
};

// IDEALLY would use lodash but object spread breaks the code
// const mapStateToProps = state => {
//     const courses = _.map(state.courses, (val, uid) => { ...val, uid });
//     return { courses };
// };


export default connect(mapStateToProps, { courseFetchAll })(CourseStoreList);
