// In my FriendsList component, rendered with <ProtectedRoute/>, I will create a list of my friends that I get from the API. 
// Add form for updating
import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Item from './Item';
import Spinner from '../components/Spinner';

import '../App.css';

const Friends = () => {

  const [isLogginIn, setLoggingIn] = useState(true);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({
    name: "", 
    age: "",
    email: ""
  });
  
  // fetch initial data - but it's protected! Use axiosWithAuth to send the token on the header of the request
  useEffect(() => {
    axiosWithAuth().get('/friends')
    .then(res => {
      console.log(res.data)
      setFriends(res.data)
      setLoggingIn(false)
    })
    .catch(err => {
      console.log(err)
    })
  }, [newFriend])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newFriend)
    axiosWithAuth().post('/friends', newFriend)
    .then(res => {
      console.log(res)
      setNewFriend({
        name: '',
        age: '',
        email: ''
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleChange = (e) => {
    setNewFriend({
      ...newFriend,
      [e.target.name]: e.target.value
      })
    }

  return( 
    <div>
      <h1>Friends</h1>
        <div className="friends">
          {isLogginIn ? (
            <Spinner />
          ) :
            (friends.map(friend => 
              <Item
                key={friend.id}
                friend={friend}
                setFriends={setFriends}
              />
            ))}
        </div>

      <form onSubmit={handleSubmit} className="forms">
        <h2>Add New Friend</h2>
        <input
          type="text"
          name="name"
          palceholder="name"
          value={newFriend.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="age"
          palceholder="age"
          value={newFriend.age}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          palceholder="email"
          value={newFriend.email}
          onChange={handleChange}
        />

        <button className='Button'>Add Friend</button>
      </form>
    </div>
  );
};
    
export default Friends;