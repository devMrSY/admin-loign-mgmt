
import Loader from "react-loader-spinner";
import React from 'react'

export default class Loaders extends React.Component {
  //other logic
  render() {
    return (<>
      <Loader
        type="Puff"
        color="grey"
        height={50}
        width={50}
        display= "flex"
        justifyContent= "center"
        alignItems= "center"
      ></Loader>
    </>);
  }
}