import {useEffect, useState, type Key} from 'react'
import {InfoCircleOutlined} from '@ant-design/icons'
import {useTranslation} from 'react-i18next'
import {Upload, Switch, Select} from 'antd'
import type {TableRowSelection} from 'antd/es/table/interface'
import { useNavigate, useOutletContext } from 'react-router-dom'
import BreadCrumb from './BreadCrumbs'
import FlexBar from './FlexBar'
import TableView from '../common/Table'
import Footer from '../common/Footer'
import Editicon from '../icons/Editicon'
import UploadIcon from '../icons/Uploadicon'
import {useAppDispatch, useAppSelector} from '../../presenters/hooks'
import {fetchDeviceData, fetchDeviceGroupData, fetchProvincesData, fetchDistrictsData, fetchCommunesData, addDevice, fetchDeviceById, updateDevice} from '../../presenters/slices/deviceSlice'
import RightMenu from '../System-settings/Right-Menu'
import ProgressBar from '../common/Progress'
import DeletePopup from '../popups/System-settings/Users/ConfirmDelete'

//Popup
import './index.scss'
import type { DeviceEntities } from '../../entities/devices/entity'

type DashboardContext = { collapsed: boolean }

export default function DevicePage() {
  const { collapsed } = useOutletContext<DashboardContext>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {t} = useTranslation()
  const {Devices,DeviceGroupMap,Provinces,Districts, Communes,loading, error, total} = useAppSelector((state) => state.device)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPagesize] = useState(7)
  const [filter, setFilter] = useState< Record<string, string> | undefined> (undefined)
  const [filterLocation, setFilterLocation] = useState< Record<string, string> | undefined> (undefined)
  const [sortField, setSortField] = useState<string>()
  const[sortOrder, setSortOrder] = useState<'asc' | 'desc'>()
  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null)
  const [showDistrict, setShowDistrict] = useState(false)
  const [showWard, setShowWard] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [submitedForm, setSubmitedForm] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [open, setOpen] = useState(false)
  const statusOptions = [
    {value: '', label: t('All')},
    {value: 1, label: t('Active')},
    {value: 2, label: t('Inactive')},
  ]

  const [formData, setFormData] = useState<{
    code: string
    name: string
    password: string
    password_confirm: string
    longitude: string
    latitude: string
    address: string
    phone_number: string
    status: number
    provinceid: string
    districtid: string
    communeid: string
    device_group_id: string[]
    image: File | null
  }>({
    code: '',
    name: '',
    password: '',
    password_confirm: '',
    longitude: '',
    latitude: '',
    address: '',
    phone_number: '',
    status: 1,
    provinceid: '',
    districtid: '',
    communeid: '',
    device_group_id: [],
    image: null
  })

  //Function checking empty field
  const isEmpty = (value: any) => {
    if (value === null || value === undefined) return true
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'string') return value.trim() === ''
    return false
  }

  //Erros mapping
  const errors = {
    code: isEmpty(formData.code),
    name: isEmpty(formData.name),
    device_group_id: isEmpty(formData.device_group_id),
    phone_number: isEmpty(formData.phone_number),
    password: isEmpty(formData.password),
    confirmPassword: isEmpty(formData.password_confirm),
    provinceid: isEmpty(formData.provinceid),
    districtid: isEmpty(formData.districtid),
    not_match_password: formData.password !== formData.password_confirm
  }

  const showError = (field: keyof typeof errors) => {
    return (submitedForm || touched[field]) && errors[field] 
  }

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
    {value: '', label: t('All')},
    ...DeviceGroupMap.map((item: any) => ({
      value: item.group_id,
      label: item.group_name
    }))
  ]

  useEffect(() => {
    dispatch(fetchProvincesData({current: 1, pageSize: 9999}))
    dispatch(fetchDistrictsData({current: 1, pageSize: 9999, filter: filterLocation}))
    dispatch(fetchCommunesData({current: 1, pageSize: 9999, filter: filterLocation}))
  },[dispatch, filterLocation])

  const ProvinceOptions = Provinces.map((item: any) => ({
    value: item.province_id,
    label: item.province_name
  }))

  const DistrictOptions = Districts.map((item: any) => ({
    value: item.district_id,
    label: item.district_name
  }))

  const WardOptions = Communes.map((item: any) => ({
    value: item.ward_id,
    label: item.ward_name
  }))

  const columns = [
    {
      title: <div className="table-header-center">{t('STT')}</div>,
      dataIndex: 'stt',
      key: 'stt',
      width: 59,
      align: 'center' as const,
    },
    {
      title: t('Device Code'),
      dataIndex: 'device_code',
      key: 'device_code',
      ellipsis: true,
      sorter: true,
      sortOrder: sortField === 'device_code' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: t('Device Name'),
      dataIndex: 'device_name',
      key: 'device_name',
      ellipsis: true,
      sorter: true,
      sortOrder: sortField === 'device_name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: t('Device Group'),
      dataIndex: 'device_group',
      key: 'device_group',
      render: (value: string) => (
        <span style={value !== '' ?{color: "#0d733b", background:"#e2faf0", padding: "8px 8px", margin: "2px 0px"} : {}}>{`${value}`}</span>
      ),
      sorter: true,
      sortOrder: sortField === 'device_group' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: t('Installed Address'),
      dataIndex: 'installed_address',
      key: 'installed_address',
      ellipsis: true,
      sorter: true,
      sortOrder: sortField === 'installed_address' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: t('Waste Oil Tank (L)'),
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
              swapped={false}
            />
          </div>
        )
      },
      sorter: true,
      sortOrder: sortField === 'waste_oil_tank' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: t('Gear Oil (L)'),
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
              swapped={false}
            />
          </div>
        )
      },
      sorter: true,
      sortOrder: sortField === 'gear_oil' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: t('Scooter Oil (L)'),
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
              swapped={false}
            />
          </div>
        )
      },
      sorter: true,
      sortOrder: sortField === 'scooter_oil' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined
    },
    {
      title: t('Operation Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <span className={text === t('Active') ? 'status-done' : 'status-overdue'}>
          <div className="status-result">
            <div className="bullet-point"
            style={{marginRight: "0px"}}
            >&bull;</div>
            {text}
          </div>
        </span>
      ),
    },
    {
      title: <div className="table-header-center">{t('Action')}</div>,
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: DeviceEntities) => (
        <div style={{display: 'flex', gap: 12, color: '#0d733b', justifyContent: 'center', alignItems: 'center'}}>
          <div className="action-icon" onClick={(e) => {
            e.stopPropagation()
            navigate(`/apsp/device/${record.id}/detail`)
          }}>
            <InfoCircleOutlined style={{fontSize: 24, color: '#0d733b', cursor: "pointer", marginBottom: "4px"}}/>
          </div>

          <div className="edit-icon" style={{cursor: "pointer"}} onClick={(e) => {
            e.stopPropagation()
            const deviceId = record.id
            if (deviceId) {
              dispatch(fetchDeviceById(deviceId)).unwrap().then((data) => {
                setFormData({
                  code: data.device_code,
                  name: data.device_name,
                  password: '',
                  password_confirm: '',
                  longitude: data.longitude || '',
                  latitude: data.latitude || '',
                  address: data.address || '',
                  phone_number: data.phone_number || '',
                  status: data.status,
                  provinceid: data.provinceid || '',
                  districtid: data.districtid || '',
                  communeid: data.communeid || '',
                  device_group_id: Array.isArray(data.device_group_id) ? data.device_group_id : (data.device_group_id ? [data.device_group_id] : []),
                  image: null
                })
                setSelectedProvince(data.provinceid || '')
                setSelectedDistrict(data.districtid || '')
                setEditingDeviceId(deviceId)
                setIsEdit(true)
                setShowDistrict(!!data.provinceid)
                setShowWard(!!data.districtid)
              })
            }
          }}>
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
    status: device.status === 1 ? t('Active') : t('Inactive'),
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

  //For locations (province/district/ward)
  const handleChangeProvince = (value: string) => {
    setSelectedProvince(value)
    setFormData({...formData, provinceid: value, districtid: '', communeid: ''})
    setShowDistrict(true)
    setFilterLocation(prev => {
      const next = {...(prev ?? {})}
      next['province.id'] = `$eq:${value}`
      return Object.keys(next).length > 0 ? next : undefined
    })
  } 

  const handleChangeDistrict = (value: string) => {
    setSelectedDistrict(value)
    setFormData({...formData, districtid: value, communeid: ''})
    setShowWard(true)
    setFilterLocation(prev => {
      const next = {...(prev ?? {})}
      next['district.id'] = `$eq:${value}`
      return Object.keys(next).length > 0 ? next : undefined
    })
  } 

  return (
    <div className={`main-page${collapsed? ' collapsed' : ''}`}>
      <BreadCrumb hasBreadCrumbTabs={isAdd || isEdit} isEdit={isEdit} tabs={<></>}/>

      <div className="main-layout">
        {!(isAdd || isEdit) && (
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
        )}

        {(isAdd || isEdit) ? (
          <div className="add-device-form">
            <div className="form-grid">
              <div className="form-column">
                <h3>1. {t('Thông tin thiết bị')}</h3>
                <div className="form-group">
                  <label>{t('Device Code')}<span className="required-star">*</span></label>
                  <input 
                  type="text" 
                  placeholder={t('Enter device code')} 
                  value={formData.code}
                  disabled={isEdit}
                  onChange={(e) => {
                    setFormData({...formData, code: e.target.value})
                    setTouched(prev => ({...prev, code: true}))
                  }
                }
                  />

                  {showError('code') && (<span className="field-error">{t("Mes.Device.Required.Code")}</span>)}
                </div>
                <div className="form-group">
                  <label>{t('Device Name')}<span className="required-star">*</span></label>
                  <input 
                  type="text" 
                  placeholder={t('Enter device name')} 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value})
                    setTouched(prev => ({...prev, name: true}))
                  }}
                  />
                </div>
                {showError('name') && (<span className="field-error">{t("Mes.Device.Required.Name")}</span>)}
                <div className="form-group">
                  <label>{t('Device Group')}<span className="required-star">*</span></label>
                  <Select
                    mode="multiple"
                    showSearch={false}
                    className="form-select"
                    options={DeviceGroupOptions.filter(r => r.value !== '')}
                    placeholder={t('Select device group')}
                    value={formData.device_group_id}
                    onChange={(value) => {
                      setFormData({...formData, device_group_id: value})
                      setTouched(prev => ({...prev, device_group_id: true}))
                    }}
                    style={{ width: '100%' }}
                  />
                  {showError('device_group_id') && (<span className="field-error">{t("Mes.Device.Required.Group")}</span>)}
                </div>
                <div className="form-group">
                  <label>{t('Contact Phone')}<span className="required-star">*</span></label>
                  <input 
                  type="text" 
                  placeholder={t('Enter phone number')} 
                  value={formData.phone_number}
                  onChange={(e) => {
                    setFormData({...formData, phone_number: e.target.value})
                    setTouched(prev => ({...prev, phone_number: true}))
                  }
                  }
                  />
                  {showError('phone_number') && (<span className="field-error">{t("Mes.Device.Required.Phone")}</span>)}
                </div>
                <div className="form-group">
                  <label>{t('Password')}{!isEdit && <span className="required-star">*</span>}</label>
                  <input 
                  type="password" 
                  placeholder={t('Enter password')} 
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value})
                    setTouched(prev => ({...prev, password: true}))
                  }
                  }
                  />
                  {showError('password') && (<span className="field-error">{t("Mes.Device.Required.Password")}</span>)}
                </div>
                <div className="form-group">
                  <label>{t('Confirm Password')}{!isEdit && <span className="required-star">*</span>}</label>
                  <input 
                  type="password" 
                  placeholder={t('Confirm password')} 
                  onChange={(e) => {
                    setFormData({...formData, password_confirm: e.target.value})
                    setTouched(prev => ({...prev, confirmPassword: true}))
                  }}
                  />
                  {showError('confirmPassword') ? (<span className="field-error">{t("Mes.Device.Required.ConfirmPassword")}</span>) : (
                    errors.not_match_password && (<span className="not-match-password">{t("Not match password")}</span>)
                    
                  )}
                </div>
                <div className="required-note"><span className="required-star">*</span> {t('Required field')}</div>
              </div>

              <div className="form-column right-column">
                <h3>2. {t('Địa chỉ lắp đặt')}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('Longitude')}</label>
                    <input 
                    type="text" 
                    placeholder={t('Enter longitude')} 
                    value={formData.longitude}
                    onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('Latitude')}</label>
                    <input 
                    type="text" 
                    placeholder={t('Enter latitude')} 
                    value={formData.latitude}
                    onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('Province/City')}<span className="required-star">*</span></label>
                  <Select
                    className="form-select"
                    options={ProvinceOptions}
                    placeholder={t('Choose province/city')}
                    value={formData.provinceid || undefined}
                    onChange={(value) => {
                      handleChangeProvince(value)
                      setTouched(prev => ({...prev, provinceid: true}))
                    }}
                    style={{ width: '100%' }}
                  />
                  {showError('provinceid') && (<span className="field-error">{t("Mes.Device.Required.Province")}</span>)}

                </div>
                <div className="form-group">
                  <label>{t('District')}<span className="required-star">*</span></label>
                  <Select
                    className="form-select"
                    options={DistrictOptions}
                    placeholder={t('Choose district')}
                    value={formData.districtid || undefined}
                    onChange={(value) => {
                      handleChangeDistrict(value)
                      setTouched(prev => ({...prev, districtid: true}))
                    }}
                    disabled={!showDistrict}
                    style={{ width: '100%' }}
                  />
                {showError('districtid') && (<span className="field-error">{t("Mes.Device.Required.District")}</span>)}

                </div>
                <div className="form-group">
                  <label>{t('Ward')}</label>
                  <Select
                    className="form-select"
                    options={WardOptions}
                    placeholder={t('Choose ward')}
                    value={formData.communeid || undefined}
                    onChange={(value) => setFormData({...formData, communeid: value})}
                    disabled={!showWard}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="form-group">
                  <label>{t('Address')}</label>
                  <input 
                  type="text" 
                  placeholder={t('Enter address')} 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="form-meta-right">
                  <div className="form-status">
                    <label>{t('Operation Status')}<span className="required-star">*</span></label>
                    <Switch 
                    checkedChildren="ON" 
                    unCheckedChildren="OFF" 
                    checked={formData.status === 1}
                    onChange={(checked) => setFormData({...formData, status: checked ? 1 : 2})}
                    style={{ width: 56, height: 22 }} />
                  </div>
                  <div className="form-upload">
                    <label>{t('Image')}</label>
                    <Upload 
                    showUploadList={false}
                    beforeUpload={(file) => {
                      setFormData({...formData, image: file})
                      return false
                    }}
                    >
                      <button type="button" className="upload-button">
                        <UploadIcon/>
                        <span>{t('Upload image')}</span>
                      </button>
                    </Upload>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => {
                setIsAdd(false)
                setIsEdit(false)
                setEditingDeviceId(null)
              }}>{t('Cancel')}</button>
              <button type="button" className="update-btn"
              onClick={() => {
                setSubmitedForm(true)
                if (isEdit) {
                  const editErrors = {
                    name: isEmpty(formData.name),
                    device_group_id: isEmpty(formData.device_group_id),
                    phone_number: isEmpty(formData.phone_number),
                    provinceid: isEmpty(formData.provinceid),
                    districtid: isEmpty(formData.districtid),
                  }
                  if (Object.values(editErrors).some(Boolean)) return;
                  dispatch(updateDevice({id: editingDeviceId!, device: formData})).unwrap().then(() => {
                    setIsEdit(false)
                    setEditingDeviceId(null)
                    dispatch(fetchDeviceData({current: currentPage, pageSize: pageSize, searchKeyword: search, filter: filter, sortQuery: sortField && sortOrder ? `${sortField} ${sortOrder}` : undefined}))
                  })
                } else {
                  if (Object.values(errors).some(Boolean)) return;
                  dispatch(addDevice(formData)).unwrap().then(() => {
                    setIsAdd(false)
                    dispatch(fetchDeviceData({current: currentPage, pageSize: pageSize, searchKeyword: search, filter: filter, sortQuery: sortField && sortOrder ? `${sortField} ${sortOrder}` : undefined}))
                  })
                }
              }}
              >
              {t('Save')}
              </button>
            </div>
          </div>
        ) : (
          <>
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
                  color: '#0d733b',
                  marginTop: '-30px',
                  marginBottom: '50px',
                  marginLeft: 38,
                  fontSize: 14,
                  lineHeight: '22px',
                }}
              >
                {selectedRowKeys.length}
                <span style={{marginLeft: '5px'}}>{t('Content selected')}</span>
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
                  localStorage.setItem('ProfilePopupState', JSON.stringify(true))
                  localStorage.setItem('ProfilePopupViewMode', JSON.stringify(false))
                  setIsAdd(true)
                }}
                onDelete={() => {
                  setOpen(true)
                }}
                hasDeleteRow={selectedRowKeys.length > 0}
              />
            </div>

            <DeletePopup
            openForm={open}
            setOpenForm={setOpen}
            onDeleteUser={() => {}}
            first_text='Confirm the device deletion'
            second_text='The selected devices will be deleted and unable to recover'
            accept_btn_name='accept'
            />
          </>
        )}
      </div>
    </div>
  )
}