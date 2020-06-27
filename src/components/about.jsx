import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';

import './About.css';

class About extends React.Component {
    static propTypes = {
        // city: PropTypes.string,
        // code: PropTypes.number,
        // group: PropTypes.string,
        // description: PropTypes.string,
        // temp: PropTypes.number,
        // unit: PropTypes.string,
        // weatherLoading: PropTypes.bool,
        // masking: PropTypes.bool,
        // searchText: PropTypes.string,
        // postLoading: PropTypes.bool,
        // posts: PropTypes.array,
        // dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.props.dispatch(getWeather('Hsinchu', this.props.unit));
    //     this.props.dispatch(listPosts(this.props.searchText));
    // }

    // componentWillUnmount() {
    //     if (this.props.weatherLoading) {
    //         cancelWeather();
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.searchText !== this.props.searchText) {
    //         this.props.dispatch(listPosts(nextProps.searchText));
    //     }
    // }

    render() {
        const {city, group, description, temp, unit, masking, postLoading} = this.props;

        // document.body.className = `weather-bg ${group}`;
        // document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='about'>
                <p>hello</p>
            </div>
        );
    }
}

export default connect(state => ({
    ...state.weather,
    unit: state.unit,
    postLoading: state.post.postLoading,
    searchText: state.searchText,
}))(About);
