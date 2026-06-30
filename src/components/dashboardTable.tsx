import { useEffect, useState } from 'react'
import { Table, Segmented, Select, Pagination } from 'antd'
import { InfoCircleOutlined} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../presenters/hooks'
import { fetchCustomers } from '../presenters/slices/customerSlice'
import SavedBtn from './savedBtn'
import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import Header from './header'
import dayjs from 'dayjs'

import './dashboardStyle.scss'

const options = [
  { value: 'tat-ca', label: 'Tất cả' },
  { value: 'da-thay', label: 'Đã thay' },
  { value: 'sap-den-han', label: 'Sắp đến hạn' },
  { value: 'den-han-thay-nhot', label: 'Đến hạn thay nhớt' },
  { value: 'qua-han', label: 'Quá hạn' },
  { value: 'chua-thay', label: 'Chưa thay' },
  { value: 'chua-dang-ky-xe', label: 'Chưa đăng ký xe' },
];

export default function DashboardContent({ collapsed }: { collapsed?: boolean }) {
  const dispatch = useAppDispatch()
  const { customers, loading, error } = useAppSelector((state) => state.customer)
  const {t} = useTranslation()
  const key = 'Customers'
  const [selectedStatus, setSelectedStatus] = useState('tat-ca')
  const [entriesPerPage, setEntriesPerPage] = useState(10)
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
      sorter: (a:any,b:any) => a.name.localeCompare(b.name),
    },
    {
      title: t("Phone Number"),
      dataIndex: 'phone_number',
      sorter: (a:any,b:any) => a.phone_number.localeCompare(b.phone_number),
    },
    {
      title: t("Date of Birth"),
      dataIndex: 'date_of_birth',
      sorter: (a:any, b:any) => a.date_of_birth.localeCompare(b.date_of_birth),
    },
    {
      title: t("Number of Oil Changes"),
      dataIndex: 'times_change_oil',
      sorter: (a:any, b:any) => a.times_change_oil - b.times_change_oil,
    },
    {
      title: t("Next Oil Change Cycle"),
      dataIndex: 'duration_next_change',
      sorter: (a:any, b:any) => a.duration_next_change.localeCompare(b.duration_next_change),
    },
    {
      title: t("Status"),
      dataIndex: 'status',

      render: (text: string) => (
        <span
          className={
            text === 'Đã thay' || text === 'Changed'
              ? 'status-done'
              : 'status-overdue'
          }
        >
          {text === "Đã thay" || text === "Changed" ? ( t("changed")) : (t("not changed"))}
        </span>
      )
    },

    {
      title: t("Action"),
      dataIndex: 'action',
      render: () => (
        <div className="action-icon">
            <InfoCircleOutlined />
        </div>
      )
    },
  ]

  const data = customers.map((customer, index) => ({
    key: index,
    id: index + 1,
    name: customer.name,
    phone_number: customer.phoneNumber,
    date_of_birth: customer.birthDay !== null ? dayjs(customer.birthDay).format('DD/MM/YYYY') : '---',
    times_change_oil: customer.nearestOilChangeVehicle?.numberOfChangeOil ?? 0,
    duration_next_change: dayjs(customer.nearestOilChangeVehicle?.nearestOilChange?.nextOilChangeDay).format('DD/MM/YYYY') ?? '-',
    status: customer.oilChangeStatus === 1 ? 'Đã thay' : 'Quá hạn',
    action: <InfoCircleOutlined />,
  }))

  const tableFooter = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="footer-box">
      <div className="entry-display">
            <p>Display</p>
            <input
              type="text"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value) || 0)}
            />
            <p>entries per page</p>
      </div>

      <Pagination
        current={10}
        total={10}
        pageSize={entriesPerPage}
        //onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </div>
  )

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 100 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: 100, color: 'red', background:"white" }}>{error}</div>
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
      <div className={`table_layout${collapsed ? ' collapsed' : ''}`}>
        <div className="intro-box">
          <div className="search-section" onClick={(e) => e.stopPropagation()}>
            <h1>Từ khóa</h1>
            <input
            type="search"
            placeholder="Nhập từ khóa"
            />
          </div>

          <div className="filter-section" onClick={(e) => e.stopPropagation()}>
            <h1>Trạng thái</h1>
            <Select
              className="status-select"
              placeholder={selectedStatus}
              options={options}
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
            />
          </div>
        </div>

          <div className="main-table">
              <Table className="customer-table" columns={columns} dataSource={data} pagination = {false} footer={() => tableFooter} />
              <div className="saved-btn">
                  <SavedBtn/>
              </div>
          </div>

          
      </div>
    </>
  )
}
