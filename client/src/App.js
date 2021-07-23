import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './componenets/Login';
import Notes from './componenets/Notes';
import './index.css'


function App() {
  const [isLogin,setIsLogin] = useState(false)

  useEffect(() => {
    const checkLogin = async() =>{
      const token = localStorage.getItem('tokenStore')
      if(token){
        const verified = await axios.get('/users/verify',{
          headers:{ Authorization:token}
        })
        console.log(verified)
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()
      }else{
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div >
    <div >
    <div className="App">
    <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
      {
        isLogin 
        ? <Notes setIsLogin={setIsLogin} /> 
        : <Login setIsLogin={setIsLogin} />
      }
    </div>
    </div>
    </div>
   
  );
}

export default App;
