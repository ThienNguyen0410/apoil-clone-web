import {useState, useEffect} from 'react'
import {DownOutlined, SettingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import {Dropdown, Breadcrumb} from 'antd'
import { useNavigate } from 'react-router-dom'
import Separator from '../../icons/Separator'
import Setting from '../../icons/Setting'


import vnFlag from '../../../assets/vnFlag.png'
import enFlag from '../../../assets/enFlag.png'

import { useAppDispatch, useAppSelector } from '../../../presenters/hooks'
import { setLanguage } from '../../../presenters/slices/localeSlice'
import './index.scss'


export default function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {language} = useAppSelector((state) => state.locale)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {profile} = useAppSelector((s) => s.profile)

  useEffect(() => {
    if (language === 'VIE') {
      i18n.changeLanguage('vi')
    }

    else {
      i18n.changeLanguage('en')
    }
  },[language])

  const items = [
    {
      key: 'VIE',
      label: <span className="dropdown-item"><img src={vnFlag} alt="VN" className="flag-icon" /> VIE</span>
    },
    {
      key: 'ENG',
      label: <span className="dropdown-item"><img src={enFlag} alt="EN" className="flag-icon" /> ENG</span>
    }
  ]

  const {t, i18n} = useTranslation()

  function OnSwitchLanguage(language: string) {
    if (language === 'VIE') {
      dispatch(setLanguage('VIE'))
    }

    else dispatch(setLanguage('ENG'))
  }

  const flag = language === 'VIE' ? vnFlag : enFlag
  return (
    <div className="breadcrumb-box"> 
      <div className="breadcrumb-info">
        <Breadcrumb
          separator= <Separator/>
          items={[
            {
                title: 
                <div className="breadcrumb-tabs">
                    <Setting/>
                    {t("System settings")}
                </div>
            },

            {
                title: <span>{t("List of user")}</span>
            }
          ]}
        
        />
      </div>

      <div className='icon-intro-box' onClick={(e) => e.stopPropagation()}>
        <div className="selected-box">
          <Dropdown
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
          menu={{
            items,
            onClick: (e) => OnSwitchLanguage && OnSwitchLanguage(e.key),
            selectedKeys: [language],
          }}>
            <span className={`language-switcher${dropdownOpen ? ' language-switcher--open' : ''}`} style={{ fontWeight:"600"}}><img src={flag} alt={language} className="flag-icon" /> {language} 
            <div className="down-outline"
            style={{color: "#228049"}}
            >
              <DownOutlined />
            </div>
            </span>
          </Dropdown>
        </div>

        <div className="avatar-navigate" onClick={() => navigate("/profile")}>
          <img src={profile?.avatarPath} alt="Avatar" />
        </div>
      </div>
    </div> 
  )
}
