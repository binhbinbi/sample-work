import React, { Component } from 'react';
import Item from '../components/item';
import OpenHours from '../components/openhours';
import OpenSpec from '../components/openspec';


export default class Info extends Component {
  constructor(props, context) {
    super(props, context);
    var {details, images} = this.props.store_detail
    this.state = {
      details: details,
      tmp_detail: details,
      images: images,
      readOnly: true
    }
    this.previewImage = this.previewImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
  }
  chooseImage(){
    document.getElementById("fileID").click();
  }

  previewImage(e){
    e.preventDefault();
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onloadend = ()=>{
        var new_images = [...this.state.images];
        new_images.push(reader.result);
        this.setState({images:new_images});
    };
    reader.readAsDataURL(file)

  }

  removeImage(index){
    var new_images = [...this.state.images]
    new_images.splice(index, 1);
    this.setState({images: new_images})
  }

  updateDetail(name, value){
    var detail = [...this.state.tmp_detail]
    detail.forEach((item, index)=> {
        if(item.name==name)
            detail[index].value = value;
    })
    this.setState({tmp_detail:detail})
  }

  render(){
     var {details, images} = this.state
     var hideStyle = {display:"none"}
     var readOnly=this.state.readOnly;
     return(
         <div>
            <div className="subpanel panel-body">
                <h2>{"Contact Details"}</h2>
                {readOnly?(<img className="edit-btn inline" src={require("../img/edit-icon.png")} onClick={()=>{this.setState({readOnly:false})}}/>):""}
                <table>
                <tbody>
                    {details.map((detail, index)=> {
                        return(<Item key={index} detail={detail} readOnly={readOnly} updateDetail={this.updateDetail}/>)
                    })}
                </tbody>
                </table>
                {readOnly?"":(<div>
                        <button className="btn-ok pad-40 pad-t-20" onClick={()=>{var detail = [...this.state.tmp_detail]; this.setState({details:detail,readOnly:true})}}>OK</button>
                        <button className="btn-cancel pad-100 pad-t-20" onClick={()=>{this.setState({readOnly:true})}}>CANCEL</button>
                    </div>
                    )}
            </div>
            {/*add images*/}
            <div className="subpanel panel-body">
                <h2>{"Store Images"}</h2>
                <div className="inline list-image">
                    {images.length>0?images.map((image, index) => {
                        return (<div key={index} className='store-image inline'>
                                    <img  src={image} className='store-image'/>
                                    <img className="remove-btn" src={require("../img/close_blue.png")} onClick={(evt)=>{this.removeImage(index);}}/>
                                </div>
                               );
                    }): (
                        <div className='store-image inline'>
                            <img  src={require("../img/default-placeholder.png")} className='store-image'/>
                        </div>
                    )}
                </div>
                <button className="add" onClick={this.chooseImage}>{"Add New Image"} </button>
                <input type="file" id="fileID" value={""} style={hideStyle} onChange={(e)=>{this.previewImage(e);}} accept="image/*"/>
            </div>
            {/*//opening hours*/}
            <div className="subpanel panel-body">
                <table className="table">
                <tbody>
                    <tr>
                        <td><h2 className='open-hour'>{"Opening Hours"}</h2></td>
                        <td className="verticalLine"><h4 className='open-spec text-center'>{"Seasonal Opening Hours"}</h4></td>
                    </tr>
                    <tr>
                        <td className=" open-hour align-top"><div className="hours">{<OpenHours/>}</div></td>
                        <td className="align-top verticalLine"><div className="pad-40 text-center">{<OpenSpec/>}</div></td>
                    </tr>
                </tbody>
                </table>

            </div>
         </div>
     )
  }
}