import React from 'react';
import ContentLoader from "react-content-loader"

const PostContentLoader = props => {
   return (
      <ContentLoader 
         height={100}
         width={350}
         speed={2}
         primaryColor="#f3f3f3"
         secondaryColor="#ecebeb"
         {...props}
      >
         <rect x="88.86" y="62" rx="3" ry="3" width="350" height="6.4" /> 
         <rect x="89" y="75" rx="3" ry="3" width="380" height="6.4" /> 
         <rect x="43.58" y="29.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="30.42" y="37.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="12.7" y="21.67" rx="0" ry="0" width="58.78" height="55.2" /> 
         <rect x="59.69" y="50.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="89.09" y="22.67" rx="0" ry="0" width="95" height="7" /> 
         <rect x="89.23" y="94.67" rx="0" ry="0" width="62.48" height="8.01" /> 
         <rect x="150.09" y="133.67" rx="0" ry="0" width="0" height="0" /> 
         <rect x="88.11" y="36.67" rx="0" ry="0" width="53.14" height="6" />
      </ContentLoader>
   );
}

export default PostContentLoader;