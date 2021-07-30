import React from "react";

export default class StopWatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: true,
      whatToDo: "Start",
      stop: false,
      reset: false,
      resume: false,
      millisec: `0`,
      sec: `0`,
      min: `0`,
      hour:`0`,
    };
    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.x = null;
    this.timer= this.timer.bind(this)
  }

  
  timer() {
    this.setState((prev)=>{
        return {
            millisec: ++prev.millisec
        }
    })
    if(this.state.millisec >= 100){
        this.setState((prev)=>{
            return {
                sec: ++prev.sec,
                millisec:0
            }
        })
       
    }
    if(this.state.sec === 60){
          this.setState((prev)=>{
            return {
                sec: 0,
                min:++prev.min
            }
        })
    }
    if(this.state.min === 60){
        this.setState((prev)=>{
            return {
                sec: 0,
                millisec:0,
                min:0,
                hour:++prev.hour
            }
        })
    }
    if(this.state.hour === 60){
        this.setState((prev)=>{
            return {
                sec: 0,
                millisec:0,
                min:0,
                hour:0
            }
        })
    }

}
  startTimer() {

    this.x = setInterval(this.timer,10);

  }
  stopTimer() {
    clearInterval(this.x)
  }
  resetTimer(){
    this.setState((prev)=>{
        return {
            sec: 0,
            millisec:0,
            min:0,
            hour:0
        }
    })
  }

  componentWillUnmount(){
    clearInterval(this.x)
  }
  handleClick(e) {
    let buttonId = e.target.dataset.id;
    switch (buttonId) {
      case "start":
        this.setState({
          start: false,
          stop: true,
          whatToDo: "Stop",
        });
        this.startTimer();
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
        this.setState({
          stop: true,
          resume: false,
          reset: false,
          whatToDo: "Stop",
        });
        this.startTimer();
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
    }
  }

  render() {
    return (
      <div className="card">
        <h1 className="subtitle has-text-centered mb-4 has-text-weight-bold">
          StopWatch
        </h1>
        <div className="has-text-centered py-5">
          <span>{(this.state.hour)<10?`0`+this.state.hour: this.state.hour}:</span> <span>{(this.state.min)<10?`0`+this.state.min: this.state.min}:</span>
          <span>{(this.state.sec)<10?`0`+this.state.sec: this.state.sec}:</span> <span>{(this.state.millisec)<10?`0`+this.state.millisec: this.state.millisec}</span>
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
