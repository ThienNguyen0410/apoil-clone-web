import {useState, useEffect} from 'react'
import './profile.scss'
import ProfileNav from '../../components/ProfileNav'
import LogoutPopup from '../../components/popups/logout'
import LockPopup from '../../components/popups/lock'
import avatar from '../../assets/avatar.png'
import {useNavigate} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../presenters/hooks'
import { fetchMyProfile, updateProfile, changePassword } from '../../presenters/slices/profileSlice'
import { logout } from '../../presenters/slices/authSlice'
import { useTranslation } from 'react-i18next'

export default function profile() {
  const navigate = useNavigate()
  const [openLogout, setOpenLogout] = useState(false)
  const [openLock, setOpenLock] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  //const [isChangPassword, setIschangePassword] = useState(false)
  const [formData, setFormData] = useState({ fullname: '', phone_number: '', email: '' })

  const dispatch = useAppDispatch()
  const {profile} = useAppSelector((s) => s.profile)
  const {t} = useTranslation()

  useEffect(() => {
    dispatch(fetchMyProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || '',
        phone_number: profile.phone_number || '',
        email: profile.email || '',
      })
    }
  }, [profile])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const saveProfile = () => {
    dispatch(updateProfile(formData))
    setIsEditing(false)
  }

  const cancelEdit = () => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || '',
        phone_number: profile.phone_number || '',
        email: profile.email || '',
      })
    }
    setIsEditing(false)
  }

  const handleChangePassword = (oldPassword: string, newPassword: string, confirmPassword: string) => {
    // Implement change password logic here
    if (newPassword !== confirmPassword) {
      alert(t("New password and confirm password do not match"))
      return
    }

    dispatch(changePassword({oldPassword, newPassword}))
    .unwrap()
    .then(() => {
      alert(t("Password changed successfully"))
      setOpenLock(false)
    }
    )
    .catch((error) => {
      alert(t("Failed to change password: ") + error)
    })
  }

  console.log("Open Lock: ", openLock)
  return (
    <div className="profile-page">
      <div className="profile-content">
        <h2 className="title">{t("Personal Information")}</h2>

        <div className="profile-user-box">
          <div className="profile-user-form">
            <div className="avt-role">
              <img src={avatar} alt="Avatar" />
              <h2>{profile?.fullname}</h2>
            </div>

            <div className="profile-form-box">
              <label>{t("Username")}
                <span style={{color: "red"}}>*</span>
              </label>
              <input id="username-input" type="text" placeholder={t("Username")}
              disabled={true}
              value={profile?.username}
              />

              <label>{t("Full Name")}
                <span style={{color: "red"}}>*</span>
              </label>
              <input id="name-input" type="text" placeholder={t("Full Name")}
              value={formData.fullname}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              />

              <label>{t("Phone Number")}</label>
              <input id="phone-input" type="text" placeholder={t("Phone Number")}
              disabled={!isEditing}
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />

              <label>{t("Email")}
                <span style={{color: "red"}}>*</span>
              </label>
              <input id="email-input" type="text" placeholder={t("Email")}
              disabled={!isEditing}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <ProfileNav onLogout={() => setOpenLogout(true)}
                        onEdit={() => setIsEditing(true)}
                        onChangePassword={() => setOpenLock(true)}
              />
          </div>
        </div>

        <div className="wrap-btn">
          {isEditing ? 
        (
          <div className="save-cancel-btn">

             <button className="cancel-btn" onClick={cancelEdit}>
              {t("Cancel")}
             </button>

             <button className= "save-btn" onClick={saveProfile}>
              {t("Save")}
             </button>

            
          </div>
        ) 
          : (<button className="back-btn" onClick={() => navigate("/dashboard")}>{t("Back")}</button>)
          }
        </div>
      </div>

      <LogoutPopup
        open={openLogout}
        setOpen={setOpenLogout}
        handleLogout={handleLogout}
      />

      <LockPopup
        open={openLock}
        setOpen={setOpenLock}
        handleChangePassword={handleChangePassword}
      />
    </div>
  )
}
