import React from 'react';
import ContentLoader from "react-content-loader"

const PostContentLoader = props => {
   return (
      <ContentLoader 
         height={250}
         width={400}
         speed={2}
         primaryColor="#f3f3f3"
         secondaryColor="#ecebeb"
         {...props}
      >
         <rect x="43.58" y="29.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="30.42" y="37.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="144.11" y="4.67" rx="0" ry="0" width="98.16" height="91.08" /> 
         <rect x="59.69" y="50.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="145.09" y="118.67" rx="0" ry="0" width="95" height="7" /> 
         <rect x="150.09" y="133.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="163.11" y="102.67" rx="0" ry="0" width="53.14" height="6" /> 
         <rect x="147.11" y="142.67" rx="0" ry="0" width="38" height="6" /> 
         <rect x="203.11" y="147.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="196.11" y="141.67" rx="0" ry="0" width="37" height="7" /> 
         <rect x="200.11" y="58.67" rx="0" ry="0" width="0" height="0" />
      </ContentLoader>
   );
}

export default PostContentLoader;