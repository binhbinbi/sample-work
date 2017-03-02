import React, { Component } from 'react';
import Multiselect  from 'react-bootstrap-multiselect';
import Time from './time';
import Moment from 'moment'
import AddHours from "../popups/addHours"
import $ from '../stylesheets/bootstrap/js/jquery.min'

export default class OpenHours extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {dis: false, position: {top: "", left: ""}, modal_index:"",
                  days: {
                  "Mon": {time: [{time_open:"08:00", time_close:"09:00"}]},
                  "Tue": {time: [{time_open:"08:00", time_close:"09:00"}]},
                  "Wed": {time: [{time_open:"08:00", time_close:"09:00"}]},
                  "Thu": {time: [{time_open:"08:00", time_close:"09:00"}]},
                  "Fri": {time: [{time_open:"08:00", time_close:"09:00"}]},
                  "Sat": {time: [{time_open:"08:00", time_close:"09:00"}]},
                  "Sun": {time: [{time_open:"08:00", time_close:"09:00"}]}
                }
                }
    this.closeModal = this.closeModal.bind(this);
    this.setTime = this.setTime.bind(this);
    this.removeTime = this.removeTime.bind(this);
  }
  closeModal(){
    this.setState({dis: false})
  }
  setTime(key, start, end){
    console.log(start+"  "+end)
    console.log(key)
    var days = Object.assign({},this.state.days)
    days[key].time.push({time_open: start, time_close: end})
    this.setState({days: days})
  }

  click(evt, index, key){
    console.log(index)
    var position = $('#add-'+index).position()
    console.log(position)

    this.setState({position: position, dis:true, modal_index: key})
  }

  removeTime(key, index){
    var days = Object.assign({}, this.state.days)
    days[key].time.splice(index, 1)
    this.setState({days: days})
  }

  render() {
    var days = this.state.days;
    var select = [
        {value: 'Open', selected: true},
        {value: 'Close', selected: false}
    ]
    return (
        <div>
            <AddHours index={this.state.modal_index} position={this.state.position} visible={this.state.dis} closeModal={this.closeModal} setTime={this.setTime}/>
            <table>
            <tbody>
                {Object.keys(days).map((key, index) => {
                console.log(index)
                    return (
                        <tr key={index}>
                            <td className="align-top">
                                <div className="pad-40 w-small pad-r-20 pad-t-10">
                                    {key}
                                </div>
                            </td>
                            <td className="align-top">
                                <div className="w-small inline">
                                    <Multiselect data={select}/>
                                </div>
                            </td>
                            <td >
                                <div className="w-small inline time">
                                    {days[key].time.map((time, index) => {
                                        return (<Time key={index} time={time} key_in={key} index={index} removeTime={this.removeTime}/>)
                                    })}
                                </div>
                            </td>
                            <td className="align-top">
                                <div id={"add-"+index} className="pad-40 inline cursor pad-t-10" onClick={(evt)=>{this.click(evt, index, key)}}>{"Add Hours"}</div>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
            </table>
        </div>
    );
  }
}
