import React, { useEffect, useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
  }
  
  fetchAllTodos = () => {
    axios.get(URL)
      .then(response => {
        this.setState({ ...this.state, todos: response.data.data })
      })
      .catch(error => {
        debugger
      })
  }
  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        {
          this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}</div>
          })
        }
      </div>
    )
  }
}


// will hold all of the state machinery:
//  - Application state, held in component state
//  - State-changing methods, event handlers