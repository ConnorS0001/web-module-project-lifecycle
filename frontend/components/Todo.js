import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div 
        onClick={this.props.toggleCompleted(this.props.todo.id)}>
        {this.props.todo.name}{this.props.todo.completed ? ' ✔️' : ''}
      </div>
    )
  }
}


// is a component that takes in the `todo` data and displays the task to the screen

