import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import SearchView from './searchView';
import Favorites from './favoritesView';

const classes = {

    container: {
        paddingTop: "48px",
        height: "calc(100vh - 48px)",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
};

function TabContainer({ children }) {
    return (
      <div style={classes.container}>
        {children}
      </div>
    );
  }

  TabContainer.propTypes = {
    children: PropTypes.node,
  };
class ContentViews extends Component {
    render() {
        return (
            <SwipeableViews
              axis="x"
              index={this.props.activeTab}
            >

                <TabContainer>
                    {this.props.activeTab === 0 ? <SearchView /> : null}
                </TabContainer>
                <TabContainer >
                    {this.props.activeTab === 1 ? <Favorites /> : null }
                </TabContainer>
            </SwipeableViews>
        );
    }
}
ContentViews.propTypes = {
    activeTab: PropTypes.number.isRequired,
};
function mapStateToProps(state) {
    return {
        activeTab: state.activeTab,
    };
}


export default connect(mapStateToProps)(ContentViews);
