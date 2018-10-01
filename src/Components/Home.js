import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import getUser from '../store';

class Home extends Component {
  // componentDidMount() {
  //   this.props.fetchUser();
  // }

  render() {
    console.log('PROPS', this.props);
    return (
      <div>
        <h1>HOME</h1>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user.currentUser,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUser: () => dispatch(getUser()),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);

export default Home;
