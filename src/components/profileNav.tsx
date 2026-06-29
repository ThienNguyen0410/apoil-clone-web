import React from 'react'
import './profileNav.scss'
import {LogoutOutlined, EditOutlined,LockOutlined } from '@ant-design/icons'

export default function ProfileNav() {
  return (
    <div className = "profile-nav">
        <div className="edit-nav" id="item">
            <div className="edit-icon"> 
                <EditOutlined />
            </div>
        </div>

        <div className="lock-nav" id="item">
            <div className="lock-icon">
                <LockOutlined />
            </div>
        </div>

        <div className="logout-nav" id="item">
            <div className="logout-icon">
                <LogoutOutlined />
            </div>
        </div>
    </div>
  )
}
