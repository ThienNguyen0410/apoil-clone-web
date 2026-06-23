import { useState, useEffect } from 'react'
import { Layout, Menu, Segmented } from 'antd'
import {
  DashboardOutlined,
  UserOutlined, ApartmentOutlined, DollarOutlined, SettingOutlined,
} from '@ant-design/icons'
import logo from '../../assets/logo.png'
import DashboardContent from '../../components/dashboardTable'
import './dasboard.scss'

const { Sider, Header, Content } = Layout

export default function Dashboard() {
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

  return (
    <Layout className="dashboard-layout" style={{ minHeight: '100vh' }}>
      <Sider width={247} collapsedWidth={110} collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null} className="side-bar">
        <img className="logo" src={logo} alt="logo" />
        <Menu
          onClick={(e) => { setSelectedKey(e.key); setCollapsed(false) }}
          className="side-menu"
          theme="dark"
          mode="vertical"
          selectedKeys={[selectedKey]}
          triggerSubMenuAction="hover"
          items={[
            { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
            { key: 'equipments', icon: <ApartmentOutlined />, label: 'Thiết bị' },
            { key: 'revenue', icon: <DollarOutlined />, label: 'Doanh thu' },
            { key: 'errors', icon: <UserOutlined />, label: 'Báo lỗi' },
            { key: 'customers', icon: <DollarOutlined />, label: 'Khách hàng' },
            {
              key: 'system-settings',
              icon: <SettingOutlined />,
              label: 'Cài đặt hệ thống',
              children: [
                {
                  key: "roles",
                  label: "Vai trò",
                },

                {
                  key: "users",
                  label: "Người dùng",
                }
              ]
            },
          ]}
        />
      </Sider>

      <Layout onClick={() => setCollapsed(true)} className="content-layout">
        <Header className="header-content" />
        <Content>
          {selectedKey === 'dashboard' && <div>Dashboard</div>}
          {selectedKey === 'customers' && <DashboardContent />}
        </Content>
      </Layout>
    </Layout>
  )
}
