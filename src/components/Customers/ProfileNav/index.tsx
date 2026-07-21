import './index.scss'
import {LogoutOutlined, EditOutlined,LockOutlined } from '@ant-design/icons'
import Editicon from '../../icons/Editicon'
import Lockicon from '../../icons/Lockicon'
import Logouticon from '../../icons/Logouticon'

interface ProfileNavProps {
  onLogout?: () => void;
  onEdit?:() => void;
  onChangePassword?:() => void;
}

export default function ProfileNav({ onLogout, onEdit, onChangePassword }: ProfileNavProps) {
  return (
    <div className = "profile-nav">
        <div className="edit-nav" id="item" onClick={onEdit}>
            <div className="edit-icon"> 
                <Editicon />
            </div>
        </div>

        <div className="lock-nav" id="item" onClick={onChangePassword}>
            <div className="lock-icon">
                <Lockicon />
            </div>
        </div>

        <div className="logout-nav" id="item" onClick={onLogout}>
            <div className="logout-icon">
                <Logouticon />
            </div>
        </div>
    </div>
  )
}
