import React, { Component } from "react";
import ListOfNames from "./ListOfNames";
import { connect } from "react-redux";
import { getListOfNames, saveName } from "../redux/actions/general";

class Roster extends Component {
  state = {
    name: {
      name_first: "",
      name_last: "",
      selected: false,
      speed: null,
      strength: null,
      agility: null,
      type: null
    },
    hasInvalid: false
  };

  listOfNames() {
    return this.props.listOfNames.map((name, i) => {
      return <li key={i}>{name}</li>;
    });
  }

  validateNumber(value) {
    if (value < 0 || value > 100) return false;
    return true;
  }

  handleChange = e => {
    let newState = { ...this.state.name };
    let hasInvalid = false;
    switch (e.target.id) {
      case "name_first":
        newState.name_first = e.target.value;
        break;
      case "name_last":
        newState.name_last = e.target.value;
        break;
      case "agility":
      case "speed":
      case "strength":
        if (this.validateNumber(e.target.value)) {
          newState[e.target.id] = parseInt(e.target.value);
          if (e.target.classList.contains("invalid")) {
            e.target.classList.remove("invalid");
          }
        } else {
          hasInvalid = true;
          this.invalidInput = e.target;
          this.invalidInput.classList.add("invalid");
        }
        break;
      default:
        break;
    }
    if (e.target.type === "checkbox") {
      newState.type = e.target.value;
    }
    this.setState({ ...this.state, name: newState, hasInvalid });
  };

  handleSave = () => {
    if (this.state.hasInvalid) return false;
    this.props.saveName(this.state);
  };

  render() {
    const inputList = [
      {
        id: "name_first",
        placeholder: "first name",
        type: "text",
        label: "first name"
      },
      {
        id: "name_last",
        placeholder: "last name",
        type: "text",
        label: "last name"
      },
      {
        id: "agility",
        placeholder: "0 - 100",
        type: "number",
        label: "agility"
      },
      { id: "speed", placeholder: "0 - 100", type: "number", label: "speed" },
      {
        id: "strength",
        placeholder: "0 - 100",
        type: "number",
        label: "strength"
      },
      {
        id: "type",
        type: "checkbox",
        options: ["starter", "sub"],
        label: "starter or sub"
      }
    ];

    return (
      <div className={"wrapper-roster"}>
        <div className="area-input container">
          <div className="form-group needs-validation" noValidate>
            {inputList.map((item, i) => {
              return (
                <div className={"input-row " + item.id} key={i}>
                  <label htmlFor={item.id} className="label-input">
                    {item.label}
                  </label>
                  {item.type !== "checkbox" && (
                    <input
                      min={item.type === "number" ? "0" : null}
                      max={item.type === "number" ? "100" : null}
                      key={item.id + "-" + i}
                      id={item.id}
                      type={item.type}
                      placeholder={"enter " + item.placeholder}
                      onChange={this.handleChange}
                      required={true}
                      className="form-control"
                    />
                  )}
                  {item.type === "checkbox" && (
                    <div className="input-checkbox">
                      {item.options.map((check, i) => {
                        return (
                          <div className="form-check form-check-inline" key={i}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={check}
                              value={check}
                              onChange={this.handleChange}
                              checked={this.state.type === check}
                            />
                            <label className="form-check-label" htmlFor={check}>
                              {item.options[i]}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <input
            type="button"
            className={
              "btn btn-primary" + (this.state.hasInvalid ? " disabled" : "")
            }
            onClick={this.handleSave}
            value="Submit"
          />
        </div>
        <ListOfNames />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listOfNames: state.general,
    savedNames: null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveName: name => dispatch(saveName(name))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roster);
