import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import {
  PostsList,
  Navbar,
  Home,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './';
import { authenticateUser } from '../actions/auth';
import auth from '../reducers/auth';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
      this.props.dispatch(
        authenticateUser({
          name: user.name,
          email: user.email,
          _id: user._id,
        })
      );
    }
  }
  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          {/* available to all pages */}
          <Navbar />
          <ul>
            {/* links do not re-render the page */}

            {/* <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li> */}
          </ul>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <PostsList posts={posts} />  */}
            {/* <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            /> */}
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/user/:userId" component={UserProfile} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
