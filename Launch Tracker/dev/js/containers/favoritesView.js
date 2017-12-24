import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';
import { bindActionCreators } from 'redux';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import { removeFavorite, borderHeart } from '../actions/index';

const classes = {

    gridList: {
        width: "800px",
        height: "80%",
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        height: 48,
    },
    typography: {
        margin: 16,
    },
};

class FavoritesView extends Component {
    constructor(props) {
        super(props);
        const open = {};
        if (props.favorites) {
            Object.values(this.props.favorites).map((launch) => open[launch.id] = false);
         }
        this.state = {
            ...open,
            anchorEl: null,
        };
    }
    componentWillReceiveProps(nextProps) {
        const open = {};
        if (nextProps.favorites) {
            Object.values(nextProps.favorites).map((launch) => open[launch.id] = false);
         }
         this.setState({
             ...open,
         });
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }
    handleClick(value, event) {
        this.setState({ [value]: true, anchorEl: event.currentTarget });
      }

    handleRequestClose(value) {
        this.setState({ [value]: false });
    }
    removeFavorite(id) {
        this.props.removeFavorite(id);
        this.props.borderHeart(id);
    }
    render() {
        const {
            anchorEl,
        } = this.state;
        return (
            <div >
                {this.props.favorites && (
                    <GridList cellHeight={250} style={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <Subheader>Favorites</Subheader>
                        </GridListTile>
                        {Object.values(this.props.favorites).map(launch => {
                            const icon = (<IconButton onClick={this.removeFavorite.bind(this, launch.id)}>
                                            <Close color="rgba(255, 255, 255, 0.54)" />
                                          </IconButton>);
                            return (<GridListTile key={launch.id} onClick={this.handleClick.bind(this, launch.id)} style={{ cursor: 'pointer' }}>

                                    <img src={launch.rocket.imageURL} alt={launch.rocket.name} />
                                    <Popover
                                      open={this.state[launch.id]}
                                      anchorEl={anchorEl}
                                      onRequestClose={this.handleRequestClose.bind(this, launch.id)}
                                      anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center',
                                        }}
                                      transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <Typography className="layout vertical" style={classes.typography} >
                                            <span>Launch Window Start Time: {launch.windowstart} </span>
                                            <span>Rocket Name: {launch.rocket.name}</span>
                                            <span>List of Space Agencies associated with the Rocket:</span>
                                            {launch.rocket.agencies.map((agency) =>
                                            <span key={launch.id + agency.name}>- {agency.name}</span>)}
                                            <span>Launch Location Name / Country: {launch.location.name}</span>
                                        </Typography >
                                    </Popover>
                                    <GridListTileBar
                                      titlePosition="top"
                                      title={launch.name}

                                      actionPosition="right"
                                      actionIcon={icon}
                                      style={classes.titleBar}
                                    />
                                    </GridListTile>);
})
                        }
                    </GridList>
                )}
            </div>);
    }
}

FavoritesView.propTypes = {
    favorites: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    removeFavorite: PropTypes.func.isRequired,
    borderHeart: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        favorites: state.favorites,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
{ removeFavorite, borderHeart },
        dispatch,
);
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoritesView);
