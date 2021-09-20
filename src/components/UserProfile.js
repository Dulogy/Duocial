import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      // dispatch an action
    }
  }
  render() {
    const { user } = this.props.auth;
    console.log('props', this.props);
    // for getting params id
    const {
      match: { params },
    } = this.props;
    console.log('this.props', params);
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="btn-grp">
          <button className="button edit-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(UserProfile);
