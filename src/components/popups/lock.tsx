import React from 'react'
import { useState } from 'react'
import {Modal, Input, Button} from 'antd'
import {LockOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import LockPopups from '../icons/LockPopups'
import './lock.scss'

type LockProps = {
    open: boolean,
    setOpen: (v: boolean) => void,
    handleChangePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => void,
}

export default function LockPopup({open, setOpen, handleChangePassword}: LockProps) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {t} = useTranslation()
  return (
    <Modal
    width={708}
    open={open}
    footer={null}
    closable={true}
    centered
    className="lock-modal"
    onCancel={() => setOpen(false)}
    >
        <div className="lock-modal">
          <div className="lock-header">
            <h2>{t("Reset pass")}</h2>
            <p>{t("Reset_str")}</p>
          </div>

          <div className="lock-body">
            <Input.Password 
              placeholder={t("enter old password")}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              prefix={<LockPopups />}
              className="old-password"
            />

            <Input.Password placeholder={t("enter new password")}
            prefix={<LockPopups />}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="new-password"
            />

            <Input.Password placeholder={t("confirm new password")}
            prefix={<LockPopups />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="confirm-password"
            />
          </div>

          <div className="btn">
            <button onClick={() => handleChangePassword(oldPassword, newPassword, confirmPassword)}>{t("change password")}</button>
          </div>
        </div>
        

    </Modal>
  )
}
