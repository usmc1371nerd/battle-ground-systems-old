import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton, UserProfile } from '@clerk/clerk-react';

import './home.css'


function Home() {
  const [isProfileVisible, setProfileVisible] = useState(false);

  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (
    <div className='app'>
      <div className='right-image'>
     <div className='title'><h1>Control Board</h1></div>
     
      <br/>
      <div className='background-control-board'>
      <button onClick={toggleProfile}> 
        {isProfileVisible ? 'Hide Profile' : 'Show Profile'}
      </button> <SignOutButton/>
      {isProfileVisible && <UserProfile />}
      
      <div className="control-board">
      
    <div className="center-circle">
      <div className="control-item sitrep">
        <Link to="/sitrep"><h3>Sitrep</h3></Link>
      </div>
      <div className="control-item nineline">
        <Link to="/nineline"><h3>9-line</h3></Link>
      </div>
      <div className="control-item uxo-report">
        <Link to="/location"><h3>Location</h3></Link>
      </div>
      </div>
      
    </div>
    </div>
  </div>
      
    </div>
    
   
  );
}

export default Home;
