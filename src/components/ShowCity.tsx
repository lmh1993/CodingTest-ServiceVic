import React, { Component } from 'react'
import CitySearch from './CitySearch'
import CityList from './CityList'
import './ShowCity.css'
 
class ShowCity extends Component<{},{listChecked:boolean, searchChecked:boolean}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { 
        listChecked: false,
        searchChecked: false
    };
    this.toggleList = this.toggleList.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }
 
  toggleList(checked: boolean) {
    this.setState({ listChecked: !checked, searchChecked: false });
  }

  toggleSearch(checked: boolean) {
    this.setState({ searchChecked: !checked, listChecked: false });
  }
 
  render() {
    let cityList;
    let citySearch;
    if (this.state.listChecked) {cityList = <CityList />} else {cityList = <span></span>}
    if (this.state.searchChecked) {citySearch = <CitySearch />} else {citySearch = <span></span>}


    return (
      <div>
        <h3>Show Weather</h3>
        <button className="btn" onClick={()=>this.toggleList(this.state.listChecked)} >See List of Cities</button>
        <button className="btn" onClick={()=>this.toggleSearch(this.state.searchChecked)} >See City</button>
        {citySearch}
        {cityList}
      </div>
    );
  }
}
export default ShowCity

