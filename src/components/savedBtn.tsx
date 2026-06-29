import React from 'react'
import {FileOutlined} from '@ant-design/icons'
import './savedBtn.scss'

export default function SavedBtn() {
  return (
     <div className="saved-btn-wrapper">
        <div className="item-icon">
            <FileOutlined />
        </div>
     </div>
  )
}
