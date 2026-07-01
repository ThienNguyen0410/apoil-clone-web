import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import './logout.scss'

interface LogoutProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  handleLogout: () => void;
}

export default function LogoutPopup({ open, setOpen, handleLogout }: LogoutProps) {
  const {t} = useTranslation()
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
          <h2>{t("confirm logout")}</h2>
          <p>{t("lougout confirm")}</p>

          <div className="buttons">
            <Button onClick={() => setOpen(false)}
                id="cancel">
              {t("Cancel")}
            </Button>

            <Button
              type="primary"
              onClick={handleLogout}
              id="accept"
            >
              {t("ok")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
