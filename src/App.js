import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import fire from "./database";
import cx from "classnames";
import Moment from "react-moment";
import "moment-timezone";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);

    this.markAsRead = this.markAsRead.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);

    this.state = {
      submissions: [],
      viewingSingleSubmission: false,
      singleKey: "",
      singleSubmissionData: []
    };
  }

  componentDidMount() {
    const submissions = fire.database().ref("/submissions");
    submissions.on(
      "value",
      function(snapshot) {
        this.setState({
          submissions: snapshot.val()
        });
      }.bind(this)
    );
  }

  handleStatusChange(status, key) {
    
    let updates = {};

    switch (status) {
      case "In Review":
        updates["submissions/" + key + "/read"] = true;
        updates["submissions/" + key + "/active"] = true;
        updates["submissions/" + key + "/published"] = false;
        break;
      case "Published":
        updates["submissions/" + key + "/read"] = true;
        updates["submissions/" + key + "/active"] = true;
        updates["submissions/" + key + "/published"] = true;
        break;
      case "Ready for Review":
        updates["submissions/" + key + "/read"] = false;
        updates["submissions/" + key + "/active"] = false;
        updates["submissions/" + key + "/published"] = false;
        break;
      default:
    }

    fire
      .database()
      .ref()
      .update(updates);
  }

  markAsRead(key) {
    let updates = {};
    updates["submissions/" + key + "/read"] = true;

    fire
      .database()
      .ref()
      .update(updates);
  }

  render() {
    console.log("SUBMISSIONS", this.state.submissions);
    console.log("SINGLE", this.state.singleSubmissionData);

    const submissions = this.state.submissions;
    const submissionList = [];
    let submissionListReversed;

    _.forEach(
      submissions,
      function(value, key) {
        console.log(key, value);

        submissionList.push(
          <div
            onClick={() => {
              this.setState({
                viewingSingleSubmission: true,
                singleSubmissionData: value,
                singleKey: key
              });
            }}
            key={key}
            className="preview-block"
          >
            <div className="preview-title">
              {value.location} <br /> <small> by {value.name}</small>
              <div
                style={{ fontSize: "12px", opacity: "0.5", marginTop: "4px" }}
              >
                <Moment
                  format="MM/DD/YYYY @ hh:mm A"
                  date={value.submittedOn}
                />
              </div>
            </div>
            <div className="preview-date">
              <div>
                {!value.read && !value.active && !value.published ? (
                  <div className="status-box status-box--unread">
                    Ready for Review
                  </div>
                ) : (
                  ""
                )}

                {value.read && value.active && !value.published ? (
                  <div className="status-box status-box--building">
                    In Review
                  </div>
                ) : (
                  ""
                )}

                {value.read && value.active && value.published ? (
                  <div className="status-box status-box--published">
                    Published
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      }.bind(this)
    );

    submissionListReversed = _.reverse(submissionList);

    const singleSubmissionData = this.state.singleSubmissionData;

    const stepOne = [];
    const stepTwo = [];

    let photoOne;
    let photoTwo;
    let photoThree;
    let photoFour;
    let photoFive;

    if (singleSubmissionData) {
      _.forEach(singleSubmissionData.stepOneAnswers, function(value, key) {
        stepOne.push(
          <div className="response" key={key}>
            <label>{value.question}</label>
            <p>{value.answer}</p>
          </div>
        );
      });

      _.forEach(singleSubmissionData.stepTwoAnswers, function(value, key) {
        stepTwo.push(
          <div className="response" key={key}>
            <label>{value.question}</label>
            <p>{value.answer}</p>
          </div>
        );
      });

      if (singleSubmissionData.photoOne) {
        photoOne = (
          <div style={{ marginBottom: "24px" }}>
            <img src={singleSubmissionData.photoOne} />
            <div>
              <a target="_blank" href={singleSubmissionData.photoOne}>
                Download
              </a>
            </div>
          </div>
        );
      }

      if (singleSubmissionData.photoTwo) {
        photoTwo = (
          <div style={{ marginBottom: "24px" }}>
            <img src={singleSubmissionData.photoTwo} />
            <div>
              <a target="_blank" href={singleSubmissionData.photoTwo}>
                Download
              </a>
            </div>
          </div>
        );
      }

      if (singleSubmissionData.photoThree) {
        photoThree = (
          <div style={{ marginBottom: "24px" }}>
            <img src={singleSubmissionData.photoThree} />
            <div>
              <a target="_blank" href={singleSubmissionData.photoThree}>
                Download
              </a>
            </div>
          </div>
        );
      }

      if (singleSubmissionData.photoFour) {
        photoFour = (
          <div style={{ marginBottom: "24px" }}>
            <img src={singleSubmissionData.photoFour} />
            <div>
              <a target="_blank" href={singleSubmissionData.photoFour}>
                Download
              </a>
            </div>
          </div>
        );
      }

      if (singleSubmissionData.photoFive) {
        photoFive = (
          <div style={{ marginBottom: "24px" }}>
            <img src={singleSubmissionData.photoFive} />
            <div>
              <a target="_blank" href={singleSubmissionData.photoFive}>
                Download
              </a>
            </div>
          </div>
        );
      }
    }

    let selectedOption;

    if (
      !singleSubmissionData.read &&
      !singleSubmissionData.active &&
      !singleSubmissionData.published
    ) {
      selectedOption = "Ready for Review";
    }

    if (
      singleSubmissionData.read &&
      singleSubmissionData.active &&
      !singleSubmissionData.published
    ) {
      selectedOption = "In Review";
    }

    if (
      singleSubmissionData.read &&
      singleSubmissionData.active &&
      singleSubmissionData.published
    ) {
      selectedOption = "Published";
    }

    return (
      <div className="stab-travel-dashboard">
        <div className="nav">
          <div className="nav-container">
            <div style={{ paddingLeft: "12px" }}>STAB TRAVEL</div>
          </div>

          <div className="container">
            {this.state.viewingSingleSubmission ? (
              <div className="single-form">
                <div className="single-form__container">
                  <div className="single-form__header">
                    <div className="form-header-top">
                      <h3>{singleSubmissionData.location}</h3>
                      <div
                        onClick={() =>
                          this.setState({ viewingSingleSubmission: false })
                        }
                        className="back"
                      >
                        {" "}
                        <i className="fa fa-chevron-left" /> Back
                      </div>
                    </div>
                    <div>
                      <select
                        onChange={e =>
                          this.handleStatusChange(
                            e.target.value,
                            this.state.singleKey
                          )
                        }
                        defaultValue={selectedOption}
                      >
                        <option value="Ready for Review">
                          Ready for Review
                        </option>
                        <option value="In Review">In Review</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: "48px" }}>
                    <h4>Personal Info</h4>
                    {stepOne}
                  </div>

                  <div style={{ marginBottom: "48px" }}>
                    <h4>Trip Info</h4>
                    {stepTwo}
                  </div>

                  <div style={{ marginBottom: "48px" }}>
                    <h4>Photos</h4>
                    {photoOne}
                    {photoTwo}
                    {photoThree}
                    {photoFour}
                    {photoFive}
                  </div>
                </div>
              </div>
            ) : (
              submissionListReversed
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
