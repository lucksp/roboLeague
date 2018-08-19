import React, { Component } from "react";
import ListOfNames from "./ListOfNames";
import { connect } from "react-redux";
import {
  getListOfNames,
  saveName,
  over100,
  clearError
} from "../redux/actions/general";

const initialNameState = {
  name_first: null,
  name_last: null,
  speed: null,
  strength: null,
  agility: null,
  type: null
};

class Roster extends Component {
  state = {
    name: {
      ...initialNameState
    },
    hasInvalidInput: true,
    verifiedAllInputs: false
  };

  validateNumber(value, id) {
    if (value < 0 || value > 100) return false;

    switch (id) {
      case "agility":
        if (this.state.name.speed + this.state.name.strength + value > 100)
          return false;
        break;
      case "speed":
        if (this.state.name.agility + this.state.name.strength + value > 100)
          return false;
        break;
      case "strength":
        if (this.state.name.agility + this.state.name.speed + value > 100)
          return false;
        break;
    }
    return true;
  }

  handleChange = e => {
    let hasInvalidInput = true;
    let newState = { ...this.state.name };
    switch (e.target.id) {
      case "name_first":
        newState.name_first = e.target.value.trim();
        if (!newState.name_first.length) {
          hasInvalidInput = false;
        }
        break;
      case "name_last":
        newState.name_last = e.target.value.trim();
        if (!newState.name_last.length) {
          hasInvalidInput = false;
        }
        break;
      case "agility":
      case "speed":
      case "strength":
        newState[e.target.id] = parseInt(e.target.value) || null;
        if (this.validateNumber(parseInt(newState[e.target.id]), e.target.id)) {
          if (e.target.classList.contains("invalid")) {
            this.props.clearError();
            hasInvalidInput = false;
            e.target.classList.remove("invalid");
          }
        } else {
          this.props.over100();
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
    this.setState({
      ...this.state,
      name: { ...newState },
      hasInvalidInput: hasInvalidInput
    });
  };

  handleBlur = e => {
    // FIXME - form autofill does not create "onChange" event so state is not updated;
    let foundInvalid = Object.keys(this.state.name).find(item => {
      return !this.state.name[item];
    });

    this.setState({ verifiedAllInputs: foundInvalid ? false : true });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.clearError();
    if (!this.state.verifiedAllInputs) return false;
    this.props.saveName(this.state.name);
    if (!this.props.hasError) {
      this.form.reset();
      this.setState({ name: initialNameState });
    }
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
          <form className="form" ref={node => (this.form = node)}>
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
                        id={item.id}
                        type={item.type}
                        placeholder={"enter " + item.placeholder}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    )}
                    {item.type === "checkbox" && (
                      <div className="input-checkbox">
                        {item.options.map((check, i) => {
                          return (
                            <div
                              className="form-check form-check-inline"
                              key={i}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={check}
                                value={check}
                                onMouseDown={this.handleChange}
                                onMouseUp={this.handleBlur}
                                checked={this.state.name.type === check}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={check}
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
            <div className="form-footer">
              <input
                type="button"
                className={
                  "btn btn-primary button-submit" +
                  (!this.state.verifiedAllInputs ? " disabled" : "")
                }
                onClick={e => {
                  this.state.verifiedAllInputs && this.handleSave(e);
                }}
                value="Submit"
              />
              {this.props.hasError && (
                <div className="container invalid error-message">
                  {this.props.hasError} Please Re-Enter your player information
                  and re-submit.
                </div>
              )}
            </div>
          </form>
        </div>
        <ListOfNames />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listOfNames: state.general,
    hasError: state.general.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveName: name => dispatch(saveName(name)),
    over100: () => dispatch(over100()),
    clearError: () => dispatch(clearError())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roster);
