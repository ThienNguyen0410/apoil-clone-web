import {Modal} from 'antd'
import './ConfrimDelete.scss'

type ConfirmDeleteProps = {
    openForm: boolean
    setOpenForm: (v:boolean) => void
}

export default function ConfirmDelete({openForm, setOpenForm}: ConfirmDeleteProps) {
  return (
        <Modal
        width={502}
        open={openForm}
        footer={null}
        closable={false}
        centered
        className="confirm-delete-popup"
        getContainer={false}
        onCancel= {() => setOpenForm(false)}
        >


        </Modal>
  )
}
