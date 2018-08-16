import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getListOfNames } from "../redux/actions/general";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Link to="/link">Test Link</Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    test: state
  };
}

function mapDispatchToProps() {
  return {
    getNames: () => dispatch(getListOfNames())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
