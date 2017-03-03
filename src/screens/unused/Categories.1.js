import React from 'react';
import { View, Text, ListView, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, CardSection, Card, Spinner, Confirm } from '../components';
import { fetchAllCategories, categoryUpdate, levelUpdate, coinsSubtract } from '../actions';
import Config from '../Config';

class Categories extends React.Component {
    state = { buyModal: false, coinsModal: false, level: '' }

    componentWillMount() {
        this.props.fetchAllCategories();
    }
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props
        // this.props are the old set of props
        this.createDataSource(nextProps.allCategories);
    }
    componentWillUpdate() {
        // animation to category when clicked
        // LayoutAnimation.spring();
        LayoutAnimation.easeInEaseOut();
    }
    onAcceptBuyModal() {
        // user accepts to buy, execute main action
        // dispatch action to subtract coins AND set value to true

        // buy level then sunbtract coins
        console.log('cost ', this.state.level.levelPrice);
        // this.props.toggleSwitchAccessory(this.state.accessory.name, true);
        this.props.coinsSubtract(this.state.level.levelPrice);
        // then close modal
        this.setState({ buyModal: false });
    }

    onDeclineBuyModal() {
        // hide modal when user clicks NO
        this.setState({ buyModal: false });
    }

    onAcceptCoinsModal() {
        // accept to buy more coins, go to accessories screen
        this.setState({ coinsModal: false });
        Actions.settings_tabs();                         // TODO check routing
    }

    onDeclineCoinsModal() {
        this.setState({ coinsModal: false });
    }
    buyLevel(level) {
        console.log('clicked level ', level);
        // check if user has enough coins
        if (this.props.coins >= level.levelPrice) {
            // if yes, popup modal to confirm, add level to state
            this.setState({ buyModal: !this.state.buyModal, level });
        } else {
            // if no, popup modal to buy more coins
            this.setState({ coinsModal: !this.state.coinsModal });
        }
    }
    createDataSource(allCategories) {
        // boilerplate to create datasource with category info
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(allCategories);
    }
    
    renderCategoryCard(category) {
        // this is renderRow of the main ListView
        // console.log('in renderCategoryCard: ', this.props);

        // when user clicks an expanded level
        const clickLevel = (level) => {
            // add selected level to state, then map to props
            this.props.levelUpdate(level);
            // then change screens, pass level in props
            Actions.challenges({ level });
        };

        // string of JSX which is map of objects in category.levels
        // inject string into expandInfo
        const renderLevels = [];
        category.levels.forEach((level) => {
            // if levelType is paid, OR if user never bought the level, render locked
            // check props for levels completed
            if (level.levelType === 'paid') {
                renderLevels.push(
                        <TouchableOpacity
                            key={level.levelId}
                            onPress={() => this.buyLevel(level)}
                        >
                            <View style={styles.lockedLevelStyle}>
                                <View style={styles.levelNameSection}>
                                    <Text style={styles.levelNameStyle}>
                                        {level.levelName}
                                    </Text>
                                </View>

                                <View style={styles.levelPriceSection}>
                                    <Text style={styles.levelPriceStyle}>
                                        {level.levelPrice}
                                    </Text>
                                    <Icon name={Config.coinIconName} size={20} style={{ opacity: 0.7 }} color="white" />
                                </View>

                                <View style={styles.levelIconSection}>
                                    <Icon name="lock" size={20} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
            } else {
                // otherwise level is free or user bought level, render normal
                renderLevels.push(
                        <TouchableOpacity
                            key={level.levelId}
                            onPress={() => clickLevel(level)}
                        >
                            <View style={styles.levelStyle}>
                                <View style={styles.levelNameSection}>
                                    <Text style={styles.levelNameStyle}>
                                        {level.levelName}
                                    </Text>
                                </View>
                                <View style={styles.levelIconSection}>
                                    <Icon name="chevron-right" size={20} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
            }
        });

        const expandInfo = () => {
            // shows expanded info on levels if selected
            if (this.props.selected.category) {
                if (category.categoryId === this.props.selected.category.categoryId) {
                    return (
                        <CardSection style={styles.categoryExpandedSection}>
                            {renderLevels}
                        </CardSection>
                    );
                }
            }
        };

        // main render category output
        return (
            <TouchableOpacity 
                onPress={() => this.props.categoryUpdate(category, this.props.selected.category)}
            >
                    <Card image={category.categoryImage} style={styles.categoryStyle}>
                        
                        <CardSection style={styles.categoryTopSection}>
                            <Text style={styles.categoryTitleStyle}>
                                {category.categoryName}
                            </Text>
                            <Text style={styles.categoryDescriptionStyle}>
                                {category.categoryDescription}
                            </Text>
                        </CardSection>

                        {expandInfo()}

                    </Card>
            </TouchableOpacity>
        );
    }
    renderListView() {
        // either render category list or spinner
        if (this.dataSource) {
            return (
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderCategoryCard.bind(this)}
                />   
            );
        }
            return (
                <Spinner size="large" />
            );
    }
    render() {
        console.log(this.props);
        return (
            <View style={{ flex: 1 }}>

                <Header 
                    onPressBack={() => { Actions.welcome(); }} 
                    title="" 
                    coins={this.props.coins}
                />
                
                {this.renderListView()}    
                <Confirm
                    visible={this.state.buyModal}
                    onAccept={this.onAcceptBuyModal.bind(this)}
                    onDecline={this.onDeclineBuyModal.bind(this)}
                >
                    {<Text>Are you sure you want to buy </Text>}
                    {<Text style={{ color: Config.colorAccent700 }}> {this.state.level.levelName} </Text>}
                     for {this.state.level.levelPrice} {<Icon name={Config.coinIconName} size={20} color={Config.colorPrimary} />} ?
                </Confirm>

                <Confirm
                    visible={this.state.coinsModal}
                    onAccept={this.onAcceptCoinsModal.bind(this)}
                    onDecline={this.onDeclineCoinsModal.bind(this)}
                >
                    Insufficient coins. Would you like to buy more?
                </Confirm>
            </View>       
        );
                    // {<Text style={styles.categoryTitleStyle}> {this.props.selected.category.categoryName}</Text>}
    }
}

