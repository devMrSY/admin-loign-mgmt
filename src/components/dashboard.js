import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class dashboard extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');

    let loggedIn = true;
    if (token == null || token !== 'skfdjlkadjfakdladjf') {
      loggedIn = false;
    }

    this.state = {
      length: 10,
      posts: [],
      page: 1,
      loggedIn,
    };
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false });
  };

  componentDidMount() {
    var page = this.state.page;
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/?userId=${page}`)
      .then((res) => {
        this.setState((preState) => ({
          posts: [...preState.posts, ...res.data],
        }));
      });
    console.log(this.state.posts);
  }

  count = () => {
    this.setState((prev) => ({
      page: prev.page + this.state.page,
    }));
    this.componentDidMount();
  };

  render() {
    const { loggedIn } = this.state;
    if (this.state.loggedIn === false) {
      return <Redirect to="/" loggedIn={loggedIn} />;
    }

    return (
      <>
        <div className="dash-nav">
          <h1>You have succesfully Logged-In</h1>
          <h3>Page Number{this.state.page}</h3>
          <Link onClick={this.logout} to="/">
            Logout
          </Link>
          <button className="dash-button" onClick={this.count}>
            Next
          </button>
        </div>
        <div className="dash-container">
          {this.state.posts.map((posts, index) => (
            <div className={`page-${(index + 1) % 10 === 0}`}>
              <div className="index-value">{index + 1}</div>
              <div className="body">{posts.title}</div>
              <div></div>
              {(index + 1) % 10 === 0 ? (
                <div id="page-number">
                  {' '}
                  <br /> page no: {(index + 1) % 9}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
}
