import React from 'react';
import {connect} from 'dva/mobile';

import PageContainer from '../../../react-lib/page-container/index';
import '../../../static/css/zgl/scss/hpr/hpr_page_container.scss';

// import {Tabs, WhiteSpace} from 'antd-mobile';
// import 'antd-mobile/lib/Tabs/style/css';

import Tab from './commponets/Tab'
import HprTab from './commponets/HprTab'
import config from "../../../config";
import CoverPage from './CoverPage'
import HeightEvaluatPage from './HeightEvaluatPage'
import HeightForecast from './HeightForecast'
import HeightSpecialistTips from './HeightSpecialistTips'
const back_home_icon = config.static_file_host + '/static/images/hpr/back_home_page.png';

/**
 * 身高检测报告-container
 */
class HprPageContainer extends PageContainer {

  constructor(props) {
    super(props);
    this.state = {
      initialPage:-1,
      reportData:null,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'patient/query',
    })
    this.props.dispatch({
      type: 'hpr/get_prediction_report',
      payload: {callback:(result)=>{
          if(result && result.status === 1){//成功
          }else{
          }
        }},
    })

  }

  getTabs=()=> {
    const tabs=[];
    const tab0 = {title:'身高评测', titleColor:'#fff', component: Tab, style:{backgroundColor:'#717c89'}, selectedStyle:{backgroundColor:'#edb86f'}}
    const tab1 = {title:'预测分析', titleColor:'#e4e4e5', component: Tab, style:{backgroundColor:'#555b64'}, selectedStyle:{backgroundColor:'#edb86f'}}
    const tab2 = {title:'专家提示', titleColor:'#bec1c1', component: Tab, style:{backgroundColor:'#383a3f'}, selectedStyle:{backgroundColor:'#edb86f'}}
    tabs.push(tab0, tab1, tab2);
    return tabs;
  }


  getContents =()=>{
    const {patient, hpr} = this.props;
    const data = {
      patient:patient && Object.keys(patient).length > 0 ? patient : null,
      reportData:hpr.data && Object.keys(hpr.data).length > 0 ? hpr.data : null,
    };

    const contents=[];

    contents.push((<HeightSpecialistTips data={data} key={0}/>))
    contents.push((<HeightForecast data = {data} key={1}/>))
    contents.push((<HeightEvaluatPage data = {data} key={2}/>))
    contents.push((<CoverPage data = {data} key={3}/>))

    return contents;
  }

  onHandlerTabClick(index){
    this.setState({
      initialPage:index,
    })
  }

  renderBody() {
    return (
      <div className='page_container'>
        <div className='page_context'>
          <img className='back_home' src={back_home_icon} onClick={this.navigationContainer.popPageContainer.bind(this)}/>
          <HprTab
            style={{marginTop:20}}
            tabs={this.getTabs()}
            initialPage={this.state.initialPage}
            onTabClick={(index)=>{this.onHandlerTabClick(index)}}>
              {this.getContents() }
          </HprTab>
        </div>

      </div>
    );
  }

}

//连接对应的model(注意：需要将声明的model注册到models/index.js中)
const _HeightPredictionReport = connect(({hpr, patient}) => ({hpr,patient}), null, null, {withRef: true})(HprPageContainer);
window.pageContainers.HprPageContainer = _HeightPredictionReport;

export default _HeightPredictionReport;

