import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import './profile.scss'

export default function Profile() {
  const [userName, setUserName] = useState('Nguyễn Văn A')
  const [fullName, setFullName] = useState('Nguyễn Văn A')
  const [phoneNumber, setPhoneNumber] = useState('0123456789')
  const [email, setEmail] = useState('abc123@gmail.com')
  const navigate = useNavigate()
  return (

    <div className="profile-content">
      <div className="profile-body">
        <h1>Thông tin cá nhân</h1>
        <div className="profile-container">
          <div className="profile-avatar">
              <img src={avatar} alt="Avatar"></img>
          </div>
          <div className="profile-info">
            <p>Tên đăng nhập</p>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
            <p>Họ và tên</p>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
            <p>Số điện thoại</p>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
            <p>Email</p>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>  
        </div>
        <button
        className="back-button"
        onClick={() => navigate("/dashboard")}>Quay lại
        </button>
      </div>
    </div>
  )
}
