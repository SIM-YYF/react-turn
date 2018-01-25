import React, {Component} from 'react';
import config from "../../../config";
import '../../../static/css/zgl/scss/hpr/height_evaluat_page.scss'


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


  render() {

    const reportData = this.props.data.reportData;

    return (

      <div className='root'>

        <img style={{width:'5%', height:'100%' , position:'absolute'}}  src={`${book_box_shadow}`} />

        <div className='root-title-b'>

          <div style={{
            display: 'flex',
            display: '-webkit-flex',
            flexDirection: 'row',
            WebkitFlexDirection: 'row',
            alignItems: 'center',
          }}>
            <span style={{height: '20px', width: '4px', backgroundColor: '#000000'}}></span>
            <span style={{marginLeft: '5px', color: '#000000', fontSize: '18px', letterSpacing: '0.2em'}}>身高评测</span>
          </div>

          <div style={{
            display: 'flex',
            display: '-webkit-flex',
            flexDirection: 'column',
            WebkitFlexDirection: 'column',
            alignItems: 'center',

          }}>
            <div style={{
              display: 'flex',
              display: '-webkit-flex', alignItems: 'center',
            }}>
              <span style={{height: '10px', width: '10px', borderRadius: '5px', backgroundColor: '#3b6cf7'}}></span>
              <span style={{marginLeft: '4px', color: '#999999', fontSize: '12px', letterSpacing: '0.2em'}}>正常范围</span>
            </div>
            <div style={{
              display: 'flex',
              display: '-webkit-flex', alignItems: 'center',
            }}>
              <span style={{height: '10px', width: '10px', borderRadius: '5px', backgroundColor: '#e75e5e'}}></span>
              <span style={{marginLeft: '4px', color: '#999999', fontSize: '12px', letterSpacing: '0.2em'}}>超出范围</span>
            </div>
          </div>
        </div>


        <div style={this._height_base_style()}>

          <div style={{
            height: '45px', width: '100%', display: 'flex',
            display: '-webkit-flex', alignItems: 'center',
          }}>
            <img style={{marginLeft: '10px',}} src={`${height_icon}`}></img>
            <span style={{marginLeft: '10px', fontSize: '16px', color: '#919191'}}>当前身高:</span>
            <span style={{color: '#3b6cf7', fontSize: '16px',}}>&nbsp;&nbsp;&nbsp;{`${reportData? reportData.curr_height : '-'}`}&nbsp;cm</span>
          </div>

          <div style={{width: '100%', height: '0.8px', width: '100%', backgroundColor: '#dcdcdc'}}></div>

          <div style={{
            height: '45px', width: '100%', display: 'flex',
            display: '-webkit-flex', alignItems: 'center',
          }}>
            <img style={{marginLeft: '10px',}} src={`${weight_icon}`}></img>
            <span style={{marginLeft: '10px', fontSize: '16px', color: '#919191'}}>当前体重: </span>
            <span style={{color: '#e75e5e', fontSize: '16px',}}>&nbsp;&nbsp;&nbsp;{`${reportData? reportData.curr_weight : '-'}`}&nbsp;kg</span>
          </div>

        </div>


        {/*身高得分*/}
        <div style={this._height_score_style()}>

          <div style={{
            display: 'flex',
            display: '-webkit-flex',
            flexDirection: 'column',
            WebkitFlexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            width: '100px',
            border: '2px #d7e1fb solid',
            backgroundColor: 'transparent',
            borderRadius: '50px'
          }}>
            <span>身高得分</span>
            <span style={{fontSize:'18px', color:'#3b6cf7'}}>{`${reportData? reportData.evaluate_height_score : '0'}`}</span>
            <span style={{fontSize:'18px', color:'#3b6cf7'}}>一般</span>
          </div>

          <div style={{
            display: 'flex',
            display: '-webkit-flex',
            flexDirection: 'column',
            WebkitFlexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            width: '100px',
            border: '2px #fdd6d2 solid',
            backgroundColor: 'transparent',
            borderRadius: '50px'
          }}>
            <span>BMI指数</span>
            <span style={{fontSize:'18px', color:'#e75e5e'}}>{`${reportData? reportData.evaluate_BMI_score : '0'}`}</span>
            <span style={{fontSize:'18px', color:'#e75e5e'}}>偏瘦</span>
          </div>


        </div>



        {/*综合分析*/}

        <div style={this._composite_analysis()}>

          <img style={this._img_small_person_style()} src={`${height_small_person}`} />

          <div style={{
            display: 'flex',
            display: '-webkit-flex',
            flexDirection: 'column',
            WebkitFlexDirection: 'column',
            alignItems: 'flex-start',
            width:'30%'
          }}>
              <span style={{fontSize:'16px'}}>综合分析:</span>
            <div style={{
              display: 'flex',
              display: '-webkit-flex',
              flexDirection: 'row',
              WebkitFlexDirection: 'row',
              alignItems: 'flex-start',

            }}>
              <span style={{fontSize:'20px', color:'#3b6cf7', fontWeight:'bold'}}>稍矮</span>
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
  _composite_analysis(){

    return {
      ...this._global_style(),
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0% 6%',
      height: '35%',
    }

  }
  _height_score_style() {
    return {
      ...this._global_style(),
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '2%  10%',
      backgroundColor: 'transparent',
      height: '100px',
    }
  }

  _height_base_style() {
    return {
      ...this._global_style(),
      flexDirection: 'column',
      WebkitFlexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: '2% 6%',
      padding: '5px',
      backgroundColor: '#f4f4f4',
      height: '100px',
    }
  }

  _title_style() {

    return {
      ...this._global_style(),
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      justifyContent: 'space-between',
      margin: '2% 6%'
    }
  }

  _global_style() {
    return {
      display: 'flex',
      display: '-webkit-flex',
      flexDirection: 'column',
      WebkitFlexDirection: 'column',

    }
  }

  _root_style() {
    return {
      ...this._global_style(),
      backgroundColor: '#f8f8f8',
      width: '100%',
      height: '100%',
      position:'relative',
      boxShadow: '0  -2px 5px -3px #6f9eee, 2px  0 5px -3px #6f9eee', //top 和 right 的阴影效果
      WebkitBoxShow: '0  -2px 5px -3px #6f9eee, 2px  0 5px -3px #6f9eee',
    }

  }

}
