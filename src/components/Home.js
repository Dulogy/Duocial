import React, { Component } from 'react';
import { PostsList } from '.';

export default class Home extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
      </div>
    );
  }
}
