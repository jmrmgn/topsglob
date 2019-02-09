import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
   return (
      <div>
         <section class="hero is-light">
            <div class="hero-body">
               <div class="container">
                  <h1 class="title">
                     Welcome to blog!
                  </h1>
                  <h2 class="subtitle">
                     You can post and express your mind here. 
                  </h2>
                  <div className="control">
                     <Link to="/posts" className="button is-info">View latest posts</Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Home;