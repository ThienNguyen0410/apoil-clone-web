import { useState, useEffect } from 'react'
import {useTranslation} from 'react-i18next'
import { Layout, Menu } from 'antd'
import {
  UserOutlined, ApartmentOutlined, DollarOutlined, SettingOutlined,
  HomeOutlined, ExclamationCircleOutlined, CodeSandboxOutlined, QrcodeOutlined 
} from '@ant-design/icons'
import logo from '../../assets/logo.png'
import DashboardContent from '../../components/dashboardTable'
import './dasboard.scss'
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
          items={[
            { key: 'dashboard', icon: <HomeOutlined />, label: t('Dashboard') },
            { key: 'equipments', icon: <ApartmentOutlined />, label: t('Device') },
            { key: 'revenue', icon: <DollarOutlined />, label: t('Revenue') },
            { key: 'errors', icon: <ExclamationCircleOutlined />, label: t('Errors') },
            { key: 'customers', icon: <UserOutlined />, label: t('Customers') },
           
            {key: 'oil_type', icon: <CodeSandboxOutlined/>, label: t('Oil type') },


            // {
            //   key: 'code_management',
            //   icon: <QrcodeOutlined/>,
            //   label: t("Code Management"),
            //   children: [
            //     {
            //       key: "device_groups",
            //       label: "Device group"
            //     },

            //     {
            //       key: "Vehicle brands",
            //       label: "Vehicle brands"
            //     }
            //   ]
            // },

            // {
            //   key: 'system-settings',
            //   icon: <SettingOutlined />,
            //   label: t('System settings'),
            //   popupClassName: 'side-menu-popup',
            //   children: [
            //     {
            //       key: "roles",
            //       label: t('Roles'),
            //     },

            //     {
            //       key: "users",
            //       label: t('Users'),
            //     }
            //   ]
            // },
          ]}
        />
      </Sider>

      <Layout onClick={() => setCollapsed(true)} className="content-layout">
        <Header className="header-content" >
          {/* <div className="switch-bar">
            <Dropdownbar onSwitchLanguage={handleSwitchLanguage} currentLanguage={i18n.language} />
          </div> */}
        </Header>
        <Content  className="content-box">
          <div className='module-content' onClick={(e) => e.stopPropagation()}>
              {selectedKey === 'customers' && <DashboardContent collapsed={collapsed} />}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
