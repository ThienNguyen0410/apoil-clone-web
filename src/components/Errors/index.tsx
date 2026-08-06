import {useEffect, useState, type Key} from 'react'
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import BreadCrumbBar from '../common/BreadCrumbs'
import SearchBox from '../common/SearchBox'
import SelectBox from '../common/SelectBox'
import {useTranslation} from 'react-i18next'
import type {TableRowSelection} from 'antd/es/table/interface'
import TableView from '../common/Table'
import Footer from '../common/Footer'
import { useAppDispatch, useAppSelector } from '../../presenters/hooks'
import { fetchErrorData, fetchErrorById } from '../../presenters/slices/errorSlice'
import { useOutletContext } from 'react-router-dom'
import DeleteIcon from '../icons/Deleteicon'
import DetailPopup from '../popups/Errors/DetailPopup'

import './index.scss'
import type { ErrorEntities } from '../../entities/error/entity'
type DashboardContext = {collapsed: boolean}

export default function ErrorPage() {
  const {collapsed} = useOutletContext<DashboardContext>()
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const {errors, selectedError,loading, error, total} = useAppSelector(s => s.error)
  const [search, setSearch] = useState('')
  const [statusSelected, setstatusSelected] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPagesize] = useState(7)
  const [open, setOpen] = useState(false)
  const [currError, setSelectedCurrError] = useState<ErrorEntities | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const filter: Record<string, string> = {}
      if (statusSelected) filter['status'] = `$eq:${statusSelected}`
      if (selectedCategory) filter['errorType.source'] = `$eq:${selectedCategory}`
      dispatch(fetchErrorData({current: currentPage, pageSize, search, filter: Object.keys(filter).length > 0 ? filter : undefined}))
    }, 500)
  
    return () => clearInterval(timer)
  }, [dispatch, currentPage, pageSize, search, statusSelected, selectedCategory])

  useEffect(() => {
    dispatch(fetchErrorById(currError?.id ?? ""))
  }, [dispatch, currError])

  const statusOptions = [
    {value: '',  label: t('All')},
    {value: '1', label: t('Processed')},
    {value: '2', label: t('Unprocessed')}
]

  const categoryOptions = [
    {value: '', label: t('All')},
    {value: '1', label: t('Device')},
    {value: '2', label: t('User')}
]

const columns = [
    {
      title: <div className="table-header-center">{t('STT')}</div>,
      dataIndex: 'stt',
      key: 'stt',
      width: 59,
      align: 'center' as const,
    },
    {
      title: t('Error Code'),
      dataIndex: 'error_code',
      key: 'error_code',
      width: 130,
      ellipsis: true,
    },
    {
      title: t('Device'),
      dataIndex: 'device',
      key: 'device',
      width: 130,
      ellipsis: true,
    },
    {
      title: t('Category'),
      dataIndex: 'category',
      key: 'category',
      width: 130,
      render: (value: number) => {
        if (value === 1) return t('Device')
        if (value === 2) return t('User')
        return '---'
      },
    },
    {
      title: t('Issue Content'),
      dataIndex: 'issue_content',
      key: 'issue_content',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('Error Description'),
      dataIndex: 'error_description',
      key: 'error_description',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      width: 130,
      align: 'left' as const,
      render: (value: number) => {
        if (value === 1) return (
          <div style={{display:"flex", justifyContent: "left", alignItems:'flex-start'}}>
             <span className="processed-status">
              <span>&bull;</span>
              {t('Processed')}
            </span>
          </div>
         
        )
        if (value === 2) return (
          <span className="unprocessed-status">
            <span style={{width: 6, height: 6, fontWeight: 600, lineHeight: 1}}>&bull;</span>
            {t('Unprocessed')}
          </span>
        )
        return '---'
      },
    },
    {
      title: t('Handler'),
      dataIndex: 'handler',
      key: 'handler',
      width: 130,
    },
    {
      title: t('Handling Time'),
      dataIndex: 'handling_time',
      key: 'handling_time',
      width: 130,
    },
    {
      title: <div className="table-header-center">{t('Action')}</div>,
      key: 'action',
      width: 130,
      align: 'center' as const,
      render: (_:unknown, record: ErrorEntities) => (
        <InfoCircleOutlined style={{fontSize: 24, color: '#0d733b', cursor: 'pointer'}} 
          onClick={() => {
            handleOpenPopup(record.id)
            setSelectedCurrError(record)
          }
        }
        />
      ),
    },
  ]

const dataSource = errors.map((item, index) => ({
    key: index,
    stt: index + 1,
    id: item.id,
    error_code: item.code || '---',
    device: item.device || '---',
    category: item.category,
    issue_content: item.content || '---',
    error_description: item.description || '---',
    status: item.status,
    handler: item.processed_employee || '---',
    handling_time: item.processed_time || '---',
}))

const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
    },
    columnWidth: 65,
}

const onPageSizechange = (pagesize: number) => {
    setPagesize(pagesize)
    setCurrentPage(1)
}

const onPageChange = (page: number) => {
    setCurrentPage(page)
}

const handleOpenPopup = (id: string) => {
  setOpen(true)
  dispatch(fetchErrorById(id))
}

  return (
    <div className={`main-page${collapsed? ' collapsed' : ''}`}>
        <BreadCrumbBar
        name={t("Errors")}
        hasTabs={false}
        icon={<ExclamationCircleOutlined/>}
        />

        <div className="main-layout">
            <div className="flex-bar">
                <SearchBox
                title={t("Key word")}
                placeholder={t("Key word")}
                search={search}
                setSearch={setSearch}
                />

                <div className="select-menu">
                    <SelectBox
                    title={t("Status")}
                    options={statusOptions}
                    selectedStatus={statusSelected}
                    onChangeStatus={setstatusSelected}
                    />

                    <SelectBox
                    title={t("Category")}
                    options={categoryOptions}
                    selectedStatus={selectedCategory}
                    onChangeStatus={setSelectedCategory}
                    />
                </div>
                
            </div>

            <TableView
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              error={error}
              footer={null}
              rowSelection={rowSelection}
              onSort={() => {}}
            />

            <div className={`right-menu-delete${selectedRowKeys.length === 0 ? ' disabled' : ''}`}
            >
              <DeleteIcon/>
            </div>

            {!error ? (
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

            <DetailPopup
            open={open}
            setOpen={setOpen}
            error={selectedError}
            />
        </div>
    </div>
  )
}
