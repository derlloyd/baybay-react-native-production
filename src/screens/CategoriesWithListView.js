import React from 'react';
import { View, Text, ListView, StyleSheet, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, CardSection, Card, Spinner, Confirm } from '../components';
import { fetchAllCategories, categoryUpdate, levelUpdate, coinsSubtract, saveLevel, saveInitialLevels } from '../actions';
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

        this.props.saveLevel(this.state.level.levelId, true);
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

        // cycle through every categories' levels
        category.levels.forEach((level) => {
            // first define possible buttons
            const lockedLevel = (
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

            const unlockedLevel = (
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

            // if levelType is paid, OR if user never bought the level, render locked
            // check props for levels completed
            if (level.levelType === 'paid') {
                if (this.props.levels.hasOwnProperty(level.levelId)) {
                    // this.props.levels is users' free or purchased levels
                    // if current level exists there, render unlocked
                    renderLevels.push(unlockedLevel);
                } else {
                    // otherwise, this paid level should render locked
                    renderLevels.push(lockedLevel);
                }
            } else {
                // otherwise level is free or user bought level, render normal
                renderLevels.push(unlockedLevel);
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
        }   // put a timer here, if spinner is here too long, throw error message (no internet)
            return (
                <Spinner size="large" />
            );
    }
    render() {
        // console.log(this.props);
        return (
            <View style={styles.screenContainer}>

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
                    buyLevel={{ levelName: this.state.level.levelName, levelPrice: this.state.level.levelPrice }}
                />

                <Confirm
                    visible={this.state.coinsModal}
                    onAccept={this.onAcceptCoinsModal.bind(this)}
                    onDecline={this.onDeclineCoinsModal.bind(this)}
                    nsf
                />
            </View>       
        );
                //     Insufficient coins. Would you like to buy more?
                // </Confirm>
                // </Confirm>
                    // {<Text>Are you sure you want to buy </Text>}
                    // {<Text style={{ color: Config.colorAccent700 }}> {this.state.level.levelName} </Text>}
                    //  for {this.state.level.levelPrice} {<Icon name={Config.coinIconName} size={20} />} ?
                    // {<Text style={styles.categoryTitleStyle}> {this.props.selected.category.categoryName}</Text>}
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Config.colorPrimary100,
    },
    categoryStyle: { 
        // backgroundColor: 'red',
        // borderRadius: 45,
        padding: 8,
        borderWidth: 1,
        borderColor: Config.colorPrimary200,
        // backgroundColor: Config.colorPrimary700,
        backgroundColor: 'white',
    },
    categoryTopSection: { 
        flexDirection: 'column',
    },
    categoryTitleStyle: {
        color: Config.colorPrimary900,
        fontFamily: Config.fontMain,
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        opacity: 0.95,
    },
    categoryDescriptionStyle: {
        fontSize: 13,
        color: Config.colorPrimary900,
        paddingLeft: 10,
        // fontStyle: 'italic',
        fontFamily: Config.fontMain,
        opacity: 0.44,          // secondary text 54% opacity
    },
    categoryExpandedSection: { 
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginTop: 5,   // space between
        padding: 3,
        // borderBottomWidth: 1
    },
    levelStyle: { 
        backgroundColor: Config.colorPrimary800,
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
        fontFamily: Config.fontMain,
        // paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 2,
        opacity: 0.7,
    },
    levelNameStyle: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: Config.fontMain,
        paddingLeft: 10,
        paddingTop: 5,
    },
    levelIconSection: {
        flex: 1,        // take up 1/11 of the row
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
});

const mapStateToProps = state => {
    // console.log(state);
    return { 
        allCategories: state.allCategories, 
        selected: state.selected,
        coins: state.coins,
        levels: state.levels,
    };
};

export default connect(mapStateToProps, { fetchAllCategories, categoryUpdate, saveLevel, levelUpdate, coinsSubtract, saveInitialLevels })(Categories);
