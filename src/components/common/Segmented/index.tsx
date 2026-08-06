import {Segmented} from 'antd'
import './index.scss'

type SegmentedItem = {
 value: string | number,
 label: string
}

type SegmentedProps = {
 options: SegmentedItem[]
 value?: string | number
 onChange?: (value: string | number) => void
}


export default function SegmentedBar({options, value, onChange}: SegmentedProps) {
  return (
    <Segmented
    onClick={(e) => e.stopPropagation()}
    options={options}
    value={value}
    onChange={onChange}
    className="custom-segmented"
    />
  )
}
