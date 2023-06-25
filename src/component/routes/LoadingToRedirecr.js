import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
const LoadingToRedirect = () => {
    
    const [count, setCount] = useState(5);
    let navigate = useNavigate();
 
    //useEffect runs everytime when the count changes.
    useEffect(() => {
 
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount-1);
        }, 1000);
        
        //Redirect once count == 0
        count === 0 && navigate("/");
        //cleanup
        return () => clearInterval(interval);
 
    }, [count, navigate]); 
 
    return (
        <div className="container p-5 text-center">
            <p>Redirecting you in {count} second(s)...</p>
        </div>
    )
};
 
export default LoadingToRedirect;