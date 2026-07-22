import { useState, useEffect } from 'react'
import {useTranslation} from 'react-i18next'
import { Layout, Menu } from 'antd'
import {
  UserOutlined, ApartmentOutlined, DollarOutlined, SettingOutlined,
 ExclamationCircleOutlined, QrcodeOutlined,

} from '@ant-design/icons'
import MoreOutlined from '../../components/icons/MoreOutlined'
import Homeicon from '../../components/icons/Homeicon'
import  Cubeicon from '../../components/icons/Cubeicon'
import logo from '../../assets/logo.png'
import DashboardContent from '../../components/Customers/index'
import UserPage from '../../components/System-settings/Users/index'
import DevicePage from '../../components/Devices/index'
import './Dasboard.scss'
const { Sider, Header, Content } = Layout

export default function Dashboard() {
  const {t} = useTranslation()
  const [selectedKey, setSelectedKey] = useState('users')
  const [collapsed, setCollapsed] = useState(false)
 

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1199px)')
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setCollapsed(true)
    }
    handler(mq)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])


  useEffect(() => {
    const storedKey = localStorage.getItem('selectedKey')
    if (storedKey) {
      setSelectedKey(storedKey)
    }
  },[])

  

  return (
    <Layout className="dashboard-layout" style={{ minHeight: '100vh' }}>
      <Sider width={311} collapsedWidth={86} collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null} className="side-bar">
        <img className="logo" src={logo} alt="logo" />
        <Menu
          onClick={(e) => { setSelectedKey(e.key); setCollapsed(false); localStorage.setItem('selectedKey', e.key) }}
          className="side-menu"
          theme="dark"
          mode="vertical"
          selectedKeys={[selectedKey]}
          triggerSubMenuAction="hover"
          expandIcon={<MoreOutlined />}
          items={[
            { key: 'dashboard', icon: <Homeicon />, label: t('Dashboard') },
            { key: 'devices', icon: <ApartmentOutlined style={{fontSize: "24px"}} />, label: t('Device') },
            { key: 'revenue', icon: <DollarOutlined style={{fontSize: "24px"}} />, label: t('Revenue') },
            { key: 'errors', icon: <ExclamationCircleOutlined style={{fontSize: "24px"}} />, label: t('Errors') },
            { key: 'customers', icon: <UserOutlined style={{fontSize: "24px"}} />, label: t('Customers') },
           
            {key: 'oil_type', icon: <Cubeicon/>, label: t('Oil type') },
            {
              key: 'code_management',
              icon: <QrcodeOutlined style={{fontSize: "24px"}} />,
              label: t('Code management'),
              popupClassName: 'side-menu-popup popup-code-management',
              popupOffset:[5, 0],
              children: [
                {
                  key: "discount-codes",
                  label: t('Discount Code')
                },

                {
                  key: "voucher-program",
                  label: t('Voucher Program')
                },
                {
                  key: "referral-code",
                  label: t('Referral Code')
                }
              ]
            },

            {
              key: 'system-settings',
              icon: <SettingOutlined style={{fontSize: "24px"}} />,
              label: t('System settings'),
              popupClassName: 'side-menu-popup popup-system-settings',
              popupOffset:[5, 0],
              children: [
                {
                  key: "device-group",
                  label: t('Device Group'),
                },

                {
                  key: "vehicle-brand",
                  label: t('Vehicle Brands'),
                },

                {
                  key: "vehicle-model",
                  label: t('Vehicle Models'),
                },
                {
                  key: "instruction-video",
                  label: t('Instruction Videos'),
                },

                {
                  key: "system-password",
                  label: t('System password'),
                },
                {
                  key: "user",
                  label: t('User'),
                },
                {
                  key: "role",
                  label: t('Role'),
                },
                {
                  key: "loyalty-point-setting",
                  label: t('Loyalty Point Settings'),
                }
              ]
            },
          ]}
        />
      </Sider>

      <Layout onClick={() => setCollapsed(true)} className="content-layout">
        <Header className="header-content" >
        </Header>
        <Content  className="content-box">
          <div className='module-content' onClick={() => setCollapsed(true)} >
              {selectedKey === 'customers' && 
              <DashboardContent collapsed={collapsed}
              />}
              {selectedKey === 'user' && 
              <UserPage collapsed={collapsed}/> 
              }

              {
                selectedKey === 'devices' && <DevicePage collapsed={collapsed}/>
              }

          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
