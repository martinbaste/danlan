import React, { Component } from 'react';
import words from '../100';


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class WordForm extends Component {
  constructor() {
    super();
    this.state = {
      wordI : getRandomInt(0,99),
      result: "",
      entry: "",
      score: [0,0],
      fails: [],
      successes: []
    };
  }

  checkWord = (e) => {
    e.preventDefault();
    const entry = this.state.entry;
    let wordI = this.state.wordI;
    const translation = words[wordI][1];
    let result;
    let score = this.state.score;
    let successes = this.state.successes;
    let fails = this.state.fails;
    if (entry === translation) {
      result = "good boi";
      score = [score[0] + 1, score[1]]
      successes = successes.concat(wordI);
      const fI = fails.indexOf(wordI);
      if (fI !== -1) {
        fails.splice(fI,1);
      }
    } else {
      result = `u rekt, was ${translation}`;
      score = [score[0], score[1] + 1]
      fails = fails.concat(wordI);
      const sI = successes.indexOf(wordI);
      if (sI !== -1) {
        successes.splice(sI,1);
      }
    }
    this.setState({
      result,
      wordI: getRandomInt(0,99),
      entry: "",
      score,
      successes,
      fails
    });

  }
  
  render() {
    const word = words[this.state.wordI][0]
    return (
      <div>
        <div>
          {word}
        </div>
        <form onSubmit={this.checkWord}>
          <input value={this.state.entry} onChange={(e) => this.setState({entry: e.target.value})}/>
        </form>
        <div>
          {this.state.result}<br/>
        </div>
        <div>
          U good: {this.state.score[0]}<br/>
          Get out: {this.state.score[1]}
        </div>
        <div className="row">
          <div className="col-xs-6">
            Success:
            {this.state.successes.map((i)=>(<li>{words[i][0]}</li>))}
          </div>
          <div className="col-xs-6">
            Fails:
            {this.state.fails.map((i)=>(<li>{words[i][0]}</li>))}
          </div>
        </div>
      </div>
    )
  }
}

export default WordForm;