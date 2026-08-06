import { useEffect, useState } from 'react'
import { Table, Select, Pagination, Grid } from 'antd'
import { InfoCircleOutlined} from '@ant-design/icons'
import { useOutletContext } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../presenters/hooks'
import { fetchCustomers} from '../../presenters/slices/customerSlice'
import Searchicon from '../icons/Searchicon'
import SavedBtn from './SavedBtn'
import { Spin, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import dayjs from 'dayjs'
import SegmentedBar from '../common/Segmented'
import './index.scss'

type DashboardContext = { collapsed: boolean }

export default function CustomerPage() {
  const { collapsed } = useOutletContext<DashboardContext>()
  const dispatch = useAppDispatch()
  const { customers, loading, error } = useAppSelector((state) => state.customer)
  const key = 'Customers'
  const screens = Grid.useBreakpoint()
  const isMobile = screens.md === false
  const [selectedStatus, setSelectedStatus] = useState(0)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchKeyword, setSearchKeyword] = useState('')

  const {t} = useTranslation()
  const options = [
  { value: 0, label: t("All") },
  { value: 1, label: t("Changed") },
  { value: 2, label: t("Ultrasound due") },
  { value: 3, label: t("Oil change due") },
  { value: 4, label: t("Overdue") },
  { value: 5, label: t("Not changed") },
  { value: 6, label: t("Vehicle not yet registered") },
];
  useEffect(() => {
    const timer = setTimeout(() => {
      const filter: Record<string, string> = {}
      const status = localStorage.getItem("status")
      const statusNum = Number(status)

      if (statusNum === 0) {
        dispatch(fetchCustomers({current: 1, filter}))
      }

      else filter.oilChangeStatus = `$eq:${status}`
      
      if (searchKeyword === '') dispatch(fetchCustomers({current: 1, filter}))
      else {
        dispatch(fetchCustomers({ current: 1, search: searchKeyword, filter }))
      }
    }, 500)

    return () => clearTimeout(timer)
    }, [dispatch, searchKeyword])

  useEffect(() => {
    const status = localStorage.getItem("status")
    setSelectedStatus(Number(status))
    const filter: Record<string, string> = {}

    filter.oilChangeStatus = `$eq:${status}`
    dispatch(fetchCustomers({current: 1, search: undefined, filter: filter}))

  },[])
  const renderStatusPill = (text: string) => (
    <span
      className={
        text === 'Đã thay' || text === 'Changed'
          ? 'status-done'
          : 'status-overdue'
      }
    >
      <div className="status-result">
        <div className="bullet-point">
          &bull;
        </div>
        {text === "Đã thay" || text === "Changed" ? t("changed") : t("not changed")}
      </div>
    </span>
  )
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
      title: <div style={{textAlign: "left"}}>{t("Status")}</div>,
      dataIndex: 'status',
      align: 'left' as const,
      render: (text: string) => renderStatusPill(text)
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
    <div className="footer-box">
      <div className="entry-display">
            <p>{t("Display")}</p>
            <input
              type="text"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value) || 0)}
            />
            <p>{t("Entry per page")}</p>
      </div>

      <Pagination
        current={10}
        total={10}
        pageSize={entriesPerPage}
        showSizeChanger={false}
      />
    </div>

    
  )
 
  const segmentedOptions = [
    { label: t('Customer List'), value: 'customer_list' },
    { label: t('Oil Change Schedule Setup'), value: 'oil_schedule' },
  ]
  return (
    <>
      <Header name={key} />

      <SegmentedBar
      options={segmentedOptions}
      />
      <div className="customer-table-scroll">
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
                    dispatch(fetchCustomers({ current: 1, search: searchKeyword }))
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
              onChange={(value) => {                
                setSelectedStatus(value)
                const filter: Record<string, string> = {}
                if (value !== 0) {
                  localStorage.setItem("status", JSON.stringify(value))
                  filter.oilChangeStatus = `$eq:${value}`
                }
                else localStorage.setItem("status", JSON.stringify(value))
               dispatch(fetchCustomers({current: 1, filter}))
              }}
            />
          </div>
        </div>

          <div className="main-table" onClick={(e) => e.stopPropagation()}>

            {isMobile ? (
              <Spin spinning={loading} size="medium">
                <div className="customer-card-list">
                  {data.map((item) => (
                    <div className="customer-card" key={item.key}>
                      <div className="customer-card__top">
                        <span className="customer-card__index">{item.id}.</span>
                        <span className="customer-card__name">{item.name}</span>
                        {renderStatusPill(item.status)}
                      </div>
                      <div className="customer-card__row">
                        <span className="customer-card__label">{t("Phone Number")}</span>
                        <span className="customer-card__value">{item.phone_number}</span>
                      </div>
                      <div className="customer-card__row">
                        <span className="customer-card__label">{t("Date of Birth")}</span>
                        <span className="customer-card__value">{item.date_of_birth}</span>
                      </div>
                      <div className="customer-card__row">
                        <span className="customer-card__label">{t("Number of Oil Changes")}</span>
                        <span className="customer-card__value">{item.times_change_oil}</span>
                      </div>
                      <div className="customer-card__row">
                        <span className="customer-card__label">{t("Next Oil Change Cycle")}</span>
                        <span className="customer-card__value">{item.duration_next_change}</span>
                      </div>
                      <div className="customer-card__action">
                        <span className="action-icon">
                          <div className="icon">{item.action}</div>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Spin>
            ) : (
              <Spin spinning={loading} size="medium" style={{ padding: "50px" }}>
                  <Table className="customer-table" columns={columns} dataSource={data} pagination = {false} 
                  footer={!error? () => tableFooter : undefined} 
                  />
              </Spin>
            )}
              
              <div className="saved-btn">
                  <SavedBtn/>
              </div>
          </div>

          {isMobile && !error && (
            <div className="customer-mobile-footer">
              {tableFooter}
            </div>
          )}
          
        </div>
      </div>
    </>
  )
}
