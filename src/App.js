import './App.css';
import React from 'react';

let twitterLink, d;

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
      colors: ["#fb6964", "#77b1a9", "#34222", "#bdbb99", "#472e32", "#27ae60"],
      clicked: false,
      colorState: "",
      fadeProp: 'fade-in'
    };
    this.newQuote = this.newQuote.bind(this);
    this.fetchFunction = this.fetchFunction.bind(this);
  };


  componentDidMount(){
    this.newQuote();
  }
        
  
  fetchFunction() {
    return fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => data)
  }


  newQuote() {

    this.setState(() => ({
      fadeProp: "fade-out"
    }));

    setTimeout(() => {
      let promise = this.fetchFunction();
      d = promise.then(value => { 
        let random = Math.floor(Math.random() * value.length);
        if (value[random].author === null) value[random].author = "Anonymous";
        this.setState(() => ({
          text: value[random].text,
          author: value[random].author,
          clicked: true,
          fadeProp: "fade-in"
        }));
        return value
      });
    }, 500);

    setTimeout(() => {
      this.backgroundChange();
    }, 600);                               
  }


  backgroundChange() {
    const {colors} = this.state;      
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    this.setState(() => ({
      colorState: newColor
    }));
  }


  render() {
    twitterLink = "https://twitter.com/intent/tweet?text=" + this.state.text + " - " + this.state.author;
    document.body.style.backgroundColor = this.state.colorState;

    return (
      <div id="quote-box">
        {this.state.clicked 
          ? <div id="text-box">
              <p style= {{color: this.state.colorState}}
                className= {this.state.fadeProp}
                id="text">
                  "{this.state.text}"
                </p>
                <p style= {{color: this.state.colorState}}
                className= {this.state.fadeProp} 
                id="author-text">
                  <i>&emsp;&emsp;&emsp;&emsp; - {this.state.author}</i>
              </p>
            </div>
          : <p style={{color: this.state.colorState}} id="pre-text">{this.state.text}</p>
        }
        <div id="btns" style={{colors: this.state.colorState}}>
          <a style={{backgroundColor: this.state.colorState}} href={twitterLink} id="tweet-quote" target="_blank"><i class="fa fa-twitter"></i></a>
          <button style={{backgroundColor: this.state.colorState }} id="new-quote" onClick={this.newQuote}>New Quote</button>   
        </div>
      </div>
    )
  }
}

export default QuoteMachine;
