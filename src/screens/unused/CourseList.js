import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { courseFetch } from '../actions';
import CourseListItem from './CourseListItem';
import { Card, CardSection } from './common'; 
import BottomTab from './BottomTab';

class CourseList extends Component {
    componentWillMount() {
        // console.log('courseList props: ', this.props);
        this.props.courseFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props
        // this.props are the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ myCourses }) {
        // boilerplate
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(myCourses);
    }

    renderRow(uid) {
        // custom component
        return <CourseListItem courseUid={uid} />;
    }

    render() {
        // const parentScene = this.props.parent;
        return (
            <View style={{ flex: 1 }}>
                <Text>This is the main welcome screen</Text>
                <Text>List of MY SUBSCRIBED courses, if none, click Add</Text>
                <Text>to go to Course Store</Text>
                <Text>Click key ID to play(will show name)</Text>
                
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
    const myCourses = _.map(state.myCourses, (val, uid) => {
        // this will return the values where uid === true in the user collection
        return uid;
    });

    // const mapFn = (val, uid) => {
    //     return { val, uid };
    // };

    // const courses = _.map(state.myCourses, mapFn);

    return { myCourses };
};

export default connect(mapStateToProps, { courseFetch })(CourseList);
