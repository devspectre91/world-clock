import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: true,
      whatToDo: "Start",
      stop: false,
      reset: false,
      resume: false,
      hour: 0,
      min: 0,
      sec: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.x = null;
    this.timer = this.timer.bind(this);
  }
  handleClick(e) {
    let buttonId = e.target.dataset.id;
    switch (buttonId) {
      case "start":
        if (this.state.sec > 0 || this.state.min > 0 || this.state.hour > 0) {
          this.setState({
            start: false,
            stop: true,
            whatToDo: "Stop",
          });
          this.startTimer();
        } else {
          alert("add some time");
        }
        break;
      case "stop":
        this.setState({
          stop: false,
          resume: true,
          reset: true,
          whatToDo: "Start",
        });
        this.stopTimer();
        break;
      case "resume":
        if (this.state.sec > 0 || this.state.min > 0 || this.state.hour > 0) {
          this.setState({
            stop: true,
            resume: false,
            reset: false,
            whatToDo: "Stop",
          });
          this.startTimer();
        } else {
          alert("add some time");
        }
        break;
      case "reset":
        this.setState({
          start: true,
          stop: false,
          resume: false,
          reset: false,
          whatToDo: "Start",
        });
        this.resetTimer();
        break;
      case "hourUp":
        if (this.state.hour === 60) {
          this.setState({ hour: 0 });
        }
        this.setState((prev) => {
          return { hour: ++prev.hour };
        });
        break;
      case "minuteUp":
        if (this.state.min === 60) {
          this.setState({ min: 0 });
        }
        this.setState((prev) => {
          return { min: ++prev.min };
        });
        break;
      case "secondUp":
        if (this.state.sec === 60) {
          this.setState({ sec: 0 });
        }
        this.setState((prev) => {
          return { sec: ++prev.sec };
        });
        break;
      case "hourDown":
        if (this.state.hour === 0) {
          this.setState({ hour: 60 });
        }
        this.setState((prev) => {
          return { hour: --prev.hour };
        });
        break;
      case "minuteDown":
        if (this.state.min === 0) {
          this.setState({ min: 60 });
        }
        this.setState((prev) => {
          return { min: --prev.min };
        });
        break;
      case "secondDown":
        if (this.state.sec === 0) {
          this.setState({ sec: 60 });
        }
        this.setState((prev) => {
          return { sec: --prev.sec };
        });
        break;
    }
  }

  timer() {
    this.setState((prev) => {
      return {
        sec: --prev.sec,
      };
    });

    if (this.state.sec === 0) {
      if (this.state.min === 0) {
        if (this.state.hour === 0) {
          alert("Time Over!");
          clearInterval(this.x);
        } else {
          this.setState((prev) => {
            return {
              hour: --prev.hour,
              min: 60,
              sec: 60,
            };
          });
        }
      } else {
        this.setState((prev) => {
          return {
            min: --prev.min,
            sec: 60,
          };
        });
      }
    }
  }
  startTimer() {
    this.x = setInterval(this.timer, 1000);
  }
  stopTimer() {
    clearInterval(this.x);
  }
  resetTimer() {
    this.setState((prev) => {
      return {
        sec: 0,
        millisec: 0,
        min: 0,
        hour: 0,
      };
    });
  }

  componentWillUnmount() {
    clearInterval(this.x);
  }
  render() {
    return (
      <div className="card ">
        <h1 className="subtitle has-text-centered mb-1 has-text-weight-bold">
          Timer
        </h1>
        <div className="has-text-centered pt-1">
          {" "}
          <span onClick={this.handleClick} data-id="hourUp" className="tag">
            ▲
          </span>
          <span
            onClick={this.handleClick}
            data-id="minuteUp"
            className="tag mx-6"
          >
            ▲
          </span>
          <span onClick={this.handleClick} data-id="secondUp" className="tag">
            ▲
          </span>
        </div>
        <div className="has-text-centered py-0">
          {" "}
          <span>
            {this.state.hour < 10 ? `0` + this.state.hour : this.state.hour}:
          </span>{" "}
          <span>
            {this.state.min < 10 ? `0` + this.state.min : this.state.min}:
          </span>{" "}
          <span>
            {this.state.sec < 10 ? `0` + this.state.sec : this.state.sec}
          </span>
        </div>
        <div className="has-text-centered pb-1">
          {" "}
          <span onClick={this.handleClick} data-id="hourDown" className="tag">
            ▼
          </span>
          <span
            onClick={this.handleClick}
            data-id="minuteDown"
            className="tag mx-6"
          >
            ▼
          </span>
          <span onClick={this.handleClick} data-id="secondDown" className="tag">
            ▼
          </span>
        </div>
        <div className="level pt-1">
          {this.state.start ? (
            <div className="level-item">
              <div
                className="button  is-primary"
                data-id="start"
                onClick={this.handleClick}
              >
                {this.state.whatToDo}
              </div>
            </div>
          ) : (
            ""
          )}
          {this.state.stop ? (
            <div className="level-item">
              <div
                className="button  is-primary"
                data-id="stop"
                onClick={this.handleClick}
              >
                {this.state.whatToDo}
              </div>
            </div>
          ) : (
            ""
          )}
          {this.state.resume ? (
            <div className="level-item">
              <div
                className="button  is-primary"
                data-id="resume"
                onClick={this.handleClick}
              >
                Resume
              </div>
            </div>
          ) : (
            ""
          )}
          {this.state.reset ? (
            <div className="level-item">
              <div
                className="button  is-primary"
                data-id="reset"
                onClick={this.handleClick}
              >
                Reset
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
