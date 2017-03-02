import React, { Component } from 'react';
import Multiselect  from 'react-bootstrap-multiselect';
import Time from './time';


export default class TimeSpec extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var select = [
        {value: 'Open', selected: true},
        {value: 'Close', selected: false}
    ]
    var date_time = this.props.date_time
    return (
            <tr>
                <td>
                    <div className="inline ">
                        <div className="btn-group">
                            {date_time.date}
                        </div>
                    </div>
                </td>
                <td>
                    <div className="pad-40 inline ">
                        <div className="btn-group">
                            {"Open"}
                        </div>
                    </div>
                </td>
                <td>
                    <div className="pad-40 inline">
                        {date_time.time.map((time, index) => {
                                        return (<Time key={index} time={time}/>)
                                    })}
                    </div>
                </td>
                <td>
                    <div className="pad-40 inline cursor" onClick={(evt)=>{this.click(evt, index, key)}}>{"Add Hours"}</div>
                </td>
            </tr>
    );
  }
}
