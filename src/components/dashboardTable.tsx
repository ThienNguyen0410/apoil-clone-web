import { useEffect, useState } from 'react'
import { Table, Segmented, Select, Pagination } from 'antd'
import { InfoCircleOutlined} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../presenters/hooks'
import { fetchCustomers, searchCustomers } from '../presenters/slices/customerSlice'
import BulletPoint from './icons/BulletPoint'
import Searchicon from './icons/Searchicon'
import SavedBtn from './SavedBtn'
import { Spin, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import dayjs from 'dayjs'

import './dashboardStyle.scss'



export default function DashboardContent({ collapsed }: { collapsed?: boolean }) {
  const dispatch = useAppDispatch()
  const { customers, loading, error } = useAppSelector((state) => state.customer)
  const key = 'Customers'
  const [selectedStatus, setSelectedStatus] = useState('tat-ca')
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchKeyword, setSearchKeyword] = useState('')

  const {t} = useTranslation()
  const options = [
  { value: 'tat-ca', label: t("All") },
  { value: 'da-thay', label: t("Changed") },
  { value: 'sap-den-han', label: t("Ultrasound due") },
  { value: 'den-han-thay-nhot', label: t("Oil change due") },
  { value: 'qua-han', label: t("Overdue") },
  { value: 'chua-thay', label: t("Not changed") },
  { value: 'chua-dang-ky-xe', label: t("Vehicle not yet registered") },
];
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchKeyword === '') dispatch(fetchCustomers(1))
      else {
        dispatch(searchCustomers({ current: 1, search: searchKeyword }))
      }
    }, 500)

    return () => clearTimeout(timer)
    }, [dispatch, searchKeyword])

  const columns = [
    {
      title: <div style={{textAlign: "center"}}>{t("No")}</div>,
      dataIndex: 'id',
      align: 'center' as const,
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
          {text === "Đã thay" || text === "Changed" ? (
            <> 
            <div className="status-result">
              <div className="bullet-point">
                &bull;
              </div>
              {t("changed")} 
            </div>
           
          </>
          ) : 
          (
          <>
            <div className="status-result">
              <div className="bullet-point">
                &bull;
              </div>
              {t("not changed")} 
            </div>
          </>
        )}
        </span>
      )
    },

    {
      title: <div style={{textAlign: "center"}}>{t("Action")}</div>,
      dataIndex: 'action',
      render: () => (
        <div className="action-icon"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="icon"          >
            <InfoCircleOutlined />
          </div>
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
      <div className="entry-display"
      style={{marginTop: "6px"}}
      >
            <p>{t("Display")}</p>
            <input
              type="text"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value) || 0)}
            />
            <p>{t("Entry per page")}</p>
      </div>

      <Pagination
      style={{marginRight: "-50px"}}
        current={10}
        total={10}
        pageSize={entriesPerPage}
        //onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </div>

    
  )
 
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
            <h1>{t("Key Word")}</h1>
            <div className="custom-search-wrapper">
              <Input
                className="custom-search-input"
                placeholder={t("Key Word")}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch(searchCustomers({ current: 1, search: searchKeyword }))
                  }
                }}
              />
              <button className="custom-search-btn">
                <Searchicon />
              </button>
            </div>
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

          <div className="main-table" onClick={(e) => e.stopPropagation()}>

              <Spin spinning={loading} size="medium" style={{ padding: "50px" }}>
                  <Table className="customer-table" columns={columns} dataSource={data} pagination = {false} 
                  footer={!error? () => tableFooter : undefined} 
                  />
              </Spin>
             
              <div className="saved-btn">
                  <SavedBtn/>
              </div>
          </div>

          
      </div>
    </>
  )
}
