import React from 'react'
import {useState} from 'react'
import {UserOutlined, ApartmentOutlined, DollarOutlined, SettingOutlined} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import {Select, Dropdown} from 'antd'
import FlagVietnamIcon from '../icons/vi'
import FlagUsOutlyingIslandsIcon from '../icons/us'
import { useNavigate } from 'react-router-dom'
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

  const [language, setLanguage] = useState('VIE')
  const [flag, setFlag] = useState(<FlagVietnamIcon size={20} />)
  //items for selected module
  const navigate = useNavigate()
  const items = [
    {
      key: 'VIE',
      label: <span className="dropdown-item"><FlagVietnamIcon size={20} /> VIE</span>
    },
    {
      key: 'EN',
      label: <span className="dropdown-item"><FlagUsOutlyingIslandsIcon size={20} /> ENG</span>
    }
  ]



  const moduleName = moduleNameMap[name] || { name: name, icon: null }
  const {t, i18n} = useTranslation()

  function OnSwitchLanguage(language: string) {
    if (language === 'VIE') {
      i18n.changeLanguage('vi')
    }
    else if (language === 'EN') {
      i18n.changeLanguage('en')
    }
    setLanguage(language)
    setFlag(language === 'VIE' ? <FlagVietnamIcon size={20} /> : <FlagUsOutlyingIslandsIcon size={20} />)
  }
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
            <span className="language-switcher">{flag} {language}</span>
          </Dropdown>
        </div>

        <div className="avatar-navigate">
          <UserOutlined onClick={() => navigate("/profile")}/>
        </div>
      </div>
    </div> 
  )
}
