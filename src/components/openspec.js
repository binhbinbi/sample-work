import React, { Component } from 'react';
import Multiselect  from 'react-bootstrap-multiselect';
import Time from './time';
import TimeSpec from './time_spec';
import Moment from 'moment'
import DateTimeField from 'react-bootstrap-datetimepicker'
import AddHours from "../popups/addHours"
import $ from '../stylesheets/bootstrap/js/jquery.min'


export default class OpenSpec extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {dis: false, position: {top: "", left: ""}, modal_index:"",
        date_time: [
            {date:'25/12', time:[{time_open:'11:30', time_close: '15:30'}]}
        ],
        start_time: "00:00",
        end_time: "00:00",
        date: "01/01",
    }
    this.closeModal = this.closeModal.bind(this);
    this.setTime = this.setTime.bind(this);
    this.removeTime = this.removeTime.bind(this);
  }
  click(evt, index){
    var position = $('#add-'+index).position()
    var spec_position = $('#spec').position()
    var tmp_position = {top: position.top, left:position.left+spec_position.left-150}

    this.setState({position: tmp_position, dis:true, modal_index: index})
  }
  closeModal(){
    this.setState({dis: false})
  }
  setTime(key, start, end){
    var date_time = [...this.state.date_time]
    date_time[key].time.push({time_open: start, time_close: end})
    this.setState({date_time: date_time})
  }

  removeTime(key, index){
    var date_time = [...this.state.date_time]
    date_time[key].time.splice(index,1);
    this.setState({date_time: date_time})
  }

  render() {
    var select = [
        {value: 'Open', selected: true},
        {value: 'Close', selected: false}
    ]
    var self = this;
    var date_time = this.state.date_time
    var time = {   time_open : "00:00",
                   time_close : "00:00"
               }
    function put_time(start_time, end_time){
        self.setState({start_time: start_time, end_time: end_time});
    }
    function put_date(date){
        self.setState({date: date})
    }
    var date_time = this.state.date_time;
    var date = this.state.date;
    return (
        <div id="spec">
            <AddHours index={this.state.modal_index} position={this.state.position} visible={this.state.dis} closeModal={this.closeModal} setTime={this.setTime}/>
            <table className="t-table">
            <tbody>
                {date_time.map((item, index) => {
                    return(
                            <tr key={index}>
                                <td className="align-top">
                                    <div className="inline ">
                                        <div className="btn-group">
                                            {item.date}
                                        </div>
                                    </div>
                                </td>
                                <td className="align-top">
                                    <div className="pad-40 inline ">
                                        <div className="btn-group">
                                            {"Open"}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="pad-40 inline time">
                                        {item.time.map((time, index1) => {
                                                        return (<Time key={index1} time={time} key_in={index} index={index1} removeTime={this.removeTime}/>)
                                                    })
                                        }
                                    </div>
                                </td>
                                <td className="align-top">
                                    <div id={"add-"+index} className="pad-40 inline cursor" onClick={(evt)=>{this.click(evt, index);}}>{"Add Hours"}</div>
                                </td>
                            </tr>
                    )
                })}
            </tbody>
            </table>
            <div className="m-bottom">
                <div className="inline">
                    <div className="btn-group w-120">
                        <DateTimeField dateTime={date} format={"DD/MM"} inputFormat={"DD/MM"} onChange={(evt)=>{this.setState({tmp_date:evt}); put_date(evt)}} mode="datetime"/>
                    </div>
                </div>
                <div className="inline">
                    <Time time={time} put_time={put_time}/>
                </div>
                <button className="pad-20 inline" onClick={()=>{var date_time = [...this.state.date_time]; date_time.push({date:this.state.date, time:[{time_open:this.state.start_time, time_close: this.state.end_time}]}); this.setState({date_time:date_time, date: "01/01", start_time:"00:00", end_time: "00:00"})}}> {"ADD"}</button>
            </div>
        </div>
    );
  }
}
