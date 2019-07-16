import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      image: undefined,
      autocomplete: ['about', 'above', 'across', 'app', 'apple', 'appreciate', 'bad', 'ball', 'balloon', 'bell', 'cat'],
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.searchForGifAndReturnFirst = this.searchForGifAndReturnFirst.bind(this); 
    this.keyPressed = this.keyPressed.bind(this);
  }

  updateSearchTerm(event) {
    var str = event.target.value;
    this.setState({searchTerm: str})
  }

  keyPressed(event) {
    if (event.key === 'Enter') {
      this.searchForGifAndReturnFirst();
    }
  }

  searchForGifAndReturnFirst() {
    var searchTerm = this.state.searchTerm;
    
    if (!searchTerm) { return; }
    fetch(`http://api.giphy.com/v1/gifs/search?q=[${searchTerm}]&api_key=DLCVuTK6KZExOS7JoMq82bi5MaI6EbWO&limit=1`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const result = data[0];
          const title = result.title;
          const image = result.images.fixed_width;
          image['title'] = title;

          this.setState({
            image: image,
          });
        }
      });
  }
  
  render() {
    return (
      <div className="App">
        <div>
          <input className="searchField" type="text" value={this.state.searchTerm} onChange={this.updateSearchTerm} onKeyPress={this.keyPressed} placeholder="Enter a search term..." />
          <span className="searchButton" onClick={this.searchForGifAndReturnFirst}>Search</span>
        </div>
        {this.state.image && (
          <div className="imageContainer">
            <div>{this.state.image.title}</div>
            <img src={this.state.image.url} alt={this.state.image.title} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
