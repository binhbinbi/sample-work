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
      menu_page: "GENERAL INFO",
      mn_active: false
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
    var home_active = ""
    if (this.state.active_menu == null){
      home_active = "active"
    }
    var menu_active = ""
    if (this.state.active_menu == -1){
      menu_active = "active"
    }
    var menus = ['HOME', 'SETTING', 'DETAIL']
    var mn_active = this.state.mn_active
    return (
      <div className={mn_active?"body-active":"body"}>
        <div className='panel' id=''>
            <div className=''>
                <div id='name'>

                <img id='imgmenu' className={mn_active?"active":""} src={require("../img/menu.png")} onClick={()=>{this.setState({mn_active: !this.state.mn_active})}}/>
                <div className="inline">
                        {"STORE NAME: "+store_name}
                </div>
                <div  className={mn_active?"menu-slide-active":""}>
                    <ul className="" className={mn_active?"nav-active":""}>
                      {menus.map((menu, index)=>{
                        var menu_class = ""
                        if (index == this.state.active_menu){
                          menu_class = "n-active"
                        }
                        return (<li key={index} className={mn_active?"active":""}><a className={menu_class} onClick={()=>{this.setState({active_menu:index});}}>
                         <div className={mn_active?menu_class+" item-active":menu_class+" item"}>{menu}</div></a></li>
                            )
                      })
                      }
                    </ul>
                </div>

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
        <div className={mn_active?"r-active":""}>
        {page}
        </div>
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
