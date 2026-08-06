import type { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import './index.scss'

const {RangePicker} = DatePicker

type DatePickerBarProps = {
    value?: [Dayjs | null, Dayjs | null] | null
    onChange?: (dates: [Dayjs | null, Dayjs | null] | null) => void
}

export default function DatePickerBar({value, onChange}: DatePickerBarProps) {
    return (
        <RangePicker
        value={value}
        onChange={onChange}
        />
    )
}