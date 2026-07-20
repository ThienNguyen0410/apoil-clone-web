import {useState, useEffect} from 'react'
import type UserEntities from '../../../../entities/user/entity';
import {Modal, Upload, Button, Select} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import Eyevisible from '../../../icons/Eyevisible'
import Eyeinvisible from '../../../icons/Eyeinvisible'
import { useAppDispatch } from '../../../../presenters/hooks';
import { updateUserById, addUser } from '../../../../presenters/slices/userSlice';
import {useTranslation} from 'react-i18next'
import './ProfilePopup.scss'


type ProfilePopupProps = {
  openProfile: boolean,
  setOpenProfile: (v: boolean) => void
  ViewMode: boolean,
  AddMode: boolean,
  UserData: UserEntities | null
  roleOptions: { value: any; label: string }[]

}

export default function ProfilePopup({openProfile, setOpenProfile, ViewMode, AddMode, UserData, roleOptions}:ProfilePopupProps) {
  const {t} = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [previewUrl, setPreviewUrl] = useState('')

  const statusOptions = [
    {value: true, label: t('Active')},
    {value: false, label: t('Inactive')},
  ]

  const initialFormState = {
    username: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    role: '',
    phone: '',
    email: '',
    idNumber: '',
    address: '',
    status: 1,
    avatarPath: ''
  }

  const [Form, setForm] = useState(initialFormState)

  const dispatch = useAppDispatch()

  const resetForm = () => {
    setForm(initialFormState)
    setImageFile(undefined)
    setPreviewUrl('')
  }

  useEffect(() => {
    if (UserData && !AddMode) {
      setForm({
        ...initialFormState,
        username: UserData.username || '',
        fullname: UserData.fullname || '',
        role: UserData.roleID || '',
        phone: UserData.phone_number || '',
        email: UserData.email || '',
        idNumber: UserData.id_num || '',
        address: UserData.address || '',
        status: UserData.status === 1 ? 1 : 2,
      })
    }
  }, [UserData])

  const getHeaderText = () => {
    if (ViewMode) return t('User Information')
    if (AddMode) return t('Create User')
    return t('Update User')
  }

  const isDisabled = ViewMode

  //Update Profile Function
  const HanldeUpdateProfile = () => {
    dispatch(updateUserById({
      id: localStorage.getItem("UserInfoID") ?? '',
      username: Form.username,
      password: Form.password,
      fullname: Form.fullname,
      roleID: Form.role,
      phone_number: Form.phone,
      email: Form.email,
      id_num: Form.idNumber,
      address: Form.address,
      status: Form.status,
      avatarFile: imageFile 
    }))

    resetForm()
    setOpenProfile(false)
    localStorage.setItem("ProfilePopupState", JSON.stringify(false))
  }

  const handleAddUser = () => {
     dispatch(addUser({
      id: localStorage.getItem("UserInfoID") ?? '',
      username: Form.username,
      password: Form.password,
      fullname: Form.fullname,
      roleID: Form.role,
      phone_number: Form.phone,
      email: Form.email,
      id_num: Form.idNumber,
      address: Form.address,
      status: Form.status,
      avatarFile: imageFile 
    }))
    resetForm()
    setOpenProfile(false)
    localStorage.setItem("ProfilePopupState", JSON.stringify(false))
  }

  return (
      <Modal
      width={900}
      open={openProfile}
      footer={null}
      closable={false}
      centered
      className="profile-popup"
      getContainer={false}
      onCancel={() => {
        resetForm()
        setOpenProfile(false)
        localStorage.setItem("ProfilePopupState", JSON.stringify(false))
        localStorage.setItem("ProfilePopupViewMode", JSON.stringify(false))
      }}
      >

      <div className="profile-popup-header">
        <h1>{getHeaderText()}</h1>
      </div>

      <div className="profile-popup-body">
        <div className="profile-popup-body1"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "none"
        }}
        >
        <div className="profile-input" id="username">
          <label>{t('Username')}
            <span style={{color: "red", marginLeft:"5px"}}>*</span>
          </label>
          <input disabled={!AddMode}
          type="text"
          value={Form.username}
          onChange={(e) => setForm(prev => ({...prev, username: e.target.value}))}
          required
          />
        </div>

        <div className="profile-input" id="password">
          <label>{t('Password')}:
          </label>
          <div className="password-input-wrapper">
            <input disabled={isDisabled}
            type={showPassword ? "text" : "password"}
            placeholder={AddMode ? t('Enter password') : ""}
            value={Form.password}
            onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eyevisible/> : <Eyeinvisible/>}
            </span>
          </div>
        </div>

        <div className="profile-input" id="password-confirm">
          <label>{t('Confirm Password')}
          </label>
          <div className="password-input-wrapper">
            <input disabled={isDisabled}
            type={showConfirmPassword ? "text" : "password"}
            placeholder={AddMode ? t('Enter confirm password') : ""}
            value={Form.confirmPassword}
            onChange={(e) => setForm(prev => ({...prev, confirmPassword: e.target.value}))}
            />
            <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <Eyevisible/> : <Eyeinvisible/>}
            </span>
          </div>
        </div>

        <div className="profile-input" id="full-name">
          <label>{t('Full Name')}
            <span style={{color: "red", marginLeft:"5px"}}>*</span>
          </label>
          <input disabled={isDisabled}
          type="text"
          value={Form.fullname}
          onChange={(e) => setForm(prev => ({...prev, fullname: e.target.value}))}
          required
          />
        </div>

        <div className="profile-input" id="Role">
          <label>{t('Role')}
            <span style={{color: "red", marginLeft:"5px"}}>*</span>
          </label>
          <Select
          className="profile-select"
          disabled={isDisabled}
          options={roleOptions}
          placeholder={t('Select Role')}
          value={Form.role || undefined}
          onChange={
            (v) => setForm(prev => ({...prev, role: v}))
          }
          aria-required
          />
        </div>

        <div className="profile-input" id="image">
          <label>{t('Image')}:</label>
          <Upload disabled={isDisabled}
          maxCount={1}
          showUploadList={false}
          beforeUpload={(file) => {
            setImageFile(file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)

            //Prevent <Upload/> from automatically uploading to server 
            return false;
          }}
          >
            <Button disabled={isDisabled} icon={<UploadOutlined/>}>
            <span>{t('Choose File')}</span>
            </Button>
          </Upload>
        </div>
        </div>

        <div className="profile-popup-body2"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
        >
        <div className="profile-input" id="phone">
          <label>{t('Phone Number')}
          </label>
          <input disabled={isDisabled}
          type="text"
          placeholder={t('Enter phone number')}
          value={Form.phone}
          onChange={(e) => setForm(prev => ({...prev, phone: e.target.value}))}
          />
        </div>

        <div className="profile-input" id="email">
          <label>Email
            <span style={{color: "red", marginLeft:"5px"}}>*</span>
          </label>
          <input disabled={isDisabled}
          type="text"
          value={Form.email}
          onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
          required
          />
        </div>

        <div className="profile-input" id="id-number">
          <label>{t('ID Number')}
          </label>
          <input disabled={isDisabled}
          type="text"
          placeholder={t('Enter ID number')}
          value={Form.idNumber}
          onChange={(e) => setForm(prev => ({...prev, idNumber: e.target.value}))}
          />
        </div>

        <div className="profile-input" id="address">
          <label>{t('Address')}
          </label>
          <input disabled={isDisabled}
          type="text"
          placeholder={t('Enter address')}
          value={Form.address}
          onChange={(e) => setForm(prev => ({...prev, address: e.target.value}))}
          />
        </div>

        <div className="profile-input" id="status">
          <label>
            {t('Activity Status')}
            <span style={{color: "red", marginLeft:"5px"}}>*</span>
          </label>
          <Select
          className="profile-select"
          disabled={isDisabled}
          options={statusOptions}
          placeholder={t('Select Status')}
          value={Form.status === 1 }
          onChange={(v) => {
            const status = v === true ? 1 : 2;
            setForm(prev => ({...prev, status: status}))
          }}
          aria-required
          />
        </div>

        <span className="required-note">
          <span style={{color: "red"}}>*</span> {t('Required field')}
        </span>
        </div>
      </div>

      {ViewMode ? (
        <div className="profile-btn">
          <button className="close-btn"
          onClick={() => {
            resetForm()
            setOpenProfile(false)
            localStorage.setItem("ProfilePopupState", JSON.stringify(false))
            localStorage.setItem("ProfilePopupViewMode", JSON.stringify(false))
          }}
          >{t('Close')}
          </button>
        </div>
      ) : AddMode ? (
        <div className="profile-btn">
          <button className="cancel-btn"
          onClick={() => {
              resetForm()
              setOpenProfile(false)
              localStorage.setItem("ProfilePopupState", JSON.stringify(false))
              localStorage.setItem("ProfilePopupViewMode", JSON.stringify(false))
            }}
            >{t('Cancel')}
          </button>
          <button className="update-btn"
          onClick={handleAddUser}
          >{t('Add')}</button>
        </div>
      ) : (
        <div className="profile-btn">
          <button className="cancel-btn"
          onClick={() => {
              resetForm()
              setOpenProfile(false)
              localStorage.setItem("ProfilePopupState", JSON.stringify(false))
              localStorage.setItem("ProfilePopupViewMode", JSON.stringify(false))
            }}
            >{t('Cancel')}
          </button>
          <button className="update-btn"
          onClick={HanldeUpdateProfile}
          >{t('Update')}</button>
        </div>
      )}
      </Modal>
  )
}
