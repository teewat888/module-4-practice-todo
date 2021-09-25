import React from "react";
import "./App.css";
import { CATEGORIES } from "./data";

class App extends React.Component {
  state = {
    tasks: [
      {
        text: "Buy rice",
        category: "Food",
      },
      {
        text: "Save a tenner",
        category: "Money",
      },
      {
        text: "Build a todo app",
        category: "Code",
      },
      {
        text: "Build todo API",
        category: "Code",
      },
      {
        text: "Get an ISA",
        category: "Money",
      },
      {
        text: "Cook rice",
        category: "Food",
      },
      {
        text: "Tidy house",
        category: "Misc",
      },
    ],
    selected: "All",
    iInput: "",
    iOption: "Code",
  };

  uniqueID = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

  handleOnClick = (e) => {
    console.log(e.target.value);
    this.setState(
      {
        selected: e.target.value,
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(
      {
        tasks: [
          ...this.state.tasks,
          { text: this.state.iInput, category: this.state.iOption },
        ],
      },
      () => console.log(this.state)
    );
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  removeTask = (text) => {
    const newTasks = this.state.tasks.filter((task) => task.text !== text);
    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    let filteredTasks = this.state.tasks;
    if (this.state.selected !== "All") {
      filteredTasks = this.state.tasks.filter(
        (task) => task.category === this.state.selected
      );
    }
    return (
      <div className="App">
        <h2>My tasks</h2>
        <div className="categories">
          <h5>Category filters</h5>
          {CATEGORIES.map((category) => {
            if (this.state.selected === category) {
              console.log("here");
              return (
                <button key={this.uniqueID()} className="selected">
                  {category}
                </button>
              );
            } else {
              return (
                <button
                  key={this.uniqueID()}
                  onClick={this.handleOnClick}
                  value={category}
                >
                  {category}
                </button>
              );
            }
          })}
        </div>
        <div className="tasks">
          <h5>Tasks</h5>
          <form className="new-task-form" onSubmit={this.handleSubmit}>
            <input
              placeholder="New Task details"
              type="text"
              id="iInput"
              value={this.state.iInput}
              onChange={this.handleChange}
            />
            <select
              name="iOption"
              id="iOption"
              onChange={this.handleChange}
              value={this.state.iOption}
            >
              {CATEGORIES.map((category) => {
                if (category !== "All") {
                  return (
                    <option key={this.uniqueID()} value={category}>
                      {category}
                    </option>
                  );
                } else {
                  return null;
                }
              })}
            </select>
            <input type="submit" value="Add task" />
          </form>
          <div>
            {filteredTasks.map((task) => (
              <div className="task" key={this.uniqueID()}>
                <div className="label">{task.category}</div>
                <div className="text">{task.text}</div>
                <button
                  className="delete"
                  onClick={() => this.removeTask(task.text)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
