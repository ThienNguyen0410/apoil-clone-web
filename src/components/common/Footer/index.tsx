import {Pagination} from 'antd'
import {useTranslation} from 'react-i18next'

type FooterProps = {
    //For entries display
    currentEntries: number,
    setCurrentEntries: (s: number) => void

    //For pagination
    currentPage: number,
    pageSize: number,
    total: number,
    onPageChange: (page: number) => void,
    onPageSizeChange: (pageSize: number) => void,

}
export default function Footer({currentEntries,setCurrentEntries,currentPage, pageSize, total, onPageChange, onPageSizeChange}: FooterProps) {
   const {t} = useTranslation()

  return (
    <div className="footer-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: "-20px"

    }}>
        <div className="entry-display"
        style={{marginLeft: "25px"}}
        >
            <span>{t("Display")}</span>
            <input
            type="text"
            value={currentEntries}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1
              setCurrentEntries(val)
            }}
            onClick={(e) => e.stopPropagation()}
            />
            <span>{t("Entry per page")}</span>
        </div>


        <div className="pagination-section" onClick={(e) => e.stopPropagation()}>
             <Pagination
            style={{
                marginRight: "47px"
            }}
            current={currentPage}
            pageSize={pageSize}
            total={total}
            showSizeChanger={false}
            onChange={onPageChange}
            />
        </div>
       
    </div>
  )
}
