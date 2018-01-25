import React, {Component} from 'react';
import config from "../../../config";
import {getDateDiffFromDays} from "../../../utils/common";
import '../../../static/css/zgl/scss/hpr/hpr_cover_page.scss'

const cover_underlay = config.static_file_host + '/static/images/hpr/cover_underlay.png';
const cover_frame = config.static_file_host + '/static/images/hpr/cover_frame.png';
const cover_giraffe_icon = config.static_file_host + '/static/images/hpr/cover_ giraffe_icon.png';


/**
 * 身高预测封面
 */
export default class CoverPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const patient = this.props.data.patient;
    const reportData = this.props.data.reportData;

    return (
      <div className='root' style={Object.assign({}, this.props.style || {})}>
        <img className='background-img' src={`${cover_underlay}`}></img>
        <div className='content-root'>

          <div className='content-title'>
           <span style={{fontSize: 20, color: '#00000'}}>
           身高预测报告
          </span>
            <span style={{marginTop: 2, fontSize: 16, color: '#C9C9C9', fontFamily: 'Wawati SC'}}>
           HEIGHT PREDICTION REPORT
          </span>
          </div>

          <div className='content-info'>

            <img className='content-info-bg-img'  src={`${cover_frame}`}/>
            <span className='content-info-month'>0 1</span>
            <div className='content-info-patient'>
              <div className='content-info-patient-font'>
                <span style={{top: 5, fontSize: 14, color: '#8c653f'}}>姓名：{`${patient ? patient.fullname : '-'}`}</span>
                <span style={{
                  top: 5,
                  fontSize: 14,
                  color: '#8c653f'
                }}>性别：{`${patient ? (patient.gender === 1 ? '女' : '男') : '-'}`}</span>
                <span style={{
                  top: 5,
                  fontSize: 14,
                  color: '#8c653f'
                }}>年龄：{`${patient ? getDateDiffFromDays(patient.age) : '-'}`}</span>
              </div>
            </div>
            <img className='content-giraffe'  src={`${cover_giraffe_icon}`}/>

          </div>

          <div className='content-evaluate-time'>
            <span style={{
              top: 5,
              fontSize: 12,
              color: '#999999'
            }}>{`评测时间：${reportData && reportData.created_date ? reportData.created_date.split(' ')[0] : ''}`}</span>
          </div>

        </div>
      </div>

    )
  }

}
