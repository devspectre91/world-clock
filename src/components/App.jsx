import React from "react";
import StopWatch from "./StopWatch";
import Timer from "./Timer";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      stopwatch: false,
      timer: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.dataset.id === "stopwatch") {
      this.setState((prevState) => {
        return { stopwatch: !prevState.stopwatch };
      });
    }
    if (e.target.dataset.id === "timer") {
      this.setState((prevState) => {
        return { timer: !prevState.timer };
      });
    }
  }
  render() {
    return (
      <>
        <h1 className="has-text-centered pt-6 has-text-dark title">
          {" "}
          🚀 Timers 🚀
        </h1>
        <div className="level p-0">
          <div className="level-item ">
            <div
              className="button is-dark"
              data-id="stopwatch"
              onClick={this.handleClick}
            >
              Show Stopwatch
            </div>
          </div>
          <div className="level-item ">
            <div
              className="button is-dark"
              data-id="timer"
              onClick={this.handleClick}
            >
              Show Timer
            </div>
          </div>
        </div>
        <div className="level  container">
          {this.state.stopwatch ? (
            <div className="level-item p-1 m-4 ">
              <StopWatch />
            </div>
          ) : (
            <div className="level-item p-1 m-4 ">
              <div className="empty"></div>
            </div>
          )}
          {this.state.timer ? (
            <div className="level-item p-1 m-4 ">
              <Timer />
            </div>
          ) : (
            <div className="level-item  p-1 m-4 ">
              <div className="empty"></div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default App;