const styles = {
    categoryStyle: { 
        // backgroundColor: 'red',
        // borderRadius: 45,
        padding: 8,
        borderWidth: 0,
        // borderColor: Config.colorAccentDark,
        backgroundColor: Config.colorPrimary100,
    },
    categoryTopSection: { 
        flexDirection: 'column',
    },
    categoryTitleStyle: {
        // color: 'white',
        fontSize: 18,
        paddingLeft: 10,
        opacity: 0.95,
    },
    categoryDescriptionStyle: {
        fontSize: 13,
        paddingLeft: 10,
        opacity: 0.54,          // secondary text 54% opacity
    },
    categoryExpandedSection: { 
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginTop: 5,   // space between
        padding: 3,
        // borderBottomWidth: 1
    },
    levelStyle: { 
        backgroundColor: Config.colorPrimary900,
        // borderWidth: 1,
        // borderColor: '#ddd',    // light grey
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: 5
    },
    lockedLevelStyle: { 
        backgroundColor: 'grey',
        // borderWidth: 1,
        // borderColor: '#ddd',    // light grey
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: 5
    },
    levelNameSection: {
        flex: 10       // take up 10/11 of the row
    },
    levelPriceSection: {
        flex: 5,        // take up 10/11 of the row
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelPriceStyle: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 16,
        // paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 2,
        opacity: 0.7,
    },
    levelNameStyle: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 5,
    },
    levelIconSection: {
        flex: 1,        // take up 1/11 of the row
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    // categoryCardContainer: { 
        // backgroundColor: 'red',
        // borderRadius: 5,
    // },
    // levelStyleContainer: { 
        // backgroundColor: 'blue',
        // borderWidth: 1,
        // borderColor: '#ddd',    // light grey
        // padding: 10,
        // borderRadius: 5,
        // marginTop: 5
    // },
    // levelDescriptionStyle: { 
    //     color: 'white', 
    //     fontSize: 10,
    //     paddingLeft: 10,
    //     paddingBottom: 5
    // }
};

const mapStateToProps = state => {
    // console.log(state);
    return { 
        allCategories: state.allCategories, 
        // allChallenges: state.allChallenges, 
        selected: state.selected,
        coins: state.coins,
    };
};

export default connect(mapStateToProps, { fetchAllCategories, categoryUpdate, levelUpdate, coinsSubtract })(Categories);
