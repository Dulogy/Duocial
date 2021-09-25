import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }
  checkIfUserIsFriend = () => {
    console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;
    const index = friends.map((friends) => friends.to_user._id).indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  render() {
    console.log('props', this.props);
    // for getting params id
    const {
      match: { params },
      profile,
    } = this.props;
    console.log('this.props', params);
    const { user } = profile.user;
    console.log(user);

    if (profile.inProgress) {
      return <h1>Loading</h1>;
    }

    const isUserFriend = this.checkIfUserIsFriend();
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
          {/* <div className="field-value">{user.email}</div> */}
          <div className="field-value">email@gmail.com</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          {/* <div className="field-value"> {user.name}</div> */}
          <div className="field-value">Name</div>
        </div>

        <div className="btn-grp">
          {!isUserFriend ? (
            <button className="button edit-btn">Add Friend</button>
          ) : (
            <button className="button edit-btn">Remove Friend</button>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
