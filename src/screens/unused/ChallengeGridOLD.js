import React from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import awaitEach from 'await-each';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../components';
import { challengeUpdate, fetchCurrentChallenge } from '../actions';

class ChallengeGrid extends React.Component {
    state = {
        // newChallengesObject: '',
        renderedChallenges: ''
    }
    componentWillMount() {
        // console.log('props levels: ', this.props);
        // const subGroup = this.props.level.challenges.map((challenge) => {
        //     return challenge.challengeId;
        // });
        // console.log('subGroup: ', subGroup);
        // const subGroup2 = [];
        // for (group in subGroup2) {
        //     AsyncStorage.getItem(group.challengeId, async (err, result) => {
        //         await
        //         subGroup2.push({ challengeId: val, done: 'result' });
        //         // console.log(val);
        //     });
        // }
         
        // subGroup.forEach(async (val) => {
        //     AsyncStorage.getItem(val, (err, result) => {
        //         // console.log(val);
        //         return result;
        //     })
        //     .then((result) => {
        //         subGroup2.push({ challengeId: val, done: result });
        //     });
        // });
        const newChallengesObject = [];
        awaitEach(this.props.level.challenges, async (challenge) => {
            await
            AsyncStorage.getItem(challenge.challengeId, async (err, result) => {
                // console.log('result: ', result);
                await
                newChallengesObject.push({ challengeId: challenge.challengeId, done: result });
            });
            // console.log('newChallengesObject: ', newChallengesObject);
            const renderedChallenges = newChallengesObject.map(this.renderChallenges.bind(this));
            this.setState({ renderedChallenges });
        });
    }

    // componentDidMount() {
        // const subGroup3 = [];
        
