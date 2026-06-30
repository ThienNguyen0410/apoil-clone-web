import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import './logout.scss'

interface LogoutProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  handleLogout: () => void;
}

export default function LogoutPopup({ open, setOpen, handleLogout }: LogoutProps) {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      width={500}
      className="logout-modal"
    >
      <div className="logout-modal">
        <div className="logout-header">
          <div className="icon">
            <ExclamationCircleOutlined />
          </div>
        </div>

        <div className="logout-body">
          <h2>Xác nhận đăng xuất khỏi thiết bị</h2>
          <p>Bạn có thực sự muốn đăng xuất không?</p>

          <div className="buttons">
            <Button onClick={() => setOpen(false)}
                id="cancel">
              Hủy
            </Button>

            <Button
              type="primary"
              onClick={handleLogout}
              id="accept"
            >
              Đồng ý
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
