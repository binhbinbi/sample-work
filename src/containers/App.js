import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Info from "./Info";
import Blank from "./Blank";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      menu: 'detail',
      menuOpen: false,
      menu_page: "GENERAL INFO"
    }
  }
  render() {
    var page = "";

    var details = [
                    {name: "Store Name", value: "Milton Keynes", type: 'readonly'},
                    {name: "SID", value: "GB01101001"},
                    {name: "Business Type", value: "Ice Cream Parlour Cafeteria", type: 'readonly'},
                    {name: "Address", value: "10 Silbury Boulevard, Milton Keynes, MK5 8DS, Buckingmashire United Kingdom", type: 'readonly'},
                    {name: "About", value: "Artisian coffee shop", type: 'readonly'},
                    {name: "Moto", value: "Come in for a coffee", type: 'readonly'},
                    {name: "Telephone number", value: "01908 444 777", type: 'readonly'},
                    {name: "Email Adress", value: "info@gmail.com", type: 'readonly'},
                    {name: "Manager", value: "Claire Smith", type: 'readonly'}
                 ]
    var images = this.state.images;
    var store_detail = {details: details, images: images}
    var menu = this.state.menu;
    var store_name = "Milton Keynes (SID: GB01101001)";
    switch(this.state.menu_page){
        case "GENERAL INFO":
            page =  (<Info store_detail={store_detail}/>)
            break;
        default:
            page = (<Blank />)
    }
    return (
      <div className="">
        <div className='panel' id=''>
            <div className=''>
                <div id='name'>
                <img id='imgmenu' src={require("../img/menu.png")} onClick={()=>{this.setState({menuOpen:!this.state.menuOpen})}}/>
                {this.state.menuOpen?(
                    <div className="menu">
                        <a className="link">Page 1...........</a>
                        <a className="link">Page 2...........</a>
                        <a className="link">Page 3...........</a>
                        <a className="link">Page 4...........</a>
                        <a className="link">Page 5...........</a>
                        <a className="link">Page 6...........</a>
                    </div>
                ):""}
                {"STORE NAME: "+store_name}
                </div>
                <div id='profile'>
                    <div className="marb100">
                      <div className="avatar w-40">
                        <img src={require("../img/avatar.jpg")}/>
                      </div>
                      <div className="inline">
                        <div>{"\xa0"}</div>
                        <div className='readonly'>{"Laura McGuiness"}</div>
                        <div>{"The Ice Cream Ltd"}</div>
                      </div>
                    </div>
                </div>
            </div>
            <div id='hmenu'>
                <ul>
                    <li><a className="link" onClick={()=>{this.setState({menu_page: "GENERAL INFO"})}}>{"GENERAL INFO"}</a></li>
                    <li><a className="link" onClick={()=>{this.setState({menu_page: "INVENTORY"})}}>{"INVENTORY"}</a></li>
                    <li><a className="link" onClick={()=>{this.setState({menu_page: "STOCK"})}}>{"STOCK"}</a></li>
                    <li><a className="link" onClick={()=>{this.setState({menu_page: "USERS"})}}>{"USERS"}</a></li>
                    <li><a className="link" onClick={()=>{this.setState({menu_page: "SETTING"})}}>{"SETTING"}</a></li>
                </ul>
            </div>
        </div>
        {page}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
  mapStateToProps
)(App);