        // setTimeout(() => {
        //     const subGroup3 = this.state.group2.map(this.renderChallenges.bind(this));
        //     // this.state.group.forEach((challenge, i) => { 
        //     //     subGroup3.push(
        //     //         <View key={challenge.challengeId} >
        //     //             <TouchableHighlight
        //     //                 onPress={() => this.clickChallenge.bind(challenge)}
        //     //             >
        //     //                 <View style={styles.challengeStyle}>
        //     //                     <Text style={styles.challengeTextStyle}>
        //     //                         {i + 1}{challenge.done}
        //     //                     </Text>
        //     //                 </View>
        //     //             </TouchableHighlight>
        //     //         </View>
        //     //     ); 
        //     // });
        //     console.log('subGroup3: ', subGroup3);
        //     this.setState({ group3: subGroup3 });
        // }, 1000);
    // }
    clickChallenge(challenge) {
        // when user clicks a challenge
        // console.log('clicked challenge: ', challenge.challengeId);
        // add selected challenge to state, then map to props
        this.props.challengeUpdate(challenge.challengeId);  // this adds id to state.selected
        this.props.fetchCurrentChallenge(this.props.allChallenges, challenge.challengeId);
        // then change screens, pass challenge in props
        Actions.artist();
    }
    renderChallenges(challenge, i) {
        const click = () => {
            // add selected challenge to state, then map to props
            this.props.challengeUpdate(challenge.challengeId);  // this adds id to state.selected
            this.props.fetchCurrentChallenge(this.props.allChallenges, challenge.challengeId);
            // then change screens, pass challenge in props
            Actions.artist();
        };

        // this gets true or false from AsyncStorage for challenges
        // TODO, find a way to render differently based on true or false
        // AsyncStorage.getItem(challenge.challengeId, (err, result) => {
        //     // console.log('getItem result: ', result);
        //     console.log('result: ', result);
        //     return result;  
        // }).then((result) => {
        //     console.log('result then: ', result);
        // });

        // console.log('res: ', res);
    //     // challenges are part of levels that were passed as props
    //     // string of JSX which is map of objects in levels.challenged
    //     // inject string into expandInfo
    //     let renderAll = [];
    //     this.props.level.challenges.forEach((challenge, i) => {
    //         // console.log('current challenge: ', challenge);
    //         renderAll.push(
    //             <View key={challenge.challengeId} >
    //                 <TouchableHighlight
    //                     onPress={() => this.clickChallenge(challenge)}
    //                 >
    //                     <View style={styles.challengeStyle}>
    //                         <Text style={styles.challengeTextStyle}>
    //                             {i + 1}
    //                         </Text>
    //                     </View>
    //                 </TouchableHighlight>
    //             </View>
    //         );
    //     });
    //     return renderAll;
        // this.props.level.challenges.map((challenge, i) => {
            // function that renders each option
        if (challenge.done === 'true') {
            // done: true in object, user completed this challenge, render Success
            return (
                <View key={challenge.challengeId} >
                    <TouchableHighlight
                        onPress={() => click(challenge)}
                    >
                        <View style={styles.challengeStyleSuccess}>
                            <Text style={styles.challengeTextStyle}>
                                {i + 1}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        } else {
            // done: false or null, user did not complete challenge, render regular
            return (
                <View key={challenge.challengeId} >
                    <TouchableHighlight
                        onPress={() => click(challenge)}
                    >
                        <View style={styles.challengeStyle}>
                            <Text style={styles.challengeTextStyle}>
                                {i + 1}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
    }
    render() {
        const renderAllChallenges = this.props.level.challenges.map(this.renderChallenges.bind(this));
        // const renderAllChallengesNew = this.state.group2.map(this.renderChallenges.bind(this));

        // const renderAllChallenges = this.props.level.challenges.map((challenge, i) => {
            // function that renders each option

            // in CHALLENGE GRID screen, check if key/value pair exists for an id
            // if value is TRUE, render checkmark
            // if value is FALSE, render regular 

            // AsyncStorage.getItem(challenge.challengeId, (err, result) => {
                // if (result === true) {
                // console.log('result true: ', result, challenge, i);
                // console.log('array: ', renderAllChallenges);
                    
                    // challenge completed, render checkmark
                    // return (
                    //     <View key={challenge.challengeId} >
                    //         <TouchableHighlight
                    //             onPress={() => this.clickChallenge(challenge)}
                    //         >
                    //             <View style={styles.challengeStyle}>
                    //                 <Text style={styles.challengeTextStyle}>
                    //                     {i + 1}
                    //                 </Text>
                    //             </View>
                    //         </TouchableHighlight>
                    //     </View>
                    // );
                // } else {
                //     // challenge not yet completed, render normal
                //     renderAllChallenges.push(
                //         <View key={challenge.challengeId} >
                //             <TouchableHighlight
                //                 onPress={() => this.clickChallenge(challenge)}
                //             >
                //                 <View style={styles.challengeStyleSuccess}>
                //                     <Text style={styles.challengeTextStyle}>
                //                         {i + 1}
                //                     </Text>
                //                 </View>
                //             </TouchableHighlight>
                //         </View>
                //     );
                // }
            // });
        // });
        // console.log('props levels: ', this.props);
        // const subGroup = this.props.level.challenges.map((challenge) => {
        //     return challenge.challengeId;
        // });
        // console.log('subGroup: ', subGroup);
        // const subGroup2 = [];
        // // for (group in subGroup2) {
        // //     AsyncStorage.getItem(group.challengeId, async (err, result) => {
        // //         await
        // //         subGroup2.push({ challengeId: val, done: 'result' });
        // //         // console.log(val);
        // //     });
        // // }
         
        // subGroup.forEach(async (val) => {
        //     AsyncStorage.getItem(val, (err, result) => {
        //         // console.log(val);
        //         return result;
        //     })
        //     .then((result) => {
        //         subGroup2.push({ challengeId: val, done: result });
        //     });
        // });
        // // subGroup.forEach((val) => {
        // //     AsyncStorage.getItem(val, async (err, result) => {
        // //         await
        // //         subGroup2.push({ challengeId: val, done: 'result' });
        // //         // console.log(val);
        // //     });
        // // });
        // const renderAllChallengesOk = [];
        
        // setTimeout(() => {
        //     console.log('subGroup2: ', subGroup2);
        //     subGroup2.forEach((challenge, i) => { 
        //         renderAllChallengesOk.push(
        //             <View key={challenge.challengeId} >
        //                 <TouchableHighlight
        //                     onPress={() => this.clickChallenge.bind(challenge)}
        //                 >
        //                     <View style={styles.challengeStyle}>
        //                         <Text style={styles.challengeTextStyle}>
        //                             {i + 1}{challenge.done}
        //                         </Text>
        //                     </View>
        //                 </TouchableHighlight>
        //             </View>
        //         ); 
        //     });
        //     console.log('renderAllChallengesOk: ', renderAllChallengesOk);
        //     // this.setState({});
        // }, 500);
        
        //     console.log('renderAllChallengesOk no timeout: ', renderAllChallengesOk);
        console.log('renderAllChallenges: ', renderAllChallenges);
        // console.log('new render: ', renderAllChallengesNew);
        console.log('this state: ', this.state);
        /* 
        tried many ways to get challenges to render only
        after asyncStorage call
        */
        // if (this.state.renderedChallenges === "") {
        //     const renderAll = <Text>loading</Text>; 
        // } else {
        //     const renderAll = this.state.renderedChallenges;
        // }
        const renderAll = this.state.renderedChallenges || <Text>...</Text>;
        return (
            <View style={styles.containerStyle}>
                {renderAll}
            </View>       
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    challengeStyle: { 
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 70,
        borderWidth: 2,
        borderColor: 'darkblue', 
        backgroundColor: 'lightblue',
        borderRadius: 15,
        // margin: 10,
    },
    challengeStyleSuccess: { 
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 70,
        borderWidth: 2,
        borderColor: 'blue', 
        backgroundColor: 'green',
        borderRadius: 15,
        // margin: 10,
    },
    challengeTextStyle: {
        fontSize: 25,
        color: 'darkblue'
        // paddingLeft: 15
    }
    // levelsContainer: { 
    //     flexDirection: 'column',
    //     alignSelf: 'stretch',
    //     marginTop: 5   // space between
    //     // borderBottomWidth: 1
    // },
    // levelStyle: { 
    //     borderWidth: 1,
    //     borderColor: '#ddd',    // light grey
    //     // padding: 3,
    //     marginBottom: 5
    // },
    // levelNameStyle: { 
    //     fontSize: 13
    // },
    // leveldescriptionStyle: { 
    //     fontSize: 10
    // }
};

const mapStateToProps = state => {
    return { 
        allChallenges: state.allChallenges, 
        currentChallenge: state.currentChallenge,
        selected: state.selected
    };
};

export default connect(mapStateToProps, { challengeUpdate, fetchCurrentChallenge })(ChallengeGrid);

/*
render() {
        // console.log('state: ', this.state);
        // console.log('props: ', this.props);
        const challengeList = this.props.level.challenges.map((challenge, i) => {
            // function that renders each option
            return (
                <View key={challenge.challengeId} >
                    <TouchableHighlight
                        onPress={() => this.clickChallenge(challenge)}
                    >
                        <View style={styles.challengeStyle}>
                            <Text style={styles.challengeTextStyle}>
                                {i + 1}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        });

        return (
            <View style={styles.containerStyle}>
                {challengeList}
            </View>       
        );
    }
*/
