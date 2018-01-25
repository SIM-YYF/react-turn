import React, {Component} from 'react';
import config from "../../../config";
import '../../../static/css/zgl/scss/hpr/height_forecast.scss'

const element_proportion_icon = config.static_file_host + '/static/images/hpr/element_proportion_icon.png';
const book_box_shadow = config.static_file_host + '/static/images/hpr/book_box_shadow.png';

/**
 * 身高预测分析
 */
export default class HeightForecast extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const reportData = this.props.data.reportData;
    return (

      <div className='hr-root'>
        <img className='hr-root-background-img' src={`${book_box_shadow}`}/>

        <div className='hr-root-title'>

          <div className='hr-root-title-item'>
            <span style={{height: '20px', width: '4px', backgroundColor: '#000000'}}></span>
            <span style={{marginLeft: '5px', color: '#000000', fontSize: '18px', letterSpacing: '0.2em'}}>预测分析</span>
          </div>

        </div>


        <div className='hr-height-base'>

          <div className='hr-inherit-height'>
            <span style={{marginLeft: '10px', fontSize: '16px'}}>预测成人后身高:</span>
            <span style={{
              color: '#3b6cf7',
              fontSize: '16px',
            }}>&nbsp;&nbsp;&nbsp;{`${reportData ? reportData.expect_height : '-'}`}&nbsp;cm</span>
          </div>


        </div>


        <div className='hr-height-base'>

          <div className='hr-inherit-height'>
            <span style={{marginLeft: '10px', fontSize: '16px'}}>遗传靶身高:</span>
            <span style={{
              color: '#3b6cf7',
              fontSize: '16px',
            }}>&nbsp;&nbsp;&nbsp;{`${reportData ? reportData.inherit_height : '-'}`}&nbsp;cm</span>
          </div>
        </div>

        {/*因素占比*/}

        <div className='hr-composite-analysis'>

          <img style={{width: '60%', height: 'auto', maxWidth: '100%', maxHeight: '100%'}}
               src={`${element_proportion_icon}`}/>

          <span style={{position: 'absolute', left: '65%', top: '26%'}}>环境因素占比</span>
          <span style={{position: 'absolute', left: '65%', top: '54%'}}>遗传因素占比</span>


        </div>

        <div className='hr-height-core'>


          <span style={{fontSize: '16px', color: '#666666'}}>儿童身高影响因素</span>


        </div>


      </div>
    )
  }


}
