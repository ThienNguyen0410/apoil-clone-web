import {Progress} from 'antd'
import './index.scss'

type ProgressProps = {
    currValue: number,
    maxValue: number
    percent: number
}

export default function ProgressView({currValue, maxValue, percent}: ProgressProps) {
  return (
    <div className="progress-bar">
        <div className="progress-data">
            <span className="leftNumber">{currValue}/{maxValue}</span>
            <span className="rightNumber">{percent}%</span>
        </div>

        <Progress percent={percent} showInfo={false}/>
    </div>
  )
}
