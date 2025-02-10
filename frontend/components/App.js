import React, { useEffect, useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    error: '',
    todoNameInput: "",
  }
  
  onTodoChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
      .then(response => {
        this.fetchAllTodos()
        this.setState({...this.state, todoNameInput: ''})
      })
      .catch(error => {
        this.setState({...this.state, error: error.response.data.message})
      })
  }

  onFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(response => {
        this.setState({ ...this.state, todos: response.data.data })
      })
      .catch(error => {
        this.setState({...this.state, error: error.response.data.message})
      })
  }
  
  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <div>Error: {this.state.error}</div>
        {
          this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}</div>
          })
        }
        <form id='todoForm' onSubmit={this.onFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoChange} type='text' placeholder='Add Todo'></input>
          <input type='submit'></input>
        </form>
      </div>
    )
  }
}


// will hold all of the state machinery:
//  - Application state, held in component state
//  - State-changing methods, event handlers