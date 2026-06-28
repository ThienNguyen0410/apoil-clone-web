import React from 'react'
import {useState, useEffect} from 'react'
import './profile.scss'
import avatar from '../../assets/avatar.png'
import {useNavigate} from 'react-router-dom'
export default function profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h2 className="title">Personal Information</h2>

        <div className="profile-user-box">
          <div className="profile-user-form">
            <div className="avt-role">
              <img src={avatar} alt="Avatar" />
              <h2>Admin</h2>
            </div>

            <div className="profile-form-box">
              <label>Tên đăng nhập</label>
              <input id="username-input" type="text" placeholder="Tên đăng nhập"
              disabled={!isEditing}
              />

              <label>Họ và tên</label>
              <input id="name-input" type="text" placeholder="Họ và tên"
              disabled={!isEditing}
              />

              <label>Số điện thoại</label>
              <input id="phone-input" type="text" placeholder="Số điện thoại"
              disabled={!isEditing}
              />

              <label>Email</label>
              <input id="email-input" type="text" placeholder="Email"
              disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="wrap-btn">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>Quay lại</button>
        </div>
      </div>
    </div>
  )
}
