import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form id='todoForm' onSubmit={this.props.onFormSubmit}>
          <input 
            value={this.props.todoNameInput} 
            onChange={this.props.onTodoChange} 
            type='text' 
            placeholder='Add Todo'>
          </input>
          
          <input type='submit'></input>

          <br />
          
          <button 
            onClick={this.props.toggleDisplayCompleted}>
            {this.props.displayCompleted ? 'Hide' : 'Show'} Completed
          </button>
        </form>
      </div>
    )
  }
}


//Add todo and Clear Completed buttons