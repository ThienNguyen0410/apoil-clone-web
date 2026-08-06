import {Progress} from 'antd'
import './index.scss'

type ProgressProps = {
    currValue: number,
    maxValue: number
    percent: number
    swapped: boolean // swap right and left number
}

export default function ProgressView({currValue, maxValue, percent, swapped}: ProgressProps) {
  return (
    <div className="progress-bar">
        <div className="progress-data">
          {!swapped? (
            <>
            <span className="leftNumber">{currValue}/{maxValue}</span>
            <span className="rightNumber">{percent}%</span>
            </>
          ): (
            <>
                <span className="leftNumber">{percent}%</span>
                <span className="rightNumber">{currValue}/{maxValue}</span>
            </>
          )}
            
        </div>

        <Progress percent={percent} showInfo={false}/>
    </div>
  )
}
