import SearchBox from '../../common/SearchBox'
import SelectBox from '../../common/SelectBox'
import './index.scss'

type FlexBarProps = {
    searchTitle: string
    placeholder: string,
    search: string,
    setSearch: (s: string) => void

    //For status select
    selectedStatus: string,
    onChangeStatus: (s: string) => void
    statusOptions: any
    status_select_title : string

    //For group select
    selectedGroup: string,
    onChangeGroup: (s: string) => void
    groupOptions: any,
    group_select_title : string
}

export default function FlexBar(
{searchTitle, placeholder, search, setSearch,
 selectedStatus, onChangeStatus, statusOptions, status_select_title,
 selectedGroup, onChangeGroup, groupOptions, group_select_title
} : FlexBarProps) {
  return (
    <div className= "flexbar-section">
        <div className="search-section">
            <SearchBox
            title={searchTitle}
            placeholder={placeholder}
            search={search}
            setSearch={setSearch}
            />
        </div>

        <div className="select-block">
            <div>
                <SelectBox
                selectedStatus={selectedStatus}
                onChangeStatus={onChangeStatus}
                options={statusOptions}
                title={status_select_title}
                />
            </div>
                
            <div>
                 <SelectBox
                selectedStatus={selectedGroup}
                onChangeStatus={onChangeGroup}
                options={groupOptions}
                title={group_select_title}
                />
            </div>
               
        </div>
    </div>
  )
}
