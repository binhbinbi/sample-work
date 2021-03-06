import React, {Component} from "react";
import DateTimeField from 'react-bootstrap-datetimepicker'
import Moment from 'moment'

export default class AddHours extends Component{
    constructor(props) {
        super(props);
        this.state = {start: "00:00", end: "00:00", start_message: null, end_message: null}
    }
    render(){
        var { visible, closeModal, setTime, position, index} = this.props;
        var {top, left} = position
        var styles = {zIndex:10, top: top-40, left: left}
        if (!visible){
          styles['display'] = 'none'
        }
        return (
          <div className="modal-addhours" style={styles}>
              <table>
              <tbody>
                    <tr className="">
                        <td className="">
                            <div className="pad-20">
                                {"Start time:"}
                            </div>
                        </td>
                        <td className="">
                            <div className="pad-20 w-80">
                                <DateTimeField dateTime={this.state.start} format={"HH:mm"} onChange={(evt)=>{evt=="Invalid date"?this.setState({start_message: evt}):this.setState({start: evt, start_message: null});}} mode="time"/>
                            </div>
                            <span className="alert">{this.state.start_message?this.state.start_message:"\xa0"}</span>
                        </td>
                    </tr>
                    <tr className="">
                        <td className="">
                            <div className="pad-20">
                                {"End time:"}
                            </div>
                        </td>
                        <td className="">
                            <div className="pad-20 w-80">
                                <DateTimeField dateTime={this.state.end} format={"HH:mm"} onChange={(evt)=>{evt=="Invalid date"?this.setState({end_message: evt}):this.setState({end: evt, end_message: null});}} mode="time"/>
                            </div>
                            <span className="alert"> {this.state.end_message? this.state.end_message: "\xa0"}</span>
                        </td>
                    </tr>
              </tbody>
              </table>

            <div className="mc-footer top-5">
              <button onClick={()=>{if(!this.state.start_message&&!this.state.end_message){setTime(index, this.state.start, this.state.end); closeModal(); this.setState({start:"00:00", end:"00:00"})}}} className="btn btn-primary left pad-l-10">OK</button>
              <button onClick={()=>{closeModal()}} className="btn btn-primary right">CANCEL</button>
            </div>
          </div>
        );
    }
}
