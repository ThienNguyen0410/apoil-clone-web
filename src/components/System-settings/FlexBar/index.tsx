import  SearchBox from '../../common/SearchBox'
import SelectBox from '../../common/SelectBox'
import './index.scss'

type FlexBarProps = {
    //SearchBox Props
    searchTitle: string,
    placeholder: string,
    search: string,
    setSearch: (s: string) => void,

    //Select Box
    selectedTitle: string,
    selectedStatus: string,
    onChangeStatus: (s: string) => void 
    options: any
}

export default function index({searchTitle, placeholder, search, setSearch, selectedStatus, onChangeStatus, options, selectedTitle}: FlexBarProps) {
  return (
    <div className="flex-bar-row">
        <div className="search-component">
            <SearchBox title={searchTitle} placeholder={placeholder} search={search} setSearch={setSearch}/>
         </div>

         <div className="select-component">
            <SelectBox selectedStatus={selectedStatus} onChangeStatus={onChangeStatus} options={options} title={selectedTitle}/>   
         </div>
    </div>
  )
}
