import React, { Component } from 'react';
import Moment from 'moment'
import DateTimeField from 'react-bootstrap-datetimepicker'

export default class Time extends Component {
  constructor(props, context) {
    super(props, context);
    var time = props.time;
    var format = "HH:mm"
    var time_open = time.time_open;
    var time_close = time.time_close;
    this.state = {
        start : time_open,
        end : time_close
    }
  }

  render() {
    var put_time = this.props.put_time;
    var {key_in, index, removeTime} = this.props
    var format = "HH:mm"
    return (
        <div className="form-group">
            <div className="pad-20 btn-group w-150 ">
                <DateTimeField dateTime={this.state.start} format={format} onChange={(evt)=>{this.setState({start: evt}); put_time(evt, this.state.end)}} mode="time"/>
            </div>
            <div className="pad-20 btn-group w-150 ">
                <DateTimeField dateTime={this.state.end} format={format} onChange={(evt)=>{this.setState({end: evt}); put_time(this.state.start, end)}} mode="time"/>
            </div>
            <img className="btn-remove" src={require("../img/close_blue.png")} onClick={()=>{console.log(key_in +"   "+ index); removeTime(key_in, index)}}/>
        </div>
    );
  }
}









