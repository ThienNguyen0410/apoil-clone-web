import {useEffect, useState, type Key} from 'react'
import {InfoCircleOutlined} from '@ant-design/icons'
import {Progress} from 'antd'
import {useTranslation} from 'react-i18next'
import type {TableRowSelection} from 'antd/es/table/interface'
import BreadCrumb from './BreadCrumbs'
import FlexBar from './FlexBar'
import TableView from '../common/Table'
import Footer from '../common/Footer'
import Editicon from '../icons/Editicon'
import {useAppDispatch, useAppSelector} from '../../presenters/hooks'
import {fetchDeviceData} from '../../presenters/slices/deviceSlice'
import RightMenu from '../System-settings/Right-Menu'
import ProgressBar from '../common/Progress'
import './index.scss'
import type DeviceEntites from '../../entities/devices/entity'

export default function DevicePage({collapsed} : {collapsed?: boolean}) {
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
      width: 59,
      align: 'center' as const,
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'device_code',
      key: 'device_code',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'device_name',
      key: 'device_name',
      ellipsis: true,
    },
    {
      title: 'Nhóm thiết bị',
      dataIndex: 'device_group',
      key: 'device_group',
      render: (value: string) => (
        <span style={value !== '' ?{color: "#0d733b", background:"#e2faf0", padding: "8px 8px", margin: "2px 0px"} : {}}>{`${value}`}</span>
      )
    },
    {
      title: 'Địa chỉ lắp đặt',
      dataIndex: 'installed_address',
      key: 'installed_address',
      ellipsis: true,
    },
    {
      title: 'Thùng nhớt thải (L)',
      dataIndex: 'waste_oil_tank',
      key: 'waste_oil_tank',
      render: (value: { currValue: number; maxValue: number } | null) => {
        const v = value?.currValue ?? 0
        const m = value?.maxValue ?? 1
        return (
          <div className="oil-tank-progress">
            <ProgressBar
              currValue={v/1000}
              maxValue={m/1000}
              percent={Math.round((v / m) * 100)}
            />
          </div>
        )
      }
    },
    {
      title: 'Nhớt xe số (L)',
      dataIndex: 'gear_oil',
      key: 'gear_oil',
      render: (value: { currValue: number; maxValue: number } | null) => {
        const v = value?.currValue ?? 0
        const m = value?.maxValue ?? 1
        return (
          <div className="gear-oil-progress">
            <ProgressBar
              currValue={v/1000}
              maxValue={m/1000}
              percent={Math.round((v / m) * 100)}
            />
          </div>
        )
      }
    },
    {
      title: 'Nhớt xe tay ga (L)',
      dataIndex: 'scooter_oil',
      key: 'scooter_oil',
      render: (value: { currValue: number; maxValue: number } | null) => {
        const v = value?.currValue ?? 0
        const m = value?.maxValue ?? 1
        return (
          <div className="scooter-oil-progress">
            <ProgressBar
              currValue={v/1000}
              maxValue={m/1000}
              percent={Math.round((v / m) * 100)}
            />
          </div>
        )
      }
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      key: 'status',
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
      align: 'center' as const,
      render: () => (
        <div style={{display: 'flex', gap: 12, color: '#0d733b', justifyContent: 'center', alignItems: 'center'}}>
          <div className="action-icon" onClick={(e) => e.stopPropagation()}>
            <InfoCircleOutlined style={{fontSize: 24, color: '#0d733b', cursor: "pointer", marginBottom: "4px"}}/>
          </div>

          <div className="edit-icon" style={{cursor: "pointer"}}>
            <Editicon/>
          </div>
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
    columnWidth: 65,
  }

  return (
    <div className={`main-page${collapsed? ' collapsed' : ''}`}>
      <BreadCrumb />

      <div className="main-layout">
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
              <Footer
                currentEntries={currentEntries}
                setCurrentEntries={setCurrentEntries}
                currentPage={currentPage}
                pageSize={pageSize}
                total={total}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
              />
          ) : null}


              <div className="right-menu-wrapper">
                    <RightMenu 
                      onAddClick={() => {
                        localStorage.setItem("ProfilePopupState", JSON.stringify(true))
                        localStorage.setItem("ProfilePopupViewMode", JSON.stringify(false))
                      }}
                      onDelete={() => {
                       
                      }}
                      hasDeleteRow={selectedRowKeys.length > 0}
                      />
              </div>
          
      </div>
    </div>
  )
}
