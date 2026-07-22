import {useState, useEffect} from 'react'
import {Switch} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import BreadCrums from '../BreadCrumbs'
import FlexBar from '../FlexBar'
import TableView from '../../common/Table'
import Footer from '../../common/Footer'
import Editicon from '../../icons/Editicon'
import RightMenu from '../Right-Menu'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../../presenters/hooks'
import {fetchUserData, fetchUsersRoles, fetchUserById, updateUserById, deleteMultipleUsers} from '../../../presenters/slices/userSlice'
import ProfilePopup from '../../popups/System-settings/Users/ProfilePopup'
import ConfirmDelete from '../../popups/System-settings/Users/ConfirmDelete'


import './index.scss'
import type UserEntities from '../../../entities/user/entity'
import ChangeStatusPop from '../../popups/System-settings/Users/ChangeStatusPop'

export default function UserPage({ collapsed }: { collapsed?: boolean }) {
  const dispatch = useAppDispatch()
  const {Users, RolesMap, selectedUser, loading, error, total} = useAppSelector((state) => state.user)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedstatus] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(7)
  const [openProfile, setOpenProfile] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [openDeleteForm, setOpenDeleteForm] = useState(false)
  const [openChangeForm , setOpenChangeForm] = useState(false)
  const [changedStatus, setChangeStatus] = useState<UserEntities | null >()
  
  const {t} = useTranslation()
  useEffect(() => {
    const ProfilePopupState = localStorage.getItem('ProfilePopupState') === 'true';
    const ProfilePopupViewMode = localStorage.getItem('ProfilePopupViewMode') === 'true';
    setOpenProfile(ProfilePopupState)
    setViewMode(ProfilePopupViewMode)
    setAddMode(false)

    const savedId = localStorage.getItem('UserInfoID')
    if (ProfilePopupState && savedId) {
      dispatch(fetchUserById(savedId))
    }
  },[])

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  useEffect(() => {
        const timer = setTimeout(() => {
        const RoleStatus = localStorage.getItem("SelectedRole")
      
        const filter: Record<string, any> ={}
        if (search === '' && !RoleStatus) dispatch(fetchUserData({current: currentPage, pageSize: pageSize}))
        else if (search && RoleStatus) {
          filter.roleId = `$eq:${RoleStatus}`
          setSelectedstatus(RoleStatus)
          dispatch(fetchUserData({current: currentPage, pageSize: pageSize, searchKeyword: search, filter: filter}))
        }
        else if (search) dispatch(fetchUserData({current: currentPage, pageSize: pageSize ,searchKeyword: search}))
        
        else  {
          filter.roleId = `$eq:${RoleStatus}`;
          setSelectedstatus(RoleStatus ?? '')
          dispatch(fetchUserData({current: currentPage, pageSize: pageSize, filter: filter}))
        }
    }, 500);
    return () => clearTimeout(timer)
  },[dispatch, search, currentPage, pageSize])

  useEffect(() => {
    dispatch(fetchUsersRoles(1))
  },[dispatch])

   const RolesOptions = [
    {value: '', label: 'Tất cả'},
    ...RolesMap.map((item: any) => ({
      value: item.id,
      label: item.role_name
    }))
  ]

  const onChangeStatus = (s: string) => {
    setSelectedstatus(s);
    setCurrentPage(1)
    localStorage.setItem("SelectedRole", s)
    if (!s) {
      dispatch(fetchUserData({current: 1, pageSize: pageSize, searchKeyword: search}))
      return
    }
    const filter: Record<string, any> = {}
    filter.roleId = `$eq:${s}`;
    dispatch(fetchUserData({current: 1, pageSize: pageSize, searchKeyword: search, filter: filter}))
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }
  const columns = [
    {
      title: t('No.'),
      dataIndex: 'stt',
      key: 'stt',
      width: 59,
      render: (_: any, __: any, index: number) => index + 1,
      align: 'center' as const
    },
    {
      title: t('Username'),
      dataIndex: 'username',
      key: 'username',
      width: 187,
      sorter: (a: any, b: any) => sortFunc("username", "asc")
    },
    {
      title: t('Full Name'),
      dataIndex: 'fullname',
      key: 'fullname',
      width: 187,
      sorter: true
    },
    {
      title: t('Role'),
      dataIndex: 'role',
      key: 'role',
      width: 187,
      sorter: true
    },
    {
      title: t('Phone Number'),
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 187,
      sorter: true
    },
    {
      title: t('Email'),
      dataIndex: 'email',
      key: 'email',
      width: 187,
      ellipsis: true,
      sorter: true,
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: number,record: UserEntities) => (
        <div style={{display: 'flex', alignItems: 'left', gap: 8, fontSize: '12px', fontFamily: 'Inter, sans-serif', justifyContent:'flex-start',
                  fontWeight: '600',
                  lineHeight:'18.8751px',
                  margin: '2px 0px 0px 8px'

        }}>
          <Switch checked={status == 1}
          style={status === 1 ? {
            background: "#0d733b"
          }:
          {}
        
        }
          onChange={() => {
            setOpenChangeForm(true)
            setChangeStatus(record)
          }} 
          />
          <span
          style={status === 1? {
            color: "#21924f"
          }: {
            color: "#898989"
          }}
          >{status === 1 ? t('Active') : t('Inactive')}</span>
        </div>
      ),
      width: 187
    },
    {
      title: t('Action'),
      key: 'action',
      render: (_: any, record: UserEntities) => (
        <div style={{display: 'flex', gap: 12, color: '#0d733b', justifyContent: 'center'}}>
          <ExclamationCircleOutlined style={{fontSize: 24, color: '#0d733b', cursor: "pointer"}} 
          onClick={() => {
            setViewMode(true)
            setAddMode(false)
            setOpenProfile(true)
            localStorage.setItem("ProfilePopupState", JSON.stringify(true))
            localStorage.setItem("ProfilePopupViewMode", JSON.stringify(true))
            localStorage.setItem("UserInfoID", record.id ?? "")
            dispatch(fetchUserById(record.id)) 
          }}
          />
          <div className="edit-icon" style={{cursor: "pointer"}}
          onClick={() => {
            dispatch(fetchUserById(record.id))
            setViewMode(false)
            setAddMode(false)
            setOpenProfile(true)
            localStorage.setItem("ProfilePopupState", JSON.stringify(true))
            localStorage.setItem("ProfilePopupViewMode", JSON.stringify(false))
            localStorage.setItem("UserInfoID", record.id ?? "")
          }}
          >
            <Editicon
            />
          </div>
        </div>
      ),
      width: 187,
      align: 'center' as const,
    },
  ]

  const dataSource = Users.map((user, index) => ({
    key: index,
    ...user,
  }))

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys)

    },
    columnWidth: 65,
  }
  
  const onDeleteUsers = ()  => {
    const deleteIds = dataSource.filter(item => selectedRowKeys.includes(item.key)).map(item => item.id!)
    console.log(deleteIds)
    dispatch(deleteMultipleUsers(deleteIds)).unwrap().then(() => {
      dispatch(fetchUserData({current: currentPage, pageSize, searchKeyword: search}))
      setSelectedRowKeys([])
    })
    setOpenDeleteForm(false)
  }

  const sortFunc = (field: string, order: string) => {

  }

  return (
    <div className={`main-page${collapsed ? ' collapsed' : ''}`}>
      <div breadcrumb-section>
          <BreadCrums/>
      </div>

        <div className="main-layout">
                <FlexBar
                searchTitle={t("Key Word")}
                placeholder={t("Key Word")}
                search={search}
                setSearch={setSearch}
                selectedTitle={t("Roles")}
                selectedStatus={selectedStatus}
                onChangeStatus={(value: string) => onChangeStatus(value)}
                options={RolesOptions}
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
          {!error && !loading? (
            <div className="footer">
              <Footer
              currentEntries={pageSize}
              setCurrentEntries={onPageSizeChange}
              currentPage={currentPage}
              pageSize={pageSize}
              total={total}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              />
            </div>
          ) : undefined}

          <div className="right-menu-wrapper">
            <RightMenu 
            onAddClick={() => {
              setAddMode(true)
              setViewMode(false)
              setOpenProfile(true)
              localStorage.setItem("ProfilePopupState", JSON.stringify(true))
              localStorage.setItem("ProfilePopupViewMode", JSON.stringify(false))
            }}
            onDelete={() => {
              if (selectedRowKeys.length > 0) setOpenDeleteForm(true)
              setOpenDeleteForm(true)
            }}
            hasDeleteRow={selectedRowKeys.length > 0}
            />

          </div>

          <ProfilePopup
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          ViewMode={viewMode}
          AddMode={addMode}
          UserData={selectedUser}
          roleOptions={RolesOptions.filter(r => r.value !== '')}
          />

          <ConfirmDelete
          openForm={openDeleteForm}
          setOpenForm={setOpenDeleteForm}
          onDeleteUser={onDeleteUsers}
          />
          <ChangeStatusPop
          openForm={openChangeForm}
          setOpenForm={setOpenChangeForm}
          onChangeStatus={() => {
            
            if(changedStatus) {
              const newStatus = changedStatus.status === 1 ? 2 : 1;
              dispatch(updateUserById({...changedStatus, status: newStatus})).unwrap().then(() => {
                dispatch(fetchUserData({current: currentPage, pageSize, searchKeyword: search}))
              })
              setOpenChangeForm(false)
            }
          }}
          />
        </div>
    </div>
  )
}
