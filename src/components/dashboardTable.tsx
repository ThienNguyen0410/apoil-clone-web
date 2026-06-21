import  {Table, Segmented} from 'antd'
import { mockCustomers } from '../lib/data'
import {InfoCircleOutlined,UserOutlined} from '@ant-design/icons'
//import CustomerEntity from '../entities/customer/entity'
import './dashboardStyle.scss'

export default function DashboardContent() {
  const columns = [
    {
        title: "STT",
        dataIndex: "id"
    },
    {
        title: "Tên khách hàng",
        dataIndex: "name"
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone_number"
    },
    {
        title: "Số lần thay nhớt",
        dataIndex: "times_change_oil"
    },
    {
        title: "Chu kỳ thay nhớt tiếp theo",
        dataIndex: "duration_next_change"
    },
    {
        title: "Trạng thái",
        dataIndex: "status"
    },
     {
        title: "Hành động",
        dataIndex: "action"
    }
  ]

  const data = mockCustomers.map((customer, index) => ({
    key: index ,
    id: customer.ID,
    name: customer.name,
    phone_number: customer.phone_number,
    times_change_oil: customer.number_of_oil_changes,
    duration_next_change: customer.next_time_change_oil,
    status: customer.status ? "Hoạt động" : "Ngưng hoạt động",
    action: <InfoCircleOutlined/>
  }))

  return (
    <>
        <div className="header-content">
            <div className="header-title">
                <UserOutlined></UserOutlined>
                <span>Khách hàng</span>
            </div>
           
            <div className="profile-avtar">
                <UserOutlined className="user-icon"/>
            </div>
        </div>

        <Segmented
            options={[
            { label: 'Dashboard', value: 'dashboard' },
            { label: 'Khách hàng', value: 'customers' },
          ]}
        />
        <Table className='customer-table'
            columns={columns}
            dataSource={data}
        />
    </>
  )
}
