import React, { useEffect, useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    error: '',
    todoNameInput: "",
    displayCompleted: true,
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
  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
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
          this.state.todos.reduce((acc, todo) => {
            if (this.state.displayCompleted || !todo.completed) return acc.concat(
              <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed ? ' ✔️' : ''}</div>
            )
            return acc
          }, [])
          //return 
        }
        <form id='todoForm' onSubmit={this.onFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoChange} type='text' placeholder='Add Todo'></input>
          
          <input type='submit'></input>
          <br />
          <br />
          <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? 'Hide' : 'Show'} Completed</button>
        </form>
      </div>
    )
  }
}


// will hold all of the state machinery:
//  - Application state, held in component state
//  - State-changing methods, event handlers