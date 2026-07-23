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
    onSort : (sorter: SorterInfo) => void
}
export default function TableView({columns, dataSource, footer, error, loading, rowSelection, onSort}: TableProps ){
  const handleChange = (_:any, __:any, sorter: any) => {
    if (!Array.isArray(sorter)) onSort({field: sorter.field, order: sorter.order})
  }

  return (
    <div className="custom-table" onClick={(e) => e.stopPropagation()}>
        <Spin spinning={loading} size="medium">
            <Table
            columns={columns}
            dataSource={dataSource}
            footer={error ? footer : undefined}
            rowSelection={rowSelection}
            pagination={false}
            onChange={handleChange}
            //tableLayout='fixed'
            />
        </Spin>
    </div>
  )
}
