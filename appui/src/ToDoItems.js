import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class ToDoItems extends Component {


  constructor(props) {
  super(props);

  this.state ={
    items: []
  };
  this.createTask=this.createTask.bind(this);
  }


deleteItem(key){
  this.props.delete(key);
}
createTask(item){

  return <li onClick={()=> this.deleteItem(item.key)} key={item.key}>{item.text}</li>;
}


  render(){
    var toDoEntries=this.props.entries;
    var listItems = toDoEntries.map(this.createTask);


    return (
      <FlipMove duration={250} easing="ease-out">
      <ul className="theList">
        {listItems}
      </ul>
    </FlipMove>
    );

  }
}


export default ToDoItems;
