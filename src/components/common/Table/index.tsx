import {Table, Spin} from 'antd';
import type {TableRowSelection} from 'antd/es/table/interface';
import './index.scss'

type TableProps = {
    columns: any;
    dataSource: any;
    footer: any;
    error: string | null;
    loading: boolean;
    rowSelection?: TableRowSelection<any>;
    onSort : () => void
}
export default function TableView({columns, dataSource, footer, error, loading, rowSelection, onSort}: TableProps ){
  return (
    <div className="custom-table" onClick={(e) => e.stopPropagation()}>
        <Spin spinning={loading} size="medium">
            <Table
            columns={columns}
            dataSource={dataSource}
            footer={error ? footer : undefined}
            rowSelection={rowSelection}
            pagination={false}
            tableLayout='fixed'
            />
        </Spin>
    </div>
  )
}
