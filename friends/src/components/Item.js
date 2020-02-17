// Adds ability to edit individual friends
import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';

import '../App.css'

const Item = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState()
  const [friend, setFriend] = useState({
    name: '',
    age: '',
    email: ''
  })

  const handleDelete = (friendId) => {
    console.log(friendId)
    axiosWithAuth().delete(`/friends/${friendId}`)
    .then(res => {
      console.log(res)
      props.setFriends(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    e.preventDefault()
    setFriend({
      ...friend, 
      [e.target.name]: e.target.value
    })
  }

  const handleEdit = (friendId) => {
    console.log(friendId)
    setIsEditing(!isEditing)
    setEditID(friendId)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axiosWithAuth().put(`/friends/${editID}`, friend)
    .then(res => {
      props.setFriends(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="item">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => handleEdit(props.friend.id)}>Edit</button>
        <button onClick={() => handleDelete(props.friend.id)}>X</button>
      </div>
      <h2>{props.friend.name}</h2>
      <p>age: {props.friend.age}</p>
      <p>email: {props.friend.email}</p>
      <Link to={`friends/${props.friend.id}`}>Visit</Link>

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={friend.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="age"
            placeholder="age"
            value={friend.age}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={friend.email}
            onChange={handleChange}
            required
          />
          <button onClick={handleSubmit}>Edit Friend</button>
        </form>
      )}
    </div>
  )
}

export default Item; 