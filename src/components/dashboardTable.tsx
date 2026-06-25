import { useEffect } from 'react'
import { Table, Segmented } from 'antd'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../presenters/hooks'
import { fetchCustomers } from '../presenters/slices/customerSlice'
import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import Header from './header'

import './dashboardStyle.scss'

export default function DashboardContent() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { customers, loading, error } = useAppSelector((state) => state.customer)
  const {t, i18n} = useTranslation()
  const key = 'Customers'

  useEffect(() => {
    dispatch(fetchCustomers(1))
  }, [dispatch])

  const columns = [
    {
      title: t("No."),
      dataIndex: 'id',
    },
    {
      title: t("Customer Name"),
      dataIndex: 'name',
    },
    {
      title: t("Phone Number"),
      dataIndex: 'phone_number',
    },
    {
      title: t("Number of Oil Changes"),
      dataIndex: 'times_change_oil',
    },
    {
      title: t("Next Oil Change Cycle"),
      dataIndex: 'duration_next_change',
    },
    {
      title: t("Status"),
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
      title: t("Action"),
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

  const handleSwitchLanguage = (language: string) => {
    i
  }

  return (
    <>
      <Header name={key} />

      <Segmented
        onClick={(e) => e.stopPropagation()}
        className="dashboard-segmented"
        options={[
          { label: t('Customer List'), value: 'customer_list' },
          { label: t('Oil Change Schedule Setup'), value: 'oil_schedule' },
        ]}
      />
      <Table className="customer-table" columns={columns} dataSource={data} />
    </>
  )
}
