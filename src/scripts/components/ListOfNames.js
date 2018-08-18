import React, { Component } from "react";

import { connect } from "react-redux";
// import { getListOfNames, saveName } from "../redux/actions/general";

class ListOfNames extends Component {
  state = {};
  // componentDidMount() {
  // sort list of names
  // }

  listNames() {
    if (!this.props.listOfNames.length) {
      return <div>Please add a name to your team to view complete roster</div>;
    }
    return this.props.listOfNames.map((name, i) => {
      return (
        <div className="card name-card" key={name.uniqueID}>
          <div className="card-body">
            <h5 className="card-title">
              {name.name_first + " " + name.name_last}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">Stats:</h6>
            <ul>
              <li>Agility: {name.agility}</li>
              <li>Speed: {name.speed}</li>
              <li>Strength: {name.strength}</li>
            </ul>
            <p>
              Total Attribute Score:{" "}
              <span>{name.agility + name.speed + name.strength}</span>
            </p>
            <a href="#" className="card-link">
              Starter
            </a>
            <a href="#" className="card-link">
              Substitue
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={"wrapper-list container"}>
        <div className="list-names">{this.listNames()}</div>
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
