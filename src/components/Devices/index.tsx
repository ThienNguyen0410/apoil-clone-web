import {useEffect, useState, type Key} from 'react'
import {InfoCircleOutlined} from '@ant-design/icons'
import {useTranslation} from 'react-i18next'
import type {TableRowSelection} from 'antd/es/table/interface'
import BreadCrumb from './BreadCrumbs'
import FlexBar from './FlexBar'
import TableView from '../common/Table'
import Footer from '../common/Footer'
import Editicon from '../icons/Editicon'
import {useAppDispatch, useAppSelector} from '../../presenters/hooks'
import {fetchDeviceData, fetchDeviceGroupData} from '../../presenters/slices/deviceSlice'
import RightMenu from '../System-settings/Right-Menu'
import ProgressBar from '../common/Progress'
import './index.scss'

export default function DevicePage({collapsed} : {collapsed?: boolean}) {
  const dispatch = useAppDispatch()
  const {t} = useTranslation()
  const {Devices,DeviceGroupMap, loading, error, total} = useAppSelector((state) => state.device)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPagesize] = useState(7)
  const [filter, setFilter] = useState< Record<string, string> | undefined> (undefined)
  const [sortField, setSortField] = useState<string>()
  const[sortOrder, setSortOrder] = useState<'asc' | 'desc'>()

  const statusOptions = [
    {value: '', label: t('All')},
    {value: 1, label: t('Active')},
    {value: 2, label: t('Inactive')},
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      const sortQuery = sortField && sortOrder ?`${sortField} ${sortOrder}` : undefined
      dispatch(fetchDeviceData({current: currentPage, pageSize: pageSize, searchKeyword: search, filter: filter, sortQuery: sortQuery}))
    }, 500)

    return () => clearInterval(timer)
  }, [dispatch, currentPage, pageSize, search, filter, sortField, sortOrder])

  useEffect(() => {
    dispatch(fetchDeviceGroupData({current: currentPage, pageSize: pageSize}))
  },[dispatch])

  const DeviceGroupOptions = [
    {value: '', label: 'Tất cả'},
    ...DeviceGroupMap.map((item: any) => ({
      value: item.group_id,
      label: item.group_name
    }))
  ]

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
      ellipsis: true,
      sorter: true,
      sortOrder: sortField === 'device_code' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'device_name',
      key: 'device_name',
      ellipsis: true,
      sorter: true,
      sortOrder: sortField === 'device_name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: 'Nhóm thiết bị',
      dataIndex: 'device_group',
      key: 'device_group',
      render: (value: string) => (
        <span style={value !== '' ?{color: "#0d733b", background:"#e2faf0", padding: "8px 8px", margin: "2px 0px"} : {}}>{`${value}`}</span>
      ),
      sorter: true,
      sortOrder: sortField === 'device_group' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: 'Địa chỉ lắp đặt',
      dataIndex: 'installed_address',
      key: 'installed_address',
      ellipsis: true,
      sorter: true,
      sortOrder: sortField === 'installed_address' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
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
      },
      sorter: true,
      sortOrder: sortField === 'waste_oil_tank' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
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
              currValue={Number((v/1000).toFixed(2))}
              maxValue={m/1000}
              percent={Math.round((v / m) * 100)}
            />
          </div>
        )
      },
      sorter: true,
      sortOrder: sortField === 'gear_oil' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
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
              currValue={Number((v/1000).toFixed(2))}
              maxValue={m/1000}
              percent={Math.round((v / m) * 100)}
            />
          </div>
        )
      },
      sorter: true,
      sortOrder: sortField === 'scooter_oil' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
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


  //For footer
  const onPageSizechange = (pagesize: number) => {
    setPagesize(pagesize)
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  //For filter
  const onChangeStatus = (value: string) => {
    const status = parseInt(value)
    setSelectedStatus(value)

    setFilter(prev => {
      const next = {...(prev ?? {})}
      if (status === 0) delete next['operationStatus']
      else next['operationStatus']  = `$eq:${value}`
      return Object.keys(next).length > 0 ? next : undefined
    })

  }

  const onChangeGroup = (value: string) => {
    setSelectedGroup(value)
    setFilter(prev => {
      const next = {...(prev ?? {})}
      if (value === '') delete next['deviceGroups.id']
      else next['deviceGroups.id']  = `$eq:${value}`
      return Object.keys(next).length > 0 ? next : undefined
    })
  }

  //For sorting 
  const handleSort = (sorter: {field?:string, order?: 'ascend' | 'descend'}) => {
    if (sorter.field && sorter.order) {
      setSortField(sorter.field)
      setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc')
    }

    else {
      setSortField(undefined)
      setSortOrder(undefined)
    }
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
          onChangeStatus={(value: string) => onChangeStatus(value)}
          statusOptions={statusOptions}
          status_select_title={t('Status')}

          selectedGroup={selectedGroup}
          onChangeGroup={(value: string) => onChangeGroup(value)}
          groupOptions={DeviceGroupOptions}
          group_select_title={t('Device Group')}
        />

          <TableView
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            error={error}
            footer={null}
            rowSelection={rowSelection}
            onSort={handleSort}
          />


          {selectedRowKeys.length > 0 ? (
            <div
            style={{
            //background: "red",
            color: "#0d733b",
            marginTop: "-30px",
            marginBottom: "50px",
            marginLeft: 22,
            fontSize: 14,
            lineHeight: "22px" 
            }}
            >
            {selectedRowKeys.length} 
            <span style={{marginLeft: "5px"}}>{t("Content selected")}</span>
            </div>
            ) : null}

          {!error && !loading ? (
              <Footer
                currentEntries={pageSize}
                setCurrentEntries={onPageSizechange}
                currentPage={currentPage}
                pageSize={pageSize}
                total={total}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizechange}
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