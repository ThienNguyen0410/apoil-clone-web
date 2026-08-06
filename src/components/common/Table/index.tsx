import {Table, Spin} from 'antd';
import type {TableRowSelection} from 'antd/es/table/interface';
import './index.scss'

type SorterInfo = {
  field?: string,
  order?: 'ascend' | 'descend'
}

type TableProps = {
    columns: any;
    dataSource: any;
    footer: any;
    error: string | null;
    loading: boolean;
    rowSelection?: TableRowSelection<any>;
    scroll?: boolean;
    onSort : (sorter: SorterInfo) => void
}
export default function TableView({columns, dataSource, footer, error, loading, rowSelection, scroll, onSort}: TableProps ){
  const handleChange = (_:any, __:any, sorter: any) => {
    if (!Array.isArray(sorter)) onSort({field: sorter.field, order: sorter.order})
  }

  const enableScroll = Boolean(scroll)
  const scrollX = columns?.reduce((total: number, col: any) => total + (Number(col?.width) || 0), 0) || 500

  return (
    <div className={`custom-table${enableScroll ? ' table-scroll' : ''}`} onClick={(e) => e.stopPropagation()}>
        <Spin spinning={loading} size="medium">
            <Table
            columns={columns}
            dataSource={dataSource}
            footer={error ? footer : undefined}
            rowSelection={rowSelection}
            pagination={false}
            scroll={enableScroll ? {y: 500, x: scrollX} : undefined}
            onChange={handleChange}
            />
        </Spin>
    </div>
  )
}
