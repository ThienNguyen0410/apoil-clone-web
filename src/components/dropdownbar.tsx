// import { Dropdown } from 'antd'
// import './dropdown.scss'

// export type DropdownbarProps = {
//   onSwitchLanguage: (language: string) => void;
//   currentLanguage?: string;
// }



// export default function Dropdownbar({ onSwitchLanguage, currentLanguage }: DropdownbarProps) {
//   const items = [
//     {
//       key: 'vi',
//       label: <span className="dropdown-item">VIE</span>
//     },
//     {
//       key: 'en',
//       label: <span className="dropdown-item">ENG</span>
//     }
//   ]

//   return (
//     <Dropdown
//      className="language-dropdown"
//       menu={{
//         items,
//         onClick: (e) => onSwitchLanguage(e.key)
//       }}
//       trigger={['click']}
//     >
//       <span className="language-switcher">{currentLanguage}</span>
//     </Dropdown>
//   )
// }
