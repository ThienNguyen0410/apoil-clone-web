import React from 'react'
import './index.scss'
import VouhcerImage from '../../../assets/voucher.png'
type VoucherCardProps = {
    title: string
    value: string
}

export default function VoucherCard({title, value} : VoucherCardProps) {
  return (
    <div className="card">
        <img src={VouhcerImage}></img>
        <div className="card-content">
            <label>{title}</label>
            <span><p>đ</p>{value}</span>
        </div>
    </div>
  )
}
