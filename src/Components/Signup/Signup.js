import React, { useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { firebaseContext } from '../../store/Context';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import Logo from '../../olx-logo.png';
import Loading from '../Loading/Loading';
import './Signup.css';

export default function Signup() {
  const [loading,setLoading] = useState(false)
  const [errMsg,setMsg] = useState('')
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const {auth,db} = useContext(firebaseContext)
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    if(!username.match(/[A-Za-z].{3,}/)){
      setLoading(false)
      setMsg('Username at least three characters')
    }else{
      createUserWithEmailAndPassword(auth,email,password).then((result)=>{
        updateProfile(result.user, { displayName: username }).then(()=>{
          addDoc(collection(db,"users"),{
            id:result.user.uid,
            username:username,
            phone:phone
          }).then(()=>{
            navigate("/login")
          }).catch((e)=>{
            console.log(e)
          })
        })
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setMsg(error.message.replace('Firebase:',''))
      })
    } 
  }

  return (
    <div>
      {loading ? <Loading /> :
        <div>
          <p className='errorMsg'>{errMsg}</p>
          <div className="signupParentDiv">
          <img width="200px" height="200px" src={Logo} alt='' />
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="name"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
            <br />
            <label htmlFor="userEmail">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="userEmail"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <br />
            <label htmlFor="phoneN">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              id="phoneN"
              name="phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <button>Signup</button>
          </form>
          <Link to='/login' >Login</Link>
        </div>
      </div>
    }
    </div>
  )
}
