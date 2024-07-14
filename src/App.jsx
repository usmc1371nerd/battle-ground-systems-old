import { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser} from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';




function App() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/home');
    }
  }, [isSignedIn, navigate]);

  return (
    <>
      
    <div className="title"> 
      
      <h1>Welcome to Ground Combat System </h1>
    
    </div>
   

        
      <SignedOut>
      <SignInButton />
      </SignedOut>
      <SignedIn>
      <UserButton />
      </SignedIn> 

      <div className="sign-in-title"><h5>Please log-in using your gmail account</h5></div>
    

 
    
    </>
    
    
  )
}

export default App
