import React, { Component } from 'react';
import words from '../100';


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class WordForm extends Component {
  constructor() {
    super();
    const remaining = [];
    for (let i = 0; i < 100; i++) {
      remaining.push(i);
    }
    this.state = {
      wordI : getRandomInt(0,99),
      result: "",
      entry: "",
      remaining,
      fails: [],
      successes: []
    };
  }

  getRandomWord() {
    const pool = this.state.remaining.concat(this.state.fails);
    return pool[getRandomInt(0,pool.length)];
  }

  removeFromRemaining = (wordI) => {
    const remaining = this.state.remaining;
    const remainingI = remaining.indexOf(wordI);
    if (remainingI >= 0) {
      remaining.splice(remainingI, 1);
    }
    return remaining;
  }

  checkWord = (e) => {
    e.preventDefault();
    const entry = this.state.entry;
    let wordI = this.state.wordI;
    const translation = words[wordI][1];
    let message;
    let successes = this.state.successes;
    let fails = this.state.fails;
    const remaining = this.removeFromRemaining(wordI);

    if (entry.toLowerCase() === translation.toLowerCase()) {
      message = "good boi";
      successes = successes.concat(wordI);
      const fI = fails.indexOf(wordI);
      if (fI !== -1) {
        fails.splice(fI,1);
      }
    } else {
      message = (
        <span>u rekt, it was: 
          <strong> {translation.toLowerCase()}</strong>
        </span>
      );
      fails = fails.concat(wordI);
      const sI = successes.indexOf(wordI);
      if (sI !== -1) {
        successes.splice(sI,1);
      }
    }
    this.setState({
      message,
      wordI: this.getRandomWord(),
      entry: "",
      successes,
      fails,
      remaining
    });

  }
  
  getWord = (i) => {
    return words[i][0];
  }

  render() {
    const word = this.getWord(this.state.wordI)
    return (
      <div>
        <div>
          <h2>{word}</h2>
        </div>
        <form onSubmit={this.checkWord}>
          <input value={this.state.entry} onChange={(e) => this.setState({entry: e.target.value})}/>
          <button>></button>
        </form>
        <div>
          {this.state.message}<br/>
          {this.state.remaining.length + 
            this.state.fails.length} words to go.
        </div>
        <div className="row">
          <div className="col-xs-6">
            U good ({this.state.successes.length}):
            {this.state.successes.map((i)=>(<li>{words[i][0]}</li>))}
          </div>
          <div className="col-xs-6">
            Nope ({this.state.fails.length}):
            {this.state.fails.map((i)=>(<li>{words[i][0]}</li>))}
          </div>
        </div>
      </div>
    )
  }
}

export default WordForm;