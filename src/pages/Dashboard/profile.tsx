import React from 'react'
import {useState, useEffect} from 'react'
import './profile.scss'
import ProfileNav from '../../components/profileNav'
import avatar from '../../assets/avatar.png'
import {useNavigate} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../presenters/hooks'
import { fetchMyProfile } from '../../presenters/slices/profileSlice'

export default function profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useAppDispatch()
  const {profile} = useAppSelector((s) => s.profile)


  useEffect(() => {
    dispatch(fetchMyProfile())
  }, [dispatch])

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h2 className="title">Personal Information</h2>

        <div className="profile-user-box">
          <div className="profile-user-form">
            <div className="avt-role">
              <img src={avatar} alt="Avatar" />
              <h2>{profile?.fullname}</h2>
            </div>

            <div className="profile-form-box">
              <label>Tên đăng nhập</label>
              <input id="username-input" type="text" placeholder="Tên đăng nhập"
              disabled={true}
              value={profile?.username}
              />

              <label>Họ và tên</label>
              <input id="name-input" type="text" placeholder="Họ và tên"
              value={profile?.fullname}
              disabled={!isEditing}
              />

              <label>Số điện thoại</label>
              <input id="phone-input" type="text" placeholder="Số điện thoại"
              disabled={!isEditing}
              value={profile?.phone_number}
              />

              <label>Email</label>
              <input id="email-input" type="text" placeholder="Email"
              disabled={!isEditing}
              value={profile?.email}
              />
            </div>
          </div>
          <div profile-nav>
            <ProfileNav />
          </div>
        </div>

        <div className="wrap-btn">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>Quay lại</button>
        </div>
      </div>
    </div>
  )
}
