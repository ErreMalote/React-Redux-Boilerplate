
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/index';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

class TabHeader extends Component {
    render() {
        return (<AppBar >
            <Tabs
              value={this.props.selectedTab}
              onChange={this.props.selectTab}
              fullWidth
            >
            <Tab label="Search" />
            <Tab label="Favorites" />
            </Tabs>
                </AppBar>);
    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        selectedTab: state.activeTab,
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectTab }, dispatch);
}

TabHeader.propTypes = {
    selectedTab: PropTypes.number.isRequired,
    selectTab: PropTypes.func.isRequired,
  };


export default connect(mapStateToProps, matchDispatchToProps)(TabHeader);
