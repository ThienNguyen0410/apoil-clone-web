import { useTranslation } from "react-i18next"
import {Select} from 'antd'
import './index.scss'

type SelectBoxProps = {
    title: string,
    selectedStatus: string,
    onChangeStatus: (s: string) => void 
    options: any
}

export default function SelectBox({selectedStatus, onChangeStatus, options, title} : SelectBoxProps) {
  const {t} = useTranslation()
  return (
    <div className="select-section">
        <h1>{t(title)}</h1>
        <Select
        className="select-box"
        options={options}
        value={selectedStatus}
        placeholder={selectedStatus}
        onChange={onChangeStatus}
        onClick={(e) => e.stopPropagation()}
        />
    </div>
  )
}
