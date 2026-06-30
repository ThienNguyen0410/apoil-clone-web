import React from 'react'
import {useState, useEffect} from 'react'
import {UserOutlined} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import {Dropdown} from 'antd'
import { useNavigate } from 'react-router-dom'

import vnFlag from '../assets/vnFlag.png'
import enFlag from '../assets/enFlag.png'

import { useAppDispatch, useAppSelector } from '../presenters/hooks'
import { setLanguage } from '../presenters/slices/localeSlice'
import './header.scss'


type HeaderProps = {
  name: string;
}

const moduleNameMap: { [key: string]: { name: string; icon: React.ReactNode } } = {
    "Customers": {
      name: "Customers",
      icon: <UserOutlined/>
    }
}
export default function Header({ name }: HeaderProps) {
  //const [language, setLanguage] = useState('VIE')
  //const [flag, setFlag] = useState(vnFlag)
  //items for selected module
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {language} = useAppSelector((state) => state.locale)

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
      key: 'EN',
      label: <span className="dropdown-item"><img src={enFlag} alt="EN" className="flag-icon" /> ENG</span>
    }
  ]



  const moduleName = moduleNameMap[name] || { name: name, icon: null }
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
      <div className="breadcrumbs-info">
        <span className="module-icon"> {moduleName.icon} </span>
        <span className="module-name">{t(moduleName.name)}</span>
      </div>

      <div className='icon-intro-box' onClick={(e) => e.stopPropagation()}>
        <div className="selected-box">
          <Dropdown
          menu={{
            items,
            onClick: (e) => OnSwitchLanguage && OnSwitchLanguage(e.key)
          }}>
            <span className="language-switcher"><img src={flag} alt={language} className="flag-icon" /> {language}</span>
          </Dropdown>
        </div>

        <div className="avatar-navigate" onClick={() => navigate("/profile")}>
          <UserOutlined/>
        </div>
      </div>
    </div> 
  )
}
