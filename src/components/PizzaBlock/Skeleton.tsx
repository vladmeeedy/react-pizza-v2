import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader 
    speed={2}
    width={315}
    height={531}
    viewBox="0 0 315 531"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="153" y="329" rx="0" ry="0" width="15" height="1" /> 
    <rect x="115" y="318" rx="0" ry="0" width="1" height="0" /> 
    <rect x="22" y="310" rx="0" ry="0" width="0" height="1" /> 
    <circle cx="138" cy="130" r="128" /> 
    <rect x="3" y="318" rx="5" ry="5" width="280" height="88" /> 
    <rect x="4" y="425" rx="5" ry="5" width="70" height="26" /> 
    <rect x="143" y="422" rx="25" ry="25" width="135" height="45" /> 
    <rect x="2" y="273" rx="0" ry="0" width="278" height="27" />
  </ContentLoader>
)

export default Skeleton

