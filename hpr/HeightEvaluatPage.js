import React, {Component} from 'react';
import config from "../../../config";
import '../../../static/css/zgl/scss/hpr/height_evaluat_page.scss'
import {HeightEvaluate, BMIEvaluate} from "./height_evaluating_config";

const height_icon = config.static_file_host + '/static/images/hpr/height_icon.png';
const weight_icon = config.static_file_host + '/static/images/hpr/weight_icon.png';
const height_small_person = config.static_file_host + '/static/images/hpr/height_small_person.png';
const height_smile_icon = config.static_file_host + '/static/images/hpr/height_smile_icon.png';
const book_box_shadow = config.static_file_host + '/static/images/hpr/book_box_shadow.png';

/**
 * 身高评测
 */
export default class HeightEvaluatPage extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   * 根据标识，获取身高和BMI类型和评分
   * */
  get_height_BIM_evaluating(){
    const reportData = this.props.data.reportData;
    let height_evaluate;
    let bmi_evaluate;
    if(reportData && reportData.evaluate_height_score){
      height_evaluate = HeightEvaluate[reportData.evaluate_height_score+'']
    }
    if(reportData && reportData.evaluate_BMI_score){
      bmi_evaluate = BMIEvaluate[reportData.evaluate_BMI_score+'']
    }
    return {height_evaluate, bmi_evaluate}
  }


  render() {

    const reportData = this.props.data.reportData;
    const {height_evaluate, bmi_evaluate}= this.get_height_BIM_evaluating();
    return (

      <div className='hep-root'>

        <img className='hep-root-background-img' src={`${book_box_shadow}`} />

        <div className='hep-root-title'>

          <div className='hep-title-left' >
            <span style={{height: '20px', width: '4px', backgroundColor: '#000000'}}></span>
            <span style={{marginLeft: '5px', color: '#000000', fontSize: '18px', letterSpacing: '0.2em'}}>身高评测</span>
          </div>

          <div className='hep-title-right' >
            <div className='hep-title-right-content'>
              <span style={{height: '10px', width: '10px', borderRadius: '5px', backgroundColor: '#3b6cf7'}}></span>
              <span style={{marginLeft: '4px', color: '#999999', fontSize: '12px', letterSpacing: '0.2em'}}>正常范围</span>
            </div>
            <div className='hep-title-right-content'>
              <span style={{height: '10px', width: '10px', borderRadius: '5px', backgroundColor: '#e75e5e'}}></span>
              <span style={{marginLeft: '4px', color: '#999999', fontSize: '12px', letterSpacing: '0.2em'}}>超出范围</span>
            </div>
          </div>
        </div>


        <div className='hep-height-base' >

          <div className='hep-height-base-info'>
            <img style={{marginLeft: '10px',}} src={`${height_icon}`}></img>
            <span style={{marginLeft: '10px', fontSize: '16px', color: '#919191'}}>当前身高:</span>
            <span style={{color: '#3b6cf7', fontSize: '16px',}}>&nbsp;&nbsp;&nbsp;{`${reportData? reportData.curr_height : '-'}`}&nbsp;cm</span>
          </div>

          <div style={{width: '100%', height: '0.8px', width: '100%', backgroundColor: '#dcdcdc'}}></div>

          <div className='hep-height-base-info' >
            <img style={{marginLeft: '10px',}} src={`${weight_icon}`}></img>
            <span style={{marginLeft: '10px', fontSize: '16px', color: '#919191'}}>当前体重: </span>
            <span style={{color: '#e75e5e', fontSize: '16px',}}>&nbsp;&nbsp;&nbsp;{`${reportData? reportData.curr_weight : '-'}`}&nbsp;kg</span>
          </div>

        </div>


        {/*身高得分*/}
        <div className='hep-height-core' >

          <div className='hep-height-core-content-left'>
            <span>身高得分</span>
            <span style={{fontSize:'18px', color:height_evaluate?height_evaluate.color:'#999999'}}>{`${reportData? reportData.curr_p_value : '-'}`}</span>
            <span style={{fontSize:'18px', color:height_evaluate?height_evaluate.color:'#999999'}}>{`${height_evaluate?height_evaluate.scoreEvaluate:'-'}`}</span>
          </div>

          <div className='hep-height-core-content-right'>
            <span>BMI指数</span>
            <span style={{fontSize:'18px', color:bmi_evaluate?bmi_evaluate.color:'#999999'}}>{`${reportData? reportData.curr_BMI : '-'}`}</span>
            <span style={{fontSize:'18px', color:bmi_evaluate?bmi_evaluate.color:'#999999'}}>{`${bmi_evaluate?bmi_evaluate.type:'-'}`}</span>
          </div>


        </div>



        {/*综合分析*/}

        <div className='hep-composite-analysis'>

          <img style={this._img_small_person_style()} src={`${height_small_person}`} />

          <div className='hep-composite-analysis-content'>
              <span style={{fontSize:'16px'}}>综合分析:</span>
            <div className='hep-composite-analysis-result'>
              <span style={{fontSize:'20px', color:height_evaluate?height_evaluate.color: '#999999', fontWeight:'bold'}}>{`${height_evaluate?height_evaluate.type:'-'}`}</span>
              <img style={{width:'auto', height:'auto', maxWidth:'100%', maxHeight:'100%', marginLeft: '5px'}} src={`${height_smile_icon}`} />
            </div>
          </div>

        </div>



      </div>
    )
  }

  _img_small_person_style(){
    const {contentWidth, contentHeight} = this._compulte_small_person_size();
    return {
      width:contentWidth,
      height:contentHeight
    }
  }

  _compulte_small_person_size(){

      const clientWidth = document.body.clientWidth
      const contentWidth = clientWidth * 0.38
      const raduis = contentWidth / 206;
      const contentHeight = 183 * raduis;
      return {contentWidth, contentHeight}

  }




}
