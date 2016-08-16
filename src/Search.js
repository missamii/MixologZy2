import React, { Component } from 'react';
// import './Search.css';
import { Link } from 'react-router';
import { Router, Route, browserHistory } from 'react-router';
import Helpers from './utils/Helpers.js';

class SearchResult extends Component {
    constructor() {
      super();
    }

    render() {
      console.log(this.props.data);
      var imageSrc = 'http://assets.absolutdrinks.com/drinks/transparent-background-black/300x400/' +this.props.data.id +'.png';
      return (
        <div className="searchResult" data-id={this.props.data.id}>
            <h1>{this.props.data.name}</h1>
            <div className="body">
              <img src={imageSrc} />
              <div><strong>Brand: </strong> {this.props.data.brands[0]}</div>
              <div><strong>Skill: </strong> {this.props.data.skill.name}</div>
                <div><strong>Type: </strong> {
              (this.props.data.isAlcoholic) ? <span>Alcoholic</span> : <span>Non Alcoholic</span>
            }</div>
              <div><strong>Ingredients: </strong>
              {
                this.props.data.ingredients.map(function(i) {
                  return <li> {i.textPlain} </li>;
                })
              }
              </div>
              <div><strong>Description: </strong> {this.props.data.descriptionPlain}</div>
              <div><strong>Video:</strong> <br />
              {
                this.props.data.videos.map(function(video) {
                  if (video.type == 'youtube') {
                      var src = 'https://www.youtube.com/embed/' +video.video;
                      return <iframe width="350" height="280" src={src}></iframe>
                  } else if (video.type == 'assets') {
                      var src = 'http://assets.absolutdrinks.com/videos/' +video.video;
                      return (
                        <video width="350" height="280" controls src={src}></video>
                      )
                  } else return null;
                })
              }
              </div>
            </div>
        </div>
      );
    }
}


class SearchResultContainer extends Component {
    constructor() {
      super();
    }

    render() {
      console.log(this.props.data)
      return (
        <div className="container">
        {
          (this.props.data.length > 0) ? <div className="close" onClick={this.props.Close}>close x</div> : null
        }
        {
          this.props.data.map(function(result) {
            return <SearchResult data={result} key={result.id}/>
          })
        }
        </div>
      );
    }
}


class Search extends Component {

  constructor(){
    super()
    this.state = {
      allDrinks: [],
      results: [],
      ingredients: [],
      description: [],
      brands: [],
      skill: [],
      type: [],
      isAlcoholic: [],
      video: [],
      searchKey: "sour"
    };

    // Functions must be bound manually with ES6 classes
    this.handleChange = this.handleChange.bind(this);
    this.getAllDrinks = this.getAllDrinks.bind(this);
    this.CloseSearchBox = this.CloseSearchBox.bind(this);

  }

  /* the event dropdown & search all button for the drinks api */
  getAllDrinks(event) {
    // event.preventDefault();
    Helpers.getAllDrinks(this.state.searchKey).then((value) => {
        this.setState({results: value.result});
    });
  }

  componentDidMount() {
    console.log('component mounted!')
  }

  handleChange(event) {
    this.setState({
      searchKey: event.target.value
    });
    // this.state.searchKey = event.target.value;
  }

  CloseSearchBox() {
    this.setState({results: []});
  }

  render(){
    // console.log(this.state);
    return (
      <div className="Search">
        <h1>Search MixologZy</h1>
        <br /> <br /> <br />

        {/* onChange function for api call with drop down */}
          <select className="dropdown" onChange={this.handleChange}>
            <option value="start">TOP 5 POPULAR DRINKS</option>
            <option value="cosmopolitan">Cosmopolitan</option>
            <option value="daiquiri">Daiquiri</option>
            <option value="mimosa">Mimosa</option>
            <option value="margarita">Margarita</option>
            <option value="negroni">Negroni</option>
          </select>
          <br />
           <input type="text" className="input" placeholder="old fashioned, sour, tequila......" onChange={this.handleChange}/>
           <button className="search" onClick={this.getAllDrinks}>Search All</button>
        <h2>Nothing shows up? <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en">Install this plugin</a></h2>
        <SearchResultContainer data={this.state.results} Close={this.CloseSearchBox}/>
      </div>
    );
  }
}

export default Search
