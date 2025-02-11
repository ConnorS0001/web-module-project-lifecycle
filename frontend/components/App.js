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

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }
  axiosErrorResponse = error => {
    this.setState({...this.state, error: error.response.data.message})
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
      .then(response => {
        this.setState({...this.state, todos: this.state.todos.concat(response.data.data) })
        this.resetForm()
      })
      .catch(this.axiosErrorResponse)
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
      .catch(this.axiosErrorResponse)
  }
  
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(response => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return response.data.data
          })
        })
      })
      .catch(this.axiosErrorResponse)
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <div id="todos">
          <h2>Todos:</h2>
        </div>
        <div>Error: {this.state.error}</div>
        {
          this.state.todos.map(todo => {
            return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed ? ' ✔️' : ''}</div>
          })
        }
        <form id='todoForm' onSubmit={this.onFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoChange} type='text' placeholder='Add Todo'></input>
          <button>Show Completed</button>
          <input type='submit'></input>
        </form>
      </div>
    )
  }
}


// will hold all of the state machinery:
//  - Application state, held in component state
//  - State-changing methods, event handlers