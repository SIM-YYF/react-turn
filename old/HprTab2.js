import React, {Component} from 'react';
import PropTypes from 'prop-types'
import stylecss from './commponets/turn.css'

const FRONT_TURN__TAG = 0x10;
const BACK_TURN_TAG = 0x11;
const LAST_PAGE_TAG = 0x12;


export default class HprTab extends Component {


  static propTypes = {
    // tabs: PropTypes.arrayOf(PropTypes.shape({
    //   Tab: PropTypes.func
    // })),
    initialPage: PropTypes.number,
    // onTabClick: PropTypes.func,

  }

  static defaultProps = {}

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

    this.pages_indexs = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.turn_page_for_tab(nextProps.initialPage)
      this.setState({
        initialPage: nextProps.initialPage,
      })
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
      if (element.style[transition] !== undefined) {
        return transitions[transition];
      }
    }
  }

  /**
   * 点击Tab按钮，翻页到对应界面
   */
  turn_page_for_tab(index) {
    let pages = document.getElementsByTagName('li');
    this.target_tab_index = index;

    if(this.previous_target_tab_index === 0){//首次点击tab, 直接向后翻页
      if(this.target_tab_index === 0){ // 点击了第一个tab，打开封面界面
          this.index = pages.length -1;
          pages[this.index].style.transform = 'rotateY(-160deg)';
          pages[this.index].style.transformOrigin = 'left';
          pages[this.index].style.transition = '1.2s';
          this.setState({
            initialPage: (pages.length - 1) - (this.index)
          })
          this.index--;
          if (this.index === 0) {
            this.index = -3;
            this.index2 = -2;

          }
        this.previous_target_tab_index = this.target_tab_index;

        return;
      }else{//向后翻页
        //先翻页 - 封面
        this.index = (pages.length -1)
        pages[this.index].style.transform = 'rotateY(-160deg)';
        pages[this.index].style.transformOrigin = 'left';
        pages[this.index].style.transition = '1.2s';
        this.setState({
          initialPage: (pages.length - 1) - (this.index)
        })
        this.index--;
        if (this.index === 0) {
          this.index = -3;
          this.index2 = -2;

        }

        //设置第一页被选择
        // this.previous_target_tab_index = 0;

        //继续翻页到目标界面
        const num = Math.abs(this.previous_target_tab_index - this.target_tab_index);
        let tab_index = this.previous_target_tab_index;
        let auto_turn_page_indexs = [];
        // auto_turn_page_indexs.push(tab_index)

        for(let i=0; i < num; i++){
            auto_turn_page_indexs.push(tab_index)
            tab_index++;
        }

        console.log("::::::::: auto_turn_page_indexs = ", auto_turn_page_indexs);

        //降序排列
        for(let index of auto_turn_page_indexs){
          this.index = this.pages_indexs[index];
          console.log(":::::::::::::: this.index = ", this.index);
          pages[this.index].style.transform = 'rotateY(-160deg)';
          pages[this.index].style.transformOrigin = 'left';
          pages[this.index].style.transition = '1.2s';

          // this.setState({
          //   initialPage: (pages.length - 1) - (this.index)
          // })

          this.index--;
          if (this.index === 0) {
            this.index = -3;
            this.index2 = -2;

          }
        }

        this.previous_target_tab_index = this.target_tab_index;

        return;

      }
    }else{//处理tab之间相互切换,翻开对应的界面

      if(this.previous_target_tab_index < this.target_tab_index){ //向后翻页
        //计算向后翻页的页数
        let num = Math.abs(this.target_tab_index - this.previous_target_tab_index)
        const auto_back_page_indexs = []
        let tab_index = this.previous_target_tab_index;
        for(let i=0; i < num; i++){
          auto_back_page_indexs.push(tab_index)
          tab_index++;
        }
        for(let index of auto_back_page_indexs){
          this.index = this.pages_indexs[index]
          pages[this.index].style.transform = 'rotateY(-160deg)';
            pages[this.index].style.transformOrigin = 'left';
            pages[this.index].style.transition = '1.2s';
            this.setState({
              initialPage: (pages.length - 1) - (this.index)
            })
            this.index--;
            if (this.index === 0) {
              this.index = -3;
              this.index2 = -2;
            }
        }
        this.previous_target_tab_index = this.target_tab_index;
        return;

      }else{//向前翻页

        let num = Math.abs( this.previous_target_tab_index - this.target_tab_index)
        const auto_back_page_indexs = []
        let tab_index = this.previous_target_tab_index;
        for(let i=0; i < num; i++){
          tab_index--;
          auto_back_page_indexs.push(tab_index)

        }
        for(let index of auto_back_page_indexs){
          this.index = this.pages_indexs[index]
          pages[this.index].style.transform = 'rotateY(0deg)';
          // pages[this.index].style.transformOrigin = 'left';
          pages[this.index].style.transition = '1.2s';

          this.setState({
            initialPage: (pages.length - 1) - (this.index)
          })


          this.index--;
          if (this.index === 0) {
            this.index = -3;
            this.index2 = -2;
          }


          // this.index2++;
          // if (this.index2 > pages.length - 1) { //回退到第一页
          //   this.index = -2;
          //   this.index2 = -2;
          //   this.previous_target_tab_index = 0;
          //   return;
          //
          // }

        }
        this.previous_target_tab_index = this.target_tab_index;
        return;

      }

    }



  }

  back_page_for_tab(target_index){
    let pages = document.getElementsByTagName('li');
    this.index2 = target_index;

    this.returnTurn(pages)
  }

  /**
   *
   * 实现翻页
   * */
  turn() {
    let pages = document.getElementsByTagName('li');
    if (this.index === -3) {//最后一页
      this.returnTurn(pages)
      this.setState({
        initialPage: -2,
      })

    } else {
      this.index = this.index === -2 ? (pages.length - 1) : this.index;
      if (this.index > 0) {
        pages[this.index].style.transform = 'rotateY(-160deg)';
        pages[this.index].style.transformOrigin = 'left';
        pages[this.index].style.transition = '2s';
        this.setState({
          initialPage: (pages.length - 1) - (this.index)
        })
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
  eventHandler(pages, element, transitionEvent) {
    this.index2++;
    if (this.index2 > pages.length - 1) { //回退到第一页
      this.index = -2;
      this.index2 = -2;
      this.previous_target_tab_index = 0;
      return;
    } else {
      this.returnTurn(pages)//继续往回翻页
    }
    // element.removeEventListener(transitionEvent,this.eventHandler(pages,element,transitionEvent), false)
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
    element.style.transition = '0.8s';
  }

  _complex_page_tab_indexs(){
    const tabs = this.props.tabs
    for(let i=tabs.length - 1; i >=0; i--){
      this.pages_indexs.push(i);
    }
  }
  componentDidMount() {
    this._complex_page_tab_indexs();
  }

  render() {
    const _this = this;
    const children = this.props.children;
    const tabs = this.props.tabs;
    const style = this.props.style;
    // const initialPage =  this.props.initialPage;


    return (
      <div style={Object.assign(this.getFrameStyle(), style || {})}>

        {/*内容的显示*/}
        <div style={this.getContentStyles()}>

          <div id="book" className={stylecss.pre3d} onClick={() => {
            _this.turn()
          }}>

            <ul style={{width:'100%', height:'100%'}}>

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

          </div>

        </div>

        {/*选项卡显示*/}
        <div style={{display: 'flex', flexDirection: 'column', width: '50px', WebkitFlexDirection: 'column'}}>
          {this.props.tabs.map((item, index) => {
              return (
                <div key={index} onClick={() => {
                  _this.handlerClick(index)
                }}>
                  <item.component
                    style={item.style}
                    title={item.title}
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
      flex: 1,
      position: 'absolute',
    }
  }

  getFrameStyle() {

    return {display: 'flex', flexDirection: 'row', WebkitFlexDirection: 'row', margin: 10};
  }

  getContentStyles() {
    return {
      display: 'flex',
      flex: 1,
      backgroundColor: 'transparent',


    };
  }

}
