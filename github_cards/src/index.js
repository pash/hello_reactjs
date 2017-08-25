import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <img width='75px' src={props.avatar_url} alt={props.userName}/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div>{props.company ? props.company : 'Secret'}</div>
      </div>
    </div>
  );
};

// spread operator (...)
const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  )
}

// https://github.com/mzabriskie/axios
class Form extends React.Component {
  state = {
    userName: ''
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Event: Form Submit', this.state.userName);
    axios(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        console.log(resp);
        this.props.onSubmit(resp.data);
        this.setState({ userName: '' });
      })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text'
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder='GitHub username' required />
        <button type='submit'>Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    cards: []
  }
  addNewCard = (cardInfo) => {
    console.log(cardInfo);
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
      </div>
    )
  }
}
ReactDOM.render(<App />, root)
