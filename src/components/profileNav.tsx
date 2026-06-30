import './profileNav.scss'
import {LogoutOutlined, EditOutlined,LockOutlined } from '@ant-design/icons'

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
                <EditOutlined />
            </div>
        </div>

        <div className="lock-nav" id="item" onClick={onChangePassword}>
            <div className="lock-icon">
                <LockOutlined />
            </div>
        </div>

        <div className="logout-nav" id="item" onClick={onLogout}>
            <div className="logout-icon">
                <LogoutOutlined />
            </div>
        </div>
    </div>
  )
}
