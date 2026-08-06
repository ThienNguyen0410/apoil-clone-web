import SearcBox from '../../../../common/SearchBox'
import SelectBox from  '../../../../common/SelectBox'
import DatePicker from '../../../../common/DatePicker'
import {useTranslation} from 'react-i18next'
export default function FlexBar() {
  const {t} = useTranslation()
  return (
    <div className="flex-bar">
        <SearcBox
        title={t("Key word")}
        placeholder={t("Key word")}
        search={""}
        setSearch={() => {}}
        />
    </div>
  )
}
