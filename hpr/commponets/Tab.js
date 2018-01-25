import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class Content extends Component {

  static propTypes={
    style:PropTypes.object,
    selectedStyle: PropTypes.object,
    title:PropTypes.string,
    titleColor: PropTypes.string,
    checked: PropTypes.bool,
  }

  static defaultProps={
    style:{},
    selectedStyle:{},
    title:'',
    titleColor:'',
    checked:false,
  }


  constructor(props) {
    super(props);
    this.state = {};
  }

  getStyle(){
    return {
      display: 'flex',
      display: '-webkit-flex',
      width: 32,
      justifyContent: 'center',
      WebkitJustifyContent:'center',
      backgroundColor:'#717c89',
      alignItems: 'center',
      WebkitAlignItems:'center',

      textAlign: 'center',
      marginTop:10,
      borderTopRightRadius:6,
      borderBottomRightRadius:6,
    }
  }
  render() {
    const defaultStyle = this.props.style;
    const selectedStyle = this. props.selectedStyle;
    const title = this.props.title;
    const titleColor = this.props.titleColor;
    const isChecked = this.props.checked;
    const style = isChecked ? Object.assign(this.getStyle(), selectedStyle || {}) : Object.assign(this.getStyle(), defaultStyle || {})
    return (
      <div style={style}>
        <span style={{color:isChecked ? '#ffffff': titleColor, fontSize:14, writingMode:'tb-rl', letterSpacing:'0.2em', textAlign:'center', marginTop:5, marginBottom:5}}>
          {title}
        </span>
      </div>
    )
  }
}
