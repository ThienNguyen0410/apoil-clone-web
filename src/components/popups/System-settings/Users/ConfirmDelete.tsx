import { Modal } from 'antd'
import Trashicon from '../../../icons/Trashicon'
import './ConfrimDelete.scss'

type ConfirmDeleteProps = {
  openForm: boolean
  setOpenForm: (v: boolean) => void
  onDeleteUser: () => void
}

export default function ConfirmDelete({ openForm, setOpenForm, onDeleteUser}: ConfirmDeleteProps) {
  return (
    <Modal
      width={502}
      open={openForm}
      footer={null}
      closable={false}
      centered
      className="confirm-delete-popup"
      getContainer={false}
      onCancel={() => setOpenForm(false)}
      style={{
        marginTop: "-180px",
        marginLeft: "55px"
      }}
    >
      <div className="confirm-delete-content">
        <div className="red-outlined"></div>
        <div className="confirm-delete-icon">
          <Trashicon />
        </div>

        <div className="confirm-delete-text">
          <h1>Confirm account deletion?</h1>
          <p>This account information data will be deleted.</p>
        </div>

        <div className="confirm-delete-actions">
          <button type="button" className="cancel-btn" onClick={() => setOpenForm(false)}>
            Cancel
          </button>
          <button type="button" className="confirm-btn"
          onClick={onDeleteUser}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}
