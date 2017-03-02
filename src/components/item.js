import React, { Component } from 'react';

export default class Item extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var {detail, readOnly, updateDetail} = this.props
    detail = detail? detail: {};
    var readonly = detail.type =='readonly'
    return (
        <tr>
            <td className="readonly bold">
                <span>{detail.name}</span>
            </td>
            <td className={readonly?'value readonly': 'value'}>
                {readOnly?(<span>{detail.value}</span>):(<input type="text" className="text" onChange={(evt) => {updateDetail(detail.name, evt.target.value)}} readOnly={readOnly?true:false} defaultValue={detail.value}/>)

                }
            </td>
        </tr>
    );
  }
}
