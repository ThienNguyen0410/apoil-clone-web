import {Modal} from 'antd'
import ChangeIcon from '../../../icons/ChangeIcon'
import './ChangeStatusPop.scss'

type ChangeStatusPopProps = {
   openForm: boolean
   setOpenForm: (v: boolean) => void
   onChangeStatus: () => void
}
export default function ChangeStatusPop({openForm, setOpenForm, onChangeStatus}: ChangeStatusPopProps) {
     return (
        <Modal
      width={500}
      open={openForm}
      footer={null}
      closable={false}
      centered
      className="confirm-change-popup"
      getContainer={false}
      onCancel={() => setOpenForm(false)}
      style={{
        marginTop: "-165px",
        marginLeft: "20px"
      }}
        >
        <div className="confirm-change-connent">
            <div className="green-outlined"></div>
            <div className="confirm-change-icon">
                <ChangeIcon/>
            </div>

            <div className="confirm-change-text">
                <h1>Update Status!</h1>
                <p>The selected account will be changed to <b style={{color: "#666"}}>Deactived</b></p>
                <p> status. Are you sure?</p>
            </div>

            <div className="confirm-change-actions">
                <button type="button" className="cancel-change-btn"
                onClick={() => setOpenForm(false)}
                >Cancel</button>

                 <button type="button" className="confirm-change-btn"
                    onClick={onChangeStatus}
                    >
                        Confirm
                </button>
            </div>
        </div>
        </Modal>
    )
}
