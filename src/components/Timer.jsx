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
        hour:`0`,
        min:`0`,
        sec:`0`
      };
      this.handleClick = this.handleClick.bind(this);
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
        break;
      case "stop":
        this.setState({
          stop: false,
          resume: true,
          reset:true,
          whatToDo:'Start'
         
        });
        break;
      case "resume":
        this.setState({
        stop: true,
        resume:false,
        reset:false,
        whatToDo:'Stop'
        });
        break;
      case "reset":
        this.setState({
          start: true,
          stop: false,
          resume:false,
          reset:false,
          whatToDo: "Start",
        });
        break;
    }
  }
  render() {
    return (
      <div className="card ">
        <h1 className="subtitle has-text-centered mb-1 has-text-weight-bold">
          Timer
        </h1>
        <div className="has-text-centered pt-1">
          {" "}
          <span className='tag' >▲</span><span className='tag mx-6'>▲</span> 
          <span className='tag'>▲</span> 
        </div>
        <div className="has-text-centered py-0">
          {" "}
          <span >{(this.state.hour)<10?`0`+this.state.hour: this.state.hour}:</span> <span >{(this.state.min)<10?`0`+this.state.min: this.state.min}:</span>{" "}
          <span >{(this.state.sec)<10?`0`+this.state.sec: this.state.sec}</span> 
        </div>
        <div className="has-text-centered pb-1">
          {" "}
          <span className='tag' >▼</span><span className='tag mx-6'>▼</span> 
          <span className='tag'>▼</span> 
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
