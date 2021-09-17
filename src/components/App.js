import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { PostsList, Navbar, Home, Page404, Login, Signup } from './';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
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
            <Route component={Page404} />
            {/* <PostsList posts={posts} />  */}
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
