import React, {Component} from 'react';
import PropTypes from 'prop-types'
import stylecss from './turn.css'
import config from "../../../../config";

const FRONT_TURN__TAG = 0x10;
const BACK_TURN_TAG = 0x11;
const LAST_PAGE_TAG = 0x12;



const book_thickness = config.static_file_host + '/static/images/hpr/book_thickness.png';


export default class HprTab extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      title:PropTypes.string,
      titleColor:PropTypes.string,
      component: PropTypes.func,
      style:PropTypes.object,
      selectedStyle: PropTypes.object
    })),
    initialPage: PropTypes.number,
    onTabClick: PropTypes.func,
  }

  static defaultProps = {
    initialPage:-1,
  }

  constructor(props) {
    super(props);
    this.state = {
      initialPage: this.props.initialPage ? this.props.initialPage : -2,
    };
    // 记录当前页的下标
    this.index = -2; //向前翻页的初始下标值
    this.index2 = -2;//向后翻页的初始下标值
    this.target_tab_index = 0;
    this.previous_target_tab_index = 0;
    this.z_index = 100;
    this.pages_indexs = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if(nextProps.initialPage=== -1)return;
      this.turn_page_for_tab(nextProps.initialPage)
    }
  }

  next_page(index){
    this.setState({
      initialPage: index,
    })
  }
  /**
   * 点击Tab按钮，翻页到对应界面
   */
  turn_page_for_tab(index) {

    if(this.continuousClick())return;

    let pages = document.getElementsByTagName('li');
    this.target_tab_index = index;

    if (this.previous_target_tab_index === 0) {//首次点击tab, 直接向后翻页
      if (this.target_tab_index === 0) { // 点击了第一个tab，向后翻页，打开封面界面
        this.index = pages.length - 1;
        pages[this.index].style.transform = 'rotateY(-160deg)';
        pages[this.index].style.webkitTransform = 'rotateY(-160deg)';
        pages[this.index].style.webkitTransformOrigin = 'left';
        pages[this.index].style.transition = '0.5s';
        pages[this.index].style.zIndex = this.z_index++;

        this.setState({
          initialPage: (pages.length - 1) - (this.index)
        })
        this.index--;
        if (this.index === 0) {
          this.index = -3;
          this.index2 = -2;

        }
        this.previous_target_tab_index = this.target_tab_index;

        this.next_page(index)

        return;
      } else {//点击的非第一个tab，继续向后翻页

        //先打开封面
        this.index = (pages.length - 1)

        // setTimeout(()=>{}, 30)
        pages[this.index].style.transform = 'rotateY(-160deg)';
        pages[this.index].style.webkitTransform = 'rotateY(-160deg)';
        pages[this.index].style.transformOrigin = 'left';
        pages[this.index].style.webkitTransformOrigin = 'left';
        pages[this.index].style.transition = '0.5s';
        pages[this.index].style.zIndex = this.z_index++;

        // this.setState({
        //   initialPage: (pages.length - 1) - (this.index)
        // })

        this.index--;
        if (this.index === 0) {
          this.index = -3;
          this.index2 = -2;

        }

        //继续向后翻页到目标界面
        const num = Math.abs(this.previous_target_tab_index - this.target_tab_index);
        let tab_index = this.previous_target_tab_index;
        let auto_turn_page_indexs = [];
        for (let i = 0; i < num; i++) {
          auto_turn_page_indexs.push(tab_index)
          tab_index++;
        }
        //降序排列
        for (let index of auto_turn_page_indexs) {

          // pages[this.index].style.transform = 'rotateY(-160deg)';
          // pages[this.index].style.transformOrigin = 'left';
          // pages[this.index].style.transition = '0.5s';
          // pages[this.index].style.zIndex = this.z_index++;

          setTimeout(()=>{
            this.index = this.pages_indexs[index];
            pages[this.index].style.transform = 'rotateY(-160deg)';
            pages[this.index].style.webkitTransform = 'rotateY(-160deg)';
            pages[this.index].style.transformOrigin = 'left';
            pages[this.index].style.webkitTransformOrigin = 'left';
            pages[this.index].style.transition = '0.5s';
            pages[this.index].style.zIndex = this.z_index++;

            // this.setState({
            //   initialPage: (pages.length - 1) - (this.index)
            // })

            this.index--;
            if (this.index === 0) {
              this.index = -3;
              this.index2 = -2;
            }
          },(30 + (this.index * 5)))
        }

        this.previous_target_tab_index = this.target_tab_index;

        this.next_page(index)
        return;


      }
    } else {//处理tab之间相互切换,翻开对应的界面

      if (this.previous_target_tab_index < this.target_tab_index) { //向后翻页
        //计算向后翻页的页数
        let num = Math.abs(this.target_tab_index - this.previous_target_tab_index)
        const auto_back_page_indexs = []
        let tab_index = this.previous_target_tab_index;
        for (let i = 0; i < num; i++) {
          auto_back_page_indexs.push(tab_index)
          tab_index++;
        }
        for (let index of auto_back_page_indexs) {
          this.index = this.pages_indexs[index]
          pages[this.index].style.transform = 'rotateY(-160deg)';
          pages[this.index].style.webkitTransform = 'rotateY(-160deg)';
          pages[this.index].style.transformOrigin = 'left';
          pages[this.index].style.webkitTransformOrigin = 'left';
          pages[this.index].style.transition = '0.5s';
          pages[this.index].style.zIndex = this.z_index++;

          this.previous_target_tab_index = this.target_tab_index;

          // this.setState({
          //   initialPage: (pages.length - 1) - (this.index)
          // })

          this.index--;
          if (this.index === 0) {
            this.index = -3;
            this.index2 = -2;
            // return;
          }


        }

        this.next_page(index)

        return;

      } else {//向前翻页

        let num = Math.abs(this.previous_target_tab_index - this.target_tab_index)
        const auto_back_page_indexs = []
        let tab_index = this.previous_target_tab_index;
        for (let i = 0; i < num; i++) {
          tab_index--;
          auto_back_page_indexs.push(tab_index)

        }
        for (let index of auto_back_page_indexs) {
          this.index2 = this.pages_indexs[index]
          this.index = this.pages_indexs[index] //记录向后翻页的坐标，用来判断是否能够向后继续翻页
          pages[this.index2].style.transform = 'rotateY(0deg)';
          pages[this.index2].style.webkitTransform = 'rotateY(0deg)';
          pages[this.index2].style.transformOrigin = 'left';
          pages[this.index2].style.webkitTransformOrigin = 'left';
          pages[this.index2].style.transition = '0.5s';
          const zIndex = this.z_index++;
          pages[this.index2].style.zIndex = zIndex;

          // this.setState({
          //   initialPage: (pages.length - 1) - (this.index2)
          // })


          this.previous_target_tab_index = this.target_tab_index;

          this.index2++;
          if (this.index2 > pages.length - 1) { //回退到第一页
            this.index = -2;
            this.index2 = -2;
            // return;

          }

        }

        this.next_page(index)

        return;

      }

    }


  }

  /***
   *
   * 点击tab时，触发
   * */
  handlerClick(index) {
    this.props.onTabClick(index);
  }

  /**
   * 添加动画监听
   * @param element
   * @returns {*}
   */
  whichTransitionEvent(element) {
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }
    for (let transition in transitions) {
      const transition_name = element.style[transition]
      if (transition_name !== undefined) {
        return transitions[transition];
      }
    }
  }

  /**
   * 向后翻页的动画结束事件
   * @param element
   * @param transitionEvent
   */
  turnEventHandler(element, transitionEvent){
    element.style.zIndex = this.z_index++;
    element.removeEventListener(transitionEvent, this.turnEventHandler,false);
  }

  /**
   * //禁止鼠标350毫秒内连续点击
   */
  continuousClick(){
    const currentTime = new Date().getTime();
    const turnTime = currentTime - this.startTime;
    if(turnTime < 350){ // 小于350毫秒
      this.startTime = currentTime;
      return true;
    }else{
      this.startTime = currentTime;
      return false;
    }
  }
  /**
   *
   * 实现翻页
   * */
  turn() {

   if(this.continuousClick())return;

    let pages = document.getElementsByTagName('li');
    if (this.index === -3) {//最后一页
      this.returnTurn(pages)
      this.setState({
        initialPage: -2,
      })

    } else {
      this.index = this.index === -2 ? (pages.length - 1) : this.index;

      if (this.index > 0) {

        let element = pages[this.index];


        element.style.transform = 'rotateY(-160deg)';
        element.style.webkitTransform = 'rotateY(-160deg)';
        element.style.transformOrigin = 'left';
        element.style.webkitTransformOrigin = 'left';
        element.style.transition = '0.5s';
        // element.style.zIndex = this.z_index++;

        const  transitionEvent = this.whichTransitionEvent(element);
        // if (transitionEvent) {
        //   element.addEventListener(transitionEvent,this.turnEventHandler(element,transitionEvent),false);
        // }

        this.previous_target_tab_index = (pages.length - 1) - (this.index);

        setTimeout(()=>{
          this.turnEventHandler(element, transitionEvent)
        }, 200);

        this.setState({
          initialPage: (pages.length - 1) - (this.index)
        });
        this.index--;
        if (this.index === 0) {
          this.index = -3;
          this.index2 = -2;
        }

      }
    }
  }

  /**
   *
   * 监听动画结束时，进行翻页的处理逻辑
   * */
  eventHandler(pages, element, transitionEvent){
    this.index2++;
    if (this.index2 > pages.length - 1) { //回退到第一页
      this.index = -2;
      this.index2 = -2;
      this.previous_target_tab_index = 0;
      // console.log("：：：：：： 事件移除1");
      element.removeEventListener(transitionEvent,this.eventHandler, false)
      return;
    } else {
      // console.log("：：：：：： 事件移除2");
      element.removeEventListener(transitionEvent,this.eventHandler, false)
      this.returnTurn(pages)//继续往回翻页
    }

  }

  returnTurn(pages) {
    this.index2 = this.index2 === -2 ? 1 : this.index2;

    if (this.index2 === -1) return;

    let element = pages[this.index2]
    let transitionEvent = this.whichTransitionEvent(element);
    if (transitionEvent) {
      element.addEventListener(transitionEvent, this.eventHandler(pages, element, transitionEvent), false);
    }
    element.style.transform = 'rotateY(0deg)';
    element.style.webkitTransform = 'rotateY(0deg)';
    element.style.transition = '0.5s';
    element.style.zIndex = this.z_index--;


  }

  _complex_page_tab_indexs() {
    const tabs = this.props.tabs
    for (let i = tabs.length - 1; i >= 0; i--) {
      this.pages_indexs.push(i);
    }
  }

  getContentSize() {
    const clientWidth = document.body.clientWidth;
    const contentWidth = clientWidth * 0.9 - 32;
    const radius =  contentWidth / 543;
    let contentHeight = 777 * radius;
    contentHeight = contentHeight < 420 ? 420 : contentHeight;
    return {contentWidth, contentHeight}
  }

  componentDidMount() {
    this._complex_page_tab_indexs();
  }

  render() {
    const _this = this;
    const children = this.props.children;
    // const tabs = this.props.tabs;
    const style = this.props.style;
    // const initialPage =  this.props.initialPage;


    return (
      <div style={Object.assign(this.getFrameStyle(), style || {})}>

        {/*内容的显示*/}
        <div style={this.getContentStyles()}>

            <div id="book" className={stylecss.pre3d} onClick={() => {_this.turn()}}>
              <ul style={{width: '100%', flex: '1', WebkitFlex: '1', position: 'relative'}}>

                {/*后封面*/}
                {/*<li id='footer-cover' className={stylecss.front1}>*/}
                {/*<div style={{display: 'flex', flex:1, position: 'absolute', textAlign:'center', justifyContent:'center',alignItems:'center', width:300, height: 480, backgroundColor:'red'}}>书的后封面</div>*/}
                {/*</li>*/}

                {/*书页*/}
                {
                  children.map((child, index) => {
                      return (
                        <li className={stylecss.front2} key={index} style={this.getChildStyles()}>
                          {child}
                        </li>)
                    }
                  )
                }

                {/*前封面*/}
                {/*<li className={stylecss.front2} id='header-cover'>*/}
                {/*<div style={{*/}
                {/*display: 'flex',*/}
                {/*flex: 1,*/}
                {/*position: 'absolute',*/}
                {/*justifyContent: 'center',*/}
                {/*alignItems: 'center',*/}
                {/*backgroundColor: 'red'*/}
                {/*}}>书的前封面*/}
                {/*</div>*/}
                {/*</li>*/}

              </ul>

              <img src={book_thickness} style={{marginTop: '-1px',width: '100%'}}/>
            </div>


        </div>

        {/*选项卡显示*/}
        <div style={this.getTabsStyles()}>
          {this.props.tabs.map((item, index) => {
              return (
                <div style={{}} key={index} onClick={() => {
                  _this.handlerClick(index)
                }}>
                  <item.component
                    style={item.style}
                    title={item.title}
                    titleColor={item.titleColor}
                    selectedStyle={item.selectedStyle}
                    checked={index === this.state.initialPage}
                  >
                  </item.component>
                </div>
              )
            }
          )
          }
        </div>

      </div>

    )
  }

  getChildStyles() {
    return {
      display: 'flex',
      display: '-webkit-flex',
      position: 'absolute',
    }
  }

  getFrameStyle() {

    return {
      display: 'flex',
      display: '-webkit-flex',
      flex: '1',
      WebkitFlex: '1',
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      justifyContent: 'center',
      WebkitJustifyContent: 'center'
    };
  }

  getContentStyles() {
    const {contentWidth, contentHeight} = this.getContentSize();
    return {
      display: 'flex',
      display: '-webkit-flex',
      width: contentWidth,
      height: contentHeight
    };
  }

  getTabsStyles(){
    return {
      width: '32px',
      display: 'flex',
      display: '-webkit-flex',
      flexDirection: 'column',
      WebkitFlexDirection: 'column',
    };
  }

}
