import './index.scss'
import { useParams } from 'react-router-dom'
import {useEffect} from 'react'
import EditIcon from '../../../icons/Editicon'
import { useAppDispatch, useAppSelector } from '../../../../presenters/hooks'
import { fetchDeviceById, fetchDeviceGroupData,fetchProvincesData, fetchDistrictsData, fetchCommunesData } from '../../../../presenters/slices/deviceSlice'
import ProgressBar from '../../..//common/Progress'

export default function DetailTab() {
  const dispatch = useAppDispatch()
  const {selectedDevice,DeviceGroupMap, Provinces, Districts, Communes} = useAppSelector(s => s.device)
  const{id} = useParams()

  useEffect(() => {
    dispatch(fetchDeviceById(id ?? ""))
    dispatch(fetchDeviceGroupData({current: 1, pageSize: 9999}))
    dispatch(fetchProvincesData({current: 1, pageSize: 9999}))
    dispatch(fetchDistrictsData({current: 1, pageSize: 9999}))
    dispatch(fetchCommunesData({current: 1, pageSize: 9999}))
  }, [dispatch])

  const groupNames =
  DeviceGroupMap
    .filter((g) => selectedDevice?.device_group_id.includes(g.group_id))
    .map((g) => g.group_name);
  
  const provinceName = Provinces.find((p) => p.province_id === selectedDevice?.provinceid)?.province_name
  const districtName = Districts.find((d) => d.district_id === selectedDevice?.districtid)?.district_name
  const communeName = Communes.find((c) => c.ward_id ===  selectedDevice?.communeid)?.ward_name

  return (
    <div className="detail-tab">
        <div className="sider-info">
          <div className="child-info">
            <div className="child-info-header">'
              <h1>Device Information</h1>
              <EditIcon/>
            </div>

            <div className="child-form-data">
              <div className="child-data">
                <h2>Device Code:</h2>
                <span>{selectedDevice?.device_code}</span>
              </div>
              <div className="child-data">
                <h2>Device Name:</h2>
                <span>{selectedDevice?.device_name}</span>
              </div>
              <div className="child-data">
                <h2>Device Group:</h2>
                <div className={groupNames.length > 0? "device-group": ""}>{groupNames}</div>
              </div>
              <div className="child-data">
                <h2>Address:</h2>
                <span>{`${selectedDevice?.address}, ${communeName}, ${districtName}, ${provinceName}`}</span>
              </div>
              <div className="child-data">
                <h2>Longitude:</h2>
                <span>{selectedDevice?.longitude}</span>
              </div>
              <div className="child-data">
                <h2>Latitude:</h2>
                <span>{selectedDevice?.latitude}</span>
              </div>
              <div className="child-data">
                <h2>Operation Status:</h2>
                <div className={selectedDevice?.status === 1? "status-done" : "status-overdue"}>
                  <div className="bullet-point">&bull;</div>
                  {selectedDevice?.status === 1 ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="child-data">
                <h2>Contact Phone Numnber:</h2>
                <span>{selectedDevice?.phone_number}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="main-card">
          <div className="scooter-card-progress">
            <div className="progress-inner">
                 <ProgressBar
                  currValue={(selectedDevice?.scooter_oil.currValue ?? 0)/1000}
                  maxValue={(selectedDevice?.scooter_oil.maxValue ?? 0)/1000}
                  percent={Math.round((selectedDevice?.scooter_oil.currValue ?? 0)/ (selectedDevice?.scooter_oil.maxValue ?? 0) * 100)}
                  swapped={true}
                />
                <div className="box-text">
                  SP Green Power Scooter Green 3R
                </div>
            </div>

            <div className="progress-info">
              <div className="progress-info-top">
                <label>Listed price/litter: </label>
                <span className="top-span">{selectedDevice?.scooter_oil.price.toLocaleString()} </span> <label className="vnd-label">VNĐ</label>
               </div>
               <div className="progress-info-bottom"> 
                <label>Discounted price/liter:</label>
                <span className="bottom-span">{selectedDevice?.scooter_oil.priceReduction.toLocaleString()} <label className="vnd-label">VNĐ</label></span>
              </div>
            </div>
           
          </div>

          <div className="gear-card-progress">
            <div className="progress-inner">
                 <ProgressBar
                  currValue={(selectedDevice?.gear_oil.currValue ?? 0)/1000}
                  maxValue={(selectedDevice?.gear_oil.maxValue ?? 0)/1000}
                  percent={Math.round((selectedDevice?.gear_oil.currValue ?? 0)/ (selectedDevice?.gear_oil.maxValue ?? 0) * 100)}
                  swapped={true}
                />
                <div className="box-text">
                  SP Green Power 3R
                </div>
            </div>

            <div className="progress-info">
              <div className="progress-info-top">
                <label>Listed price/litter: </label>
                <span className="top-span">{selectedDevice?.gear_oil.price?.toLocaleString()} </span> <label className="vnd-label">VNĐ</label>
               </div>
               <div className="progress-info-bottom"> 
                <label>Discounted price/liter:</label>
                <span className="bottom-span">{selectedDevice?.gear_oil.priceReduction?.toLocaleString()} <label className="vnd-label">VNĐ</label></span>
              </div>
            </div>
            
          </div>

          <div className="waste-oil-progress">
            <div className="progress-inner">
                 <ProgressBar
                  currValue={(selectedDevice?.waste_oil_tank.currValue ?? 0)/1000}
                  maxValue={(selectedDevice?.waste_oil_tank.maxValue ?? 0)/1000}
                  percent={Math.round((selectedDevice?.waste_oil_tank.currValue ?? 0)/ (selectedDevice?.waste_oil_tank.maxValue ?? 0) * 100)}
                  swapped={true}
                />
                <div className="box-text">
                  Waste Oil Tank
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
