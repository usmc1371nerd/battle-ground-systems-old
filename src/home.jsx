import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton, UserProfile } from '@clerk/clerk-react';

function Home() {
  const [isProfileVisible, setProfileVisible] = useState(false);

  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (
    <div>
      <h1>Utility Board</h1>
      <button onClick={toggleProfile}>
        {isProfileVisible ? 'Hide Profile' : 'Show Profile'}
      </button>
      {isProfileVisible && <UserProfile />}

      <div className="control-board">
        <div className="sitrep">
          <Link to="/sitrep"><h3>Sitrep</h3></Link>
        </div>

        <div className="nineline">
          <Link to="/nineline"><h3>9-line</h3></Link>
        </div>

        <div className="uxo-report">
          <Link to="/uxoreport"><h3>UXO</h3></Link>
        </div>
      </div>
      <div className="signout"> <SignOutButton/></div>
    </div>
    
   
  );
}

export default Home;
