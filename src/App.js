import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import fire from "./database";
import cx from "classnames";

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="stab-travel-dashboard">

          <div className="nav">

              <div className="nav-container">
                <div style={{paddingLeft: '12px'}}>STAB TRAVEL</div>
              </div>

              <div className="container">

                  <div className="preview-block preview-block--unread">
                      <div style={{paddingLeft: '12px', fontSize: '18px'}}>Macaronis <br /> <small> by Christian Bryant</small></div>
                      <div style={{paddingRight: '12px'}}>
                        <div>March 6, 2018</div>
                      </div>
                  </div>

                  <div className="preview-block">
                      <div style={{paddingLeft: '12px', fontSize: '18px'}}>Macaronis <br /> <small> by Christian Bryant</small></div>
                      <div style={{paddingRight: '12px'}}>March 6, 2018</div>
                  </div>

                  <div className="preview-block">
                      <div style={{paddingLeft: '12px', fontSize: '18px'}}>Macaronis <br /> <small> by Christian Bryant</small></div>
                      <div style={{paddingRight: '12px'}}>March 6, 2018</div>
                  </div>

              </div>

          </div>


      </div>
    );
  }
}

export default App;
