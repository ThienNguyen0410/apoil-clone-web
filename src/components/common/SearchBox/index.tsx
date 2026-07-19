import { useTranslation } from "react-i18next"
import {Input} from 'antd'
import SearchIcon from '../../icons/Searchicon'
import './index.scss'
import Searchicon from "../../icons/Searchicon"

type SearchBoxProps = {
   title: string,
   placeholder: string
   search: string,
   setSearch: (s: string) => void
}


export default function SearchBox({title, placeholder, search, setSearch} : SearchBoxProps) {
  const {t} = useTranslation()
  return (
     <div className="search-box">
        <h1>{t(title)}</h1>
        <div className="search-section">
         <Input
         className="search-box-input"
         placeholder= {t(placeholder)}
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         onClick={(e) => e.stopPropagation()}
        />
         <div className="search-icon">
            <Searchicon/>
         </div>
        </div>
     </div>
  )
}
