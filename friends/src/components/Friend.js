// Adds Friend card styles
import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Friend = (props) => {
  console.log('Friend', props)
  const [friend, setFriend] = useState({})

  useEffect(() => {
    axiosWithAuth().get(`${props.match.url}`)
    .then(res => {
      console.log('res friend', res.data)
      setFriend(res.data)
    })
    .catch(err => {
      console.log(err)
      })
    }, [props.match.url])

  return (
    <div>
      <h2>{friend.name}</h2>
      <p>age: {friend.age}</p>
      <p>email: {friend.email}</p>
    </div>
  )
}

export default Friend; 