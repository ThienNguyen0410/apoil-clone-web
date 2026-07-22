import {useEffect, useState, type Key} from 'react'
import {InfoCircleOutlined} from '@ant-design/icons'
import {useTranslation} from 'react-i18next'
import type {TableRowSelection} from 'antd/es/table/interface'
import BreadCrumb from './BreadCrumbs'
import FlexBar from './FlexBar'
import TableView from '../common/Table'
import Footer from '../common/Footer'
import {useAppDispatch, useAppSelector} from '../../presenters/hooks'
import {fetchDeviceData} from '../../presenters/slices/deviceSlice'
import './index.scss'

export default function DevicePage() {
  const dispatch = useAppDispatch()
  const {t} = useTranslation()
  const {Devices, loading, error, total} = useAppSelector((state) => state.device)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [currentEntries, setCurrentEntries] = useState(7)
  const [currentPage] = useState(1)
  const pageSize = 7

  const statusOptions = [
    {value: '', label: t('All')},
    {value: '1', label: t('Active')},
    {value: '2', label: t('Inactive')},
  ]

  const groupOptions = [
    {value: '', label: t('All')},
    {value: 'APSP', label: 'APSP'},
  ]

  useEffect(() => {
    dispatch(fetchDeviceData({current: 1, pageSize: 7}))
  }, [dispatch])

  const columns = [
    {
      title: <div className="table-header-center">STT</div>,
      dataIndex: 'stt',
      key: 'stt',
      width: 80,
      align: 'center' as const,
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'device_code',
      key: 'device_code',
      width: 180,
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'device_name',
      key: 'device_name',
      width: 220,
    },
    {
      title: 'Nhóm thiết bị',
      dataIndex: 'device_group',
      key: 'device_group',
      width: 160,
    },
    {
      title: 'Địa chỉ lắp đặt',
      dataIndex: 'installed_address',
      key: 'installed_address',
      width: 260,
    },
    {
      title: 'Thùng nhớt thải (L)',
      dataIndex: 'waste_oil_tank',
      key: 'waste_oil_tank',
      width: 140,
      render: (value: number) => `${value ?? 0}`,
    },
    {
      title: 'Nhớt xe số (L)',
      dataIndex: 'gear_oil',
      key: 'gear_oil',
      width: 140,
      render: (value: number) => `${value ?? 0}`,
    },
    {
      title: 'Nhớt xe tay ga (L)',
      dataIndex: 'scooter_oil',
      key: 'scooter_oil',
      width: 160,
      render: (value: number) => `${value ?? 0}`,
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      key: 'status',
      width: 170,
      render: (text: string) => (
        <span className={text === 'Đang hoạt động' ? 'status-done' : 'status-overdue'}>
          <div className="status-result">
            <div className="bullet-point">&bull;</div>
            {text}
          </div>
        </span>
      ),
    },
    {
      title: <div className="table-header-center">Hành động</div>,
      key: 'action',
      width: 120,
      align: 'center' as const,
      render: () => (
        <div className="action-icon" onClick={(e) => e.stopPropagation()}>
          <InfoCircleOutlined />
        </div>
      ),
    },
  ]

  const dataSource = Devices.map((device, index) => ({
    key: device.id ?? index,
    stt: index + 1,
    ...device,
    status: device.status === 1 ? 'Đang hoạt động' : 'Ngưng hoạt động',
  }))

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    },
    columnWidth: 60,
  }

  return (
    <div className="device-main-page">
      <BreadCrumb />

      <div className="device-main-layout">
        <FlexBar
          searchTitle={t('Key Word')}
          placeholder={t('Key Word')}
          search={search}
          setSearch={setSearch}

          selectedStatus={selectedStatus}
          onChangeStatus={setSelectedStatus}
          statusOptions={statusOptions}
          status_select_title={t('Status')}

          selectedGroup={selectedGroup}
          onChangeGroup={setSelectedGroup}
          groupOptions={groupOptions}
          group_select_title={t('Device Group')}
        />

        <div className="device-table-section">
          <TableView
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            error={error}
            footer={null}
            rowSelection={rowSelection}
            onSort={() => {}}
          />

          {!error && !loading ? (
            <div className="footer-box">
              <Footer
                currentEntries={currentEntries}
                setCurrentEntries={setCurrentEntries}
                currentPage={currentPage}
                pageSize={pageSize}
                total={total}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
