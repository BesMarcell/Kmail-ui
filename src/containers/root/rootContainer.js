import React from 'react';
import Sidebar from './../sidebar/SidebarContainer';

const RootContainer = props => {
  return (
    <div>
      <Sidebar />
      { props.children }
    </div>
  )
};

export default RootContainer;
/*
import React, { Component } from 'react';
import Sidebar from './../sidebar/SidebarContainer';
import { connect } from 'react-redux';
import { fetch } from '../../actions/account';
import { bindActionCreators } from 'redux';

class RootComponent extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  render(){
    return(
      <div>
        <Sidebar />
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = ({account}) => ({
  account
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetch
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
*/
