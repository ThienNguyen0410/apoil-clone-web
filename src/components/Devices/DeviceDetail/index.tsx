import BreadCrumbBar from '../../common/BreadCrumbs'
import SegmentedBar from '../../common/Segmented'
import { ApartmentOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../presenters/hooks'
import { fetchDeviceById } from '../../../presenters/slices/deviceSlice'
import {useEffect} from 'react'
import {useParams, Outlet, useNavigate, useLocation} from 'react-router-dom'
import './index.scss'

const TAB_MAP: Record<string, string> = {
  'detail': '',
  'transaction-history': 'transaction-history',
  'collection-history': 'collection-history',
  'revenue': 'revenue',
}

const REVERSE_TAB_MAP: Record<string, string> = {
  '': 'detail',
  'transaction-history': 'transaction-history',
  'collection-history': 'collection-history',
  'revenue': 'revenue',
}

export default function DeviceDetailMain() {
  const {selectedDevice} = useAppSelector(s => s.device)
  const breadCrumbsItem = [
    selectedDevice?.device_name ?? ""
  ]

  const segmentedOptions = [
    {value: 'detail', label: "Device Information" },
    {value: 'transaction-history', label: "Transaction History"},
    {value: 'collection-history', label: "Collection/Transfer History"},
    {value: 'revenue', label: "Revenue"}
  ]
  const dispatch = useAppDispatch()
  const {id} = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const segments = location.pathname.split('/').filter(Boolean)
  const currentTab = REVERSE_TAB_MAP[segments[segments.length - 1]] ?? 'detail'

  useEffect(() => {
    dispatch(fetchDeviceById(id ?? ""))
  }, [dispatch])

  return (
    <div className="device-detail-page">
      <BreadCrumbBar
      name={"Device"}
      hasTabs={true}
      tabs={breadCrumbsItem}
      icon={<ApartmentOutlined/>}
      />

      <SegmentedBar
      options={segmentedOptions}
      value={currentTab}
      onChange={(val) => {
        const path = TAB_MAP[val as string]
        navigate(`/apsp/device/${id}/detail/${path}`)
      }}
      />
      <div className="detail-modules">
        <Outlet/>
      </div>
    </div>
    
  )
}
