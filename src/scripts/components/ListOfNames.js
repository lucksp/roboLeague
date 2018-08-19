import React, { Component } from "react";

import { connect } from "react-redux";
import { userInfo } from "os";
// import { getListOfNames, saveName } from "../redux/actions/general";

class ListOfNames extends Component {
  state = {};
  // componentDidMount() {
  // sort list of names
  // }

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
      return <th key={i}>{title}</th>;
    });
  }

  listData() {
    return this.props.listOfNames.map((name, i) => {
      return (
        <tr key={name.uniqueID} id={"player-row-" + name.uniqueID}>
          <td>{name.name}</td>
          <td>{name.agility}</td>
          <td>{name.speed}</td>
          <td>{name.strength}</td>
          <td>{name.total}</td>
          <td>{name.type}</td>
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
  //     const t = {
  //   "name_first": "s",
  //   "name_last": "d",
  //   "selected": false,
  //   "speed": 23,
  //   "strength": 23,
  //   "agility": 3,
  //   "type": "starter"
  // }
  return {
    listOfNames: state.general.names
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getListOfNames: () => dispatch(getListOfNames()),
//     saveName: name => dispatch(saveName(name))
//   };
// }

export default connect(mapStateToProps)(ListOfNames);
