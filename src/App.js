import React, { Component } from 'react';
import Navigation  from './components/Navigation/Navigation';
import ImageLinkform  from './components/ImageLinkform/ImageLinkform';
import Rank  from './components/Rank/Rank.js';
import FaceIm  from './components/FaceIm/FaceIm.js';
import Signin  from './components/Signin/Signin.js';
import Register  from './components/Register.js/Register.js';
import Logo  from './components/Logo/Logo';
import Particles from 'react-particles-js';
import './App.css';
 
const particlesOption = {
     particles: {
      number: 30, 
       density: {
        enable: true,
        value_area: 800

      }
     }
}  
const initalState = {
       input: '',
       imageUrl: '',
       box: {},
       route: 'signin', 
       isSignedIn: false,
       user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
       }  
    }
  

class App extends Component {
  constructor() {
    super();
    this.state = {
       input: '',
       imageUrl: '',
       box: {},
       route: 'signin', 
       isSignedIn: false,
       user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
       }  
    }
  }

updateUser = (data) => {
  this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
  }})
}  


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  } 
  displayFaceBox =(box)=> {
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://nameless-reaches-51523.herokuapp.com//imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
    .then(response => response.json())
        .then(response => {
          if (response) {
          fetch('https://nameless-reaches-51523.herokuapp.com//image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
                .then(response => response.json())
                .then(count => {
                 this.setState(Object.assign(this.state.user, { entries: count}))
               })
                .catch(console.log)
             }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
  } 

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initalState)
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
    render() {
     const {  imageUrl, route, box, isSignedIn } = this.state;
        return (
         <div className="App">
              <Particles className="particles"
                params={particlesOption}
                />  
                <Navigation isSignedIn={isSignedIn} 
                onRouteChange={this.onRouteChange}/> 
                { route === 'home'
                ? <div>  
                  <Logo /> 
                  <Rank  
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                  />
                  <ImageLinkform 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}/>
                  <FaceIm box={box} 
                   imageUrl={imageUrl} />  
              </div>
                : (
                  route === 'signin' 
                 ? <Signin updateUser={this.updateUser} 
                 onRouteChange={this.onRouteChange} />
                 : <Register updateUser={this.updateUser} 
                 onRouteChange={this.onRouteChange} /> 
                 )  
              }   
            </div>    
          );
        }
      }

export default App;