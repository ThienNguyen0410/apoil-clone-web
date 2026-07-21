import React from 'react'
import {FileOutlined} from '@ant-design/icons'
import './index.scss'
import Export from '../../icons/Export'

export default function SavedBtn() {
  return (
     <div className="saved-btn-wrapper">
        <div className="item-icon">
          <Export />
        </div>
     </div>
  )
}
