import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var _ = require('lodash');

// bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
  // for loop alternate
  // let stars = [];
  // for (let i=0; i<props.numberOfStars; i++) {
  //   stars.push(<i key={i} className="fa fa-star"></i>);
  // }
  // return (
  //   <div className="col-md-5">
  //     {stars}
  //   </div>
  // );

  return (
    <div className="col-md-5">
      {_.range(props.numberOfStars).map(i =>
        <i key={i} className="fa fa-star"></i>
      )}
    </div>
  );
};

const Button = (props) => {
  let button;
  switch(props.answerIsCorrect) {
    case true:
      button =
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check"></i>
        </button>
      break;
    case false:
      button =
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>
      break;
    default:
      button =
        <button className="btn"
                onClick={props.checkAnswer}
                disabled={props.selectedNumbers.length === 0} >
          =
        </button>
      break;
  }
  return (
    <div className="col-md-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm"
              disabled={props.redraws === 0}
              onClick={props.redraw} >
        <i className="fa fa-refresh"></i>
        <br />
        {props.redraws}
      </button>
    </div>
  );
};

const Answer = (props) => {
  return (
    <div className="col-md-5">
      {props.selectedNumbers.map((number, i) =>
          <span key={i}
                onClick={() => props.unselectNumber(number)} >
            {number}
          </span>
      )}
    </div>
  );
};

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }
  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
          // onClick handler needs to a function reference not a function call
          // onClick=props.selectNumber(number) won't work
          // use inline function reference instead
          // or
          // move the span to its own class based component and use an instance function instead
          <span key={i}
                className={numberClassName(number)}
                onClick={() => props.selectNumber(number)} >
            {number}
          </span>
        )}
      </div>
    </div>
  )
};

const DoneFrame = (props) => {
  return (
    <div className='text-center'>
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>
        Play Again
      </button>
    </div>
  );
};

// Do this whenever the variable that you're defining will be shared exactly as is with all instances of the component
// and not related to any logic inside that component unlike numberOfStars which changes for every Game
//
// lodash
Numbers.list = _.range(1, 10);

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random()*9);
  static initialState = () => ({
    selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null
  });
  state = Game.initialState();
  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number != clickedNumber)
    }));
  };
  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };
  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars:  Game.randomNumber()
    }), this.updateDoneStatus);
  };
  redraw = () => {
    if (this.state.redraws === 0) { return ; }
    this.setState(prevState => ({
      randomNumberOfStars:  Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      redraws: prevState.redraws - 1
    }), this.updateDoneStatus);
  };
  possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
    const possibleNumbers = _.range(1, 10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );

    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };
  updateDoneStatus = () => {
    // setState with function argument syntax
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done. Nice!' };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over!' };
      }
    });
  };
  resetGame = () => this.setState(Game.initialState());
  render() {
    const { selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  redraws={redraws}
                  answerIsCorrect={answerIsCorrect} />
          <Answer selectedNumbers={selectedNumbers}
                  unselectNumber={this.unselectNumber} />
        </div>
        <div className="row">
          {doneStatus ?
            <DoneFrame resetGame={this.resetGame}
                       doneStatus={doneStatus} /> :
            <Numbers selectedNumbers={selectedNumbers}
                     selectNumber={this.selectNumber}
                     usedNumbers={usedNumbers} />
          }
        </div>
      </div>
    );
  };
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  };
};

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
