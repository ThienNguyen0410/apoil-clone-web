import { Modal } from 'antd'
import Trashicon from '../../../icons/Trashicon'
import './ConfrimDelete.scss'

type ConfirmDeleteProps = {
  openForm: boolean
  setOpenForm: (v: boolean) => void
  onDeleteUser: () => void
  first_text: string
  second_text: string
  accept_btn_name: string
}

export default function ConfirmDelete({ openForm, setOpenForm, onDeleteUser, first_text, second_text, accept_btn_name}: ConfirmDeleteProps) {
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
          <h1>{first_text}</h1>
          <p>{second_text}</p>
        </div>

        <div className="confirm-delete-actions">
          <button type="button" className="cancel-btn" onClick={() => setOpenForm(false)}>
            Cancel
          </button>
          <button type="button" className="confirm-btn"
          onClick={onDeleteUser}
          >
            {accept_btn_name}
          </button>
        </div>
      </div>
    </Modal>
  )
}
