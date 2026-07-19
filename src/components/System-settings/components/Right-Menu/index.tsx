import AddIcon from '../../../icons/Addicon'
import DeleteIcon from '../../../icons/Deleteicon'
import './index.scss'

type RightMenuProps = {
  onAddClick?: () => void
  onDelete: () => void
  hasDeleteRow: boolean
}

export default function RightMenu({onAddClick, onDelete, hasDeleteRow}: RightMenuProps) {
  return (
    <div className="right-menu" onClick={(e) => e.stopPropagation()}>
        <div className="add-wrapper" onClick={onAddClick}>
            <AddIcon/>
        </div>

        <div className={`delete-wrapper${!hasDeleteRow ? ' disabled' : ''}`} 
          onClick={hasDeleteRow ? onDelete : undefined}>
            <DeleteIcon/>
        </div>
    </div>
  )
}
