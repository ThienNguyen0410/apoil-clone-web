import {useState, useEffect} from 'react'
import type { Dayjs } from 'dayjs'
import BreadCrumbBar from '../common/BreadCrumbs'
import {useTranslation} from 'react-i18next'
import { DollarOutlined, InfoCircleOutlined } from '@ant-design/icons'
import VoucherCard from './Voucher-card'
import SearchBox from '../common/SearchBox'
import SelectBox from '../common/SelectBox'
import DatePickerBar from '../common/DatePicker'
import TableView from '../common/Table'
import Footer from '../common/Footer'
import { useAppDispatch, useAppSelector } from '../../presenters/hooks'
import { fetchDeviceData } from '../../presenters/slices/deviceSlice'
import { fetchProductData } from '../../presenters/slices/productSlice'
import { fetchPaymentData } from '../../presenters/slices/paymentSlice'

import './index.scss'

export default function RevenuePage() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPagesize] = useState(7)
  const [filter, setFilter] = useState<Record<string, string> | undefined>(undefined)
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null)
  const {t} = useTranslation()
  const {Devices} = useAppSelector(s => s.device)
  const {products} = useAppSelector(s => s.product)
  const {payments, total,total_revenue,total_discount, loading, error} = useAppSelector(s => s.payment)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDeviceData({current: 1, pageSize: 9999}))
    dispatch(fetchProductData({current: 1, pageSize: 9999}))
  },[dispatch])

  const [filters, setFilters] = useState({
    device: '',
    oid_name: '',
    payment_status: '',
    refund: '',
    export_e_invoice: '',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchPaymentData({current: currentPage, pageSize, search, filter}))
    }, 500)

    return () => clearTimeout(timer)
  }, [dispatch, currentPage, pageSize, search, filter])

  const OptionList = {
    device: [
    {value: '', label: "All"},
    ...Devices.map((item) => ({
        value: item.id, label: item.device_name
    })),
],

    oil_name: [
        {value: '', label: 'All'},
        ...products.map((item) => ({
            value: item.id, label: item.name
        }))
    ],
    payment_status: [
        {value: '', label: 'All'},
        {value: '3', label: 'Processing'},
        {value: '1', label: 'Successful'},
        {value: '2', label: 'Failed'},
        {value: '4', label: 'Expired'}
    ],
    refund: [
        {value: '', label: 'All'},
        {value: '1', label: 'Have'},
        {value: '0', label: 'No'}
    ],
    export_e_invoice: [
        {value: '', label: 'All'},
        {value: '1', label: 'Completed'},
        {value: '2', label: 'No'},
        {value: '3', label: 'Failed'}
    ]
  }

  const filterFields: Record<string, {field: string, build: (v: string) => string}> = {
    device: {field: 'oilChangeSession.deviceId', build: (v) => `$eq:${v}`},
    oid_name: {field: 'oilChangeSession.productId', build: (v) => `$eq:${v}`},
    payment_status: {field: 'paymentStatus', build: (v) => `$eq:${v}`},
    refund: {field: 'refundStatus', build: (v) => v === '1' ? '$eq:1' : '$not:$eq:1'},
    export_e_invoice: {field: 'oilChangeSession.oilChangeSessionEInvoice.eInvoiceStatus', build: (v) => `$eq:${v}`},
  }

  const handleFilterChange = (key: keyof typeof filters) => (value: string) => {
    setFilters((prev) => ({...prev, [key]: value}))
    setFilter(prev => {
      const next = {...(prev ?? {})}
      const {field, build} = filterFields[key]
      if (value === '') delete next[field]
      else next[field] = build(value)
      return Object.keys(next).length > 0 ? next : undefined
    })
  }

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates)
    setFilter(prev => {
      const next = {...(prev ?? {})}
      if (dates && dates[0] && dates[1]) {
        next['oilChangeSession.paymentTime'] = `$btw:${dates[0].startOf('day').toISOString()},${dates[1].endOf('day').toISOString()}`
      } else {
        delete next['oilChangeSession.paymentTime']
      }
      return Object.keys(next).length > 0 ? next : undefined
    })
  }

  const columns = [
    {
      title: <div className="table-header-center">{t('No')}</div>,
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center' as const,
    },
    {
      title: t('Device'),
      dataIndex: 'device',
      key: 'device',
      width: 130,
      ellipsis: true,
    },
    {
      title: t('Transaction Code'),
      dataIndex: 'transaction_code',
      key: 'transaction_code',
      width: 130,
      ellipsis: true,
    },
    {
      title: t('Discount Code'),
      dataIndex: 'discount_code',
      key: 'discount_code',
      width: 130,
      ellipsis: true,
    },
    {
      title: t('Accumulated points'),
      dataIndex: 'accumulated_points',
      key: 'accumulated_points',
      width: 130,
    },
    {
      title: t('Discount'),
      dataIndex: 'discount',
      key: 'discount',
      width: 100,
    },
    {
      title: t('Total Payment'),
      dataIndex: 'total_payment',
      key: 'total_payment',
      width: 130,
    },
    {
      title: t('Payment Code'),
      dataIndex: 'payment_code',
      key: 'payment_code',
      width: 130,
      ellipsis: true,
    },
    {
      title: t('Oil'),
      dataIndex: 'oil',
      key: 'oil',
      width: 100,
    },
    {
      title: t('product name'),
      dataIndex: 'product_name',
      key: 'product_name',
      width: 130,
      ellipsis: true,
    },
    {
      title: t('Created At'),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 130,
    },
    {
      title: t('Payment Time'),
      dataIndex: 'payment_time',
      key: 'payment_time',
      width: 130,
    },
    {
      title: t('Payment Status'),
      dataIndex: 'payment_status',
      key: 'payment_status',
      width: 130,
    },
    {
      title: t('Refund'),
      dataIndex: 'refund',
      key: 'refund',
      width: 100,
    },
    {
      title: t('Export E - invoice'),
      dataIndex: 'export_e_invoice',
      key: 'export_e_invoice',
      width: 150,
    },
    {
      title: <div className="table-header-center">{t('Action')}</div>,
      key: 'action',
      width: 100,
      align: 'center' as const,
      render: () => (
        <InfoCircleOutlined style={{fontSize: 24, color: '#0d733b', cursor: 'pointer'}} />
      ),
    },
  ]

  const dataSource = payments.map((item, index) => ({
    key: index,
    no: index + 1,
    device: item.device_name,
    transaction_code: item.transaction_code,
    discount_code: item.discount_code,
    accumulated_points: item.accumulated_point,
    discount: item.discount,
    total_payment: item.total_payment,
    payment_code: item.payment_code,
    oil: item.oil_name,
    product_name: item.oil_name,
    created_at: item.created_at,
    payment_time: item.payment_time,
    payment_status: item.payment_status,
    refund: item.refund,
    export_e_invoice: item.export_invoice,
  }))

  const onPageSizechange = (pagesize: number) => {
    setPagesize(pagesize)
    setCurrentPage(1)
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="main-page">
        <BreadCrumbBar
        name={t("Revenue")}
        hasTabs={false}
        icon={<DollarOutlined/>}
        />

        <div className="main-layout">
            <div className="voucher-summary">
                <VoucherCard
                title={"Total revenue"}
                value={total_revenue.toLocaleString("en-US")}
                />

                <VoucherCard 
                title={"Total discount"}
                value={total_discount.toLocaleString("en-US")}
                />
            </div>

            <div className="flex-bar">
                <SearchBox
                title={t("Key word")}
                placeholder={t("Key word")}
                search={search}
                setSearch={setSearch}
                />

                <div className="select-menu">
                    <SelectBox
                    selectedStatus={filters.device}
                    onChangeStatus={handleFilterChange('device')}
                    options={OptionList.device}
                    title={"Device"}
                    />

                    <SelectBox
                    selectedStatus={filters.oid_name}
                    onChangeStatus={handleFilterChange('oid_name')}
                    options={OptionList.oil_name}
                    title={"Oil Name"}
                    />

                    <SelectBox
                    selectedStatus={filters.payment_status}
                    onChangeStatus={handleFilterChange('payment_status')}
                    options={OptionList.payment_status}
                    title={"Payment Status"}
                    />

                    <SelectBox
                    selectedStatus={filters.refund}
                    onChangeStatus={handleFilterChange('refund')}
                    options={OptionList.refund}
                    title={"Refund"}
                    />

                    <SelectBox
                    selectedStatus={filters.export_e_invoice}
                    onChangeStatus={handleFilterChange('export_e_invoice')}
                    options={OptionList.export_e_invoice}
                    title={"Export E-Invoice"}
                    />
                </div>
                <DatePickerBar
                value={dateRange}
                onChange={handleDateChange}
                />
            </div>

            <TableView
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              error={error}
              footer={null}
              onSort={() => {}}
              scroll={true}
            />

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
        </div>
    </div>
  )
}
