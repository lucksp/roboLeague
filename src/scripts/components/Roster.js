import React, { Component } from "react";
import ListOfNames from "./ListOfNames";
import { connect } from "react-redux";
import { getListOfNames, saveName } from "../redux/actions/general";

class Roster extends Component {
  state = {
    name_first: "",
    name_last: "",
    selected: false,
    speed: null,
    strength: null,
    agility: null
  };

  listOfNames() {
    return this.props.listOfNames.map((name, i) => {
      return <li key={i}>{name}</li>;
    });
  }

  handleChange = e => {
    let newState = {};
    switch (e.target.id) {
      case "name_first":
        newState.name_first = e.target.value;
        break;
      case "name_last":
        newState.name_last = e.target.value;
        break;
      case "speed":
        newState.speed = parseInt(e.target.value);
        break;
      case "strength":
        newState.strength = parseInt(e.target.value);
        break;
      case "agility":
        newState.agility = parseInt(e.target.value);
        break;
      default:
        break;
    }
    this.setState(...this.state, newState);
  };

  handleSave = () => {
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
          <div className="form-group">
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
                    <div>
                      {item.options.map((check, i) => {
                        return (
                          <div className="form-check form-check-inline" key={i}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox1"
                              value="option1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineCheckbox1"
                            >
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
            className="btn btn-primary"
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
