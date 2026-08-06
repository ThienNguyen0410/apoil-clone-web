import { Modal } from 'antd'
import dayjs from 'dayjs'
import type { ErrorEntities } from '../../../entities/error/entity'
import './DetailPopup.scss'
import { useTranslation } from 'react-i18next'

type DetailPopupProps = {
    open: boolean,
    setOpen: (v: boolean) => void
    error: ErrorEntities | null
}

export default function DetailPopup({ open, setOpen, error }: DetailPopupProps) {
    const {t} = useTranslation()
    return (
        <Modal
            open={open}
            width={1200}
            closable={true}
            onCancel={() => setOpen(false)}
            footer={null}
            className="error-detail-popup"
        >

            <div className="header">
                <span>Chi tiết báo lỗi</span>
            </div>

            <div className="body">
                <div className="body-content">
                    <div className="row two-cols time-status-row">
                        <div className="field">
                            <label>Mã báo lỗi</label>
                            <input 
                            type="text" 
                            disabled
                            value={error?.code} 
                            />
                        </div>

                        <div className="field">
                            <label>Thiết bị</label>
                            <input type="text" disabled 
                            value={error?.device}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="field full">
                            <label>Nội dung vấn đề</label>
                            <input type="text" disabled value={error?.content}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="field full">
                            <label>Mô tả lỗi</label>
                            <input type="text" disabled value={error?.description}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="field full">
                            <label>Thông tin liên hệ</label>
                            <input type="text" disabled value={error?.contact} />
                        </div>
                    </div>

                    <div className="row two-cols-last">
                        <div className="field">
                            <label>Thời gian báo lỗi</label>
                            <input type="text" disabled value={dayjs(error?.error_time).format("HH:mm DD/MM/YYYY")}/>
                        </div>

                        <div className="field">
                            <label>Trạng thái</label>
                            {error?.status === 1 ? (<span className="processed-status">
                                <span>&bull;</span>
                                {t('Processed')}
                            </span>) : (
                                <span className="unprocessed-status">
                                    <span style={{width: 6, height: 6, fontWeight: 600, lineHeight: 1}}>&bull;</span>
                                    {t('Unprocessed')}
                                </span>

                            )}
                        </div>

                        {error?.status === 1 ? (
                        <div className="field processed-time">
                            <label>Thời gian xử lý</label>
                            <input
                                disabled
                                type="text"
                            />
                        </div>): <></>}
                    </div>
                    
                    {error?.status === 1 ? (
                    <div className="row">
                        <div className="field full note-input">
                            <label>Ghi chú</label>
                            <input
                                type="text"
                                disabled
                                value={error?.status === 1 ? 'Da xu ly': 'Chua xu ly'}
                            />
                        </div>
                    </div>) : (<></>)}

                    <div className="row footer-row">
                        <button className="close-btn" onClick={() => setOpen(false)}>Đóng</button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}
