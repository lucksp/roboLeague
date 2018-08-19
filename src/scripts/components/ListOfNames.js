import React, { Component } from "react";

import { connect } from "react-redux";
import { editName } from "../redux/actions/general";

class ListOfNames extends Component {
  state = { editingName: false };

  // TODO
  // componentDidMount() {
  // sort list of names
  // }

  handleClick = (e, stateName) => {
    e.preventDefault();

    switch (stateName) {
      case "cancel":
        // nothing to do;
        break;
      case "save":
        const userId = e.target.dataset.userid;
        this.props.editName(e.target.value, userId);
        break;
    }
    this.toggleState("editingName");
  };

  toggleState = stateName => {
    this.setState({ [stateName]: !this.state[stateName] });
  };

  listTitle() {
    const tableTitles = [
      "name",
      "agility",
      "speed",
      "strength",
      "total",
      "type"
    ];
    return tableTitles.map((title, i) => {
      return (
        <th className="table-header" key={i}>
          {title}
        </th>
      );
    });
  }

  listData() {
    return this.props.listOfNames.map((name, i) => {
      return (
        <tr
          key={name.uniqueID}
          id={"player-row-" + name.uniqueID}
          className={"table-row" + (i % 2 === 0 ? " even" : " odd")}
        >
          {this.state.editingName ? (
            <td className="name-edit">
              <input
                type="text"
                placeholder="New name"
                data-userid={name.uniqueID}
                onKeyUp={e => {
                  if (e.key === "Enter") {
                    this.handleClick(e, "save");
                  }
                }}
              />
              <span
                className="form-edit"
                onClick={e => {
                  this.handleClick(e, "cancel");
                }}
              >
                <i className="fas fa-times" />
              </span>
              <span
                className="form-edit"
                onClick={e => {
                  this.handleClick(e, "save");
                }}
              >
                <i className="fas fa-check" />
              </span>
            </td>
          ) : (
            <td className="name" onClick={this.handleClick}>
              {name.name}
              <span className="form-edit">
                <i className="far fa-edit" />
              </span>
            </td>
          )}
          <td className="agility">{name.agility}</td>
          <td className="speed">{name.speed}</td>
          <td className="strength">{name.strength}</td>
          <td className="total">{name.total}</td>
          <td className="type last-col">{name.type}</td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.listOfNames.length) {
      return (
        <div className="container empty-roster">
          Please add a name to your team to view complete roster
        </div>
      );
    }

    return (
      <div className={"wrapper-table container"}>
        <table>
          <thead>
            <tr>
              <th>Your Roster</th>
            </tr>
          </thead>
          <tbody>
            <tr>{this.listTitle()}</tr>
            {this.listData()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listOfNames: state.general.names
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editName: (newName, userId) => dispatch(editName(newName, userId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfNames);
