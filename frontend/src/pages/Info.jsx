
import React, { Component } from 'react';
import { loadToys } from '../store/actions/ToysActions';
import { connect } from 'react-redux';
import MapContainer from '../components/Map/MapContainer';
import { BarChart } from '../components/Chart/BarChart';
import { PieChart } from '../components/Chart/PieChart';
import { Spinner } from '../components/Layout/Spinner';

class Info extends Component {
  state = {
    toys: null,
    years: null,
    eduTyps: null,
    funnyTyps: null,
    adultTyps: null,
  };

  componentDidMount() {
    this.props.loadToys();
    const { toys } = this.props;
    setTimeout(() => {
      const eduTyps = toys.filter((toy) => toy.type === 'Educational');
      const funnyTyps = toys.filter((toy) => toy.type === 'Funny');
      const adultTyps = toys.filter((toy) => toy.type === 'Adult');
      this.setState({ toys, funnyTyps, adultTyps, eduTyps });
    }, 1000);
  }

  average = (arr) => {
    var total = 0;
    arr.forEach((item) => {
      total += item.price;
    });
    return (total / arr.length).toFixed(1);
  };

  getNumOfToysPerYear = (years) => {
    var count = {};
    years.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    return count;
  };

  render() {
    const { eduTyps, funnyTyps, adultTyps, years } = this.state;
    const uniqueYears = [...new Set(years)];
    return (
      <div>
        {eduTyps !== null ? (
          <div className='grid-1 text-center'>
            <h1>Statistics</h1>
            <div className='grid-1-1 card'>
              <div>
                <BarChart
                  eduTyps={eduTyps}
                  funnyTyps={funnyTyps}
                  adultTyps={adultTyps}
                  labels={['Educational', 'Funny', 'Adult']}
                />
              </div>
              <div>
                <PieChart
                  eduTyps={eduTyps}
                  funnyTyps={funnyTyps}
                  adultTyps={adultTyps}
                  labels={uniqueYears}
                />
              </div>
            </div>
            <MapContainer />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toys: state.toysApp.toys,
});

const mapDispatchToProps = {
  loadToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
