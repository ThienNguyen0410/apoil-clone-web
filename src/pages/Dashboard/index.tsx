import { useState, useEffect } from 'react'
import {useTranslation} from 'react-i18next'
import { Layout, Menu, Grid, Drawer } from 'antd'
import {
  UserOutlined, ApartmentOutlined, DollarOutlined, SettingOutlined,
 ExclamationCircleOutlined, QrcodeOutlined, MenuOutlined,

} from '@ant-design/icons'
import {useNavigate, Outlet, useLocation} from 'react-router-dom'
import MoreOutlined from '../../components/icons/MoreOutlined'
import Homeicon from '../../components/icons/Homeicon'
import  Cubeicon from '../../components/icons/Cubeicon'
import logo from '../../assets/logo.png'
import './index.scss'
const { Sider, Header, Content } = Layout

export default function Dashboard() {
  const {t} = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const screens = Grid.useBreakpoint()
  const isMobile = screens.md === false

  const getKeyFromPath = (pathname: string): string => {
    if (pathname.includes('/device/') && pathname.includes('/detail')) return 'devices'
    if (pathname.includes('/customers')) return 'customers'
    if (pathname.includes('/devices')) return 'devices'
    if (pathname.includes('/user')) return 'user'
    if (pathname.includes('/revenue')) return 'revenue'
    if (pathname.includes('/errors')) return 'errors'
    return 'customers'
  }
  const selectedKey = getKeyFromPath(location.pathname)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1199px)')
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setCollapsed(true)
    }
    handler(mq)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMenuClick = (e: { key: string }) => {
    const routeMap: Record<string, string> = {
      customers: '/apsp/customers',
      devices: '/apsp/devices',
      user: '/apsp/user',
      revenue: '/apsp/revenue',
      errors: '/apsp/errors'
    }

    if (routeMap[e.key]) {
      navigate(routeMap[e.key])
    }
    setCollapsed(false)
    setDrawerOpen(false)
  }

  const renderMenu = () => (
    <Menu
      onClick={handleMenuClick}
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
  )

  return (
    <Layout className="dashboard-layout" style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider width={311} collapsedWidth={86} collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null} className="side-bar">
          <img className="logo" src={logo} alt="logo" />
          {renderMenu()}
        </Sider>
      )}

      <Layout onClick={() => setCollapsed(true)} className="content-layout">
        {isMobile && (
          <div className="mobile-topbar" onClick={(e) => e.stopPropagation()}>
            <MenuOutlined className="mobile-hamburger" onClick={() => setDrawerOpen(true)} />
            <img className="mobile-logo" src={logo} alt="logo" />
          </div>
        )}
        <Header className="header-content" >
        </Header>
        <Content  className="content-box">
          <div className='module-content' onClick={() => setCollapsed(true)} >
             <Outlet context={{ collapsed }}/>
          </div>
        </Content>
      </Layout>

      {isMobile && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          className="mobile-drawer"
          width={300}
          closable={false}
        >
          <img className="logo" src={logo} alt="logo" />
          {renderMenu()}
        </Drawer>
      )}
    </Layout>
  )
}
