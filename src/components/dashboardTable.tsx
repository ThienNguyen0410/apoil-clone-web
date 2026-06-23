import { useEffect } from 'react'
import { Table, Segmented } from 'antd'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../presenters/hooks'
import { fetchCustomers } from '../presenters/slices/customerSlice'
import { Spin } from 'antd'
import './dashboardStyle.scss'

export default function DashboardContent() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { customers, loading, error } = useAppSelector((state) => state.customer)

  useEffect(() => {
    dispatch(fetchCustomers(1))
  }, [dispatch])

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
    },
    {
      title: 'Số lần thay nhớt',
      dataIndex: 'times_change_oil',
    },
    {
      title: 'Chu kỳ thay nhớt tiếp theo',
      dataIndex: 'duration_next_change',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',

      render: (text: string) => (
        <span
          className={
            text === 'Đã thay'
              ? 'status-done'
              : 'status-overdue'
          }
        >
          {text}
        </span>
      )
    },

    {
      title: 'Hành động',
      dataIndex: 'action',
    },
  ]

  const data = customers.map((customer, index) => ({
    key: index,
    id: index + 1,
    name: customer.name,
    phone_number: customer.phoneNumber,
    times_change_oil: customer.nearestOilChangeVehicle?.numberOfChangeOil ?? 0,
    duration_next_change: customer.nearestOilChangeVehicle?.nearestOilChange?.nextOilChangeDay ?? '-',
    status: customer.oilChangeStatus === 1 ? 'Đã thay' : 'Quá hạn',
    action: <InfoCircleOutlined />,
  }))

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 100 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: 100, color: 'red' }}>{error}</div>
  }

  return (
    <>
      <div className="header-content">
        <div className="header-title">
          <UserOutlined />
          <span>Khách hàng</span>
        </div>

        <div className="profile-avtar" onClick={() => navigate('/profile')}>
          <UserOutlined className="user-icon" />
        </div>
      </div>

      <Segmented
        options={[
          { label: 'Dashboard', value: 'dashboard' },
          { label: 'Khách hàng', value: 'customers' },
        ]}
      />
      <Table className="customer-table" columns={columns} dataSource={data} />
    </>
  )
}
