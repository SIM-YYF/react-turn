import React, {Component} from 'react';
import config from "../../../config";
import '../../../static/css/zgl/scss/hpr/height_specialist_tips.scss'
const specialist_tips = config.static_file_host + '/static/images/hpr/specialist_tips.png';
const book_box_shadow = config.static_file_host + '/static/images/hpr/book_box_shadow.png';

/**
 * 专家提示
 */
export default class HeightSpecialistTips extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const reportData = this.props.data.reportData;

    return (

      <div className='hst-root'>
        <img className='hst-root-background-img'  src={`${book_box_shadow}`} />
        <div className='hst-root-title' >

          <div className='hst-root-title-item'>
            <span style={{height: '20px', width: '4px', backgroundColor: '#000000'}}></span>
            <span style={{marginLeft: '5px', color: '#000000', fontSize: '20px', letterSpacing: '0.2em'}}>专家提示</span>
          </div>

        </div>


        {/*因素占比*/}

        <div className='hst-composite-analysis'>

          <img style={{width: '90%', height: 'auto', maxWidth: '100%', maxHeight: '100%'}} src={`${specialist_tips}`}/>


          <span
            style={{position: 'absolute', width: '90%', height: '52%', overflow: 'auto',  padding: "5%", top: '37%'}}>
            {`${reportData?reportData.expert_advice:'-'}`}
          </span>

        </div>

        <div className='hst-height-core'>


          <span style={{fontSize: '16px', color: '#ffffff'}}>获取环境改善方案</span>


        </div>


      </div>
    )
  }


}
