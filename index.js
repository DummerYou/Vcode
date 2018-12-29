import React, { Component } from 'react'

import styles from './index.less'

class VCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.initState()
    }
  }
  
  componentDidMount(){
      this.props.onRef(this)
  }

  getRandom(max, min, num) {
    const asciiNum = ~~(Math.random()*(max-min+1)+min)
    if(!Boolean(num)){
      return asciiNum
    }
    const arr = []
    for(let i = 0; i < num; i++){
      arr.push(this.getRandom(max, min))
    }
    return arr
  }

  initState(){
    
     const data = this.getRandom(109,48,4)
     const rotate = this.getRandom(75,-75,4)
     const fz = this.getRandom(20,28,4)
     const color = [this.getRandom(100,255,3),this.getRandom(100,255,4),this.getRandom(100,255,3),this.getRandom(100,255,3)]
     this.codeimgs(data)
    return {data , rotate , fz , color}
  }

  codeimgs(data){
    
    const datas = data.map((v) => {
      return String.fromCharCode(v > 57 && v < 84 ? v + 39 : ( v <= 57 ? v : v + 13 ))
    })
    const { imgCode } = this.props;
    imgCode(datas);
  }

  onCode = () => {this.setState({...this.initState()})}


  render() {
    const {data, rotate, fz, color } = this.state
    return (
      <div className={styles.vcodewrap}>
        {data.map((v,i) => 
          <div 
            key={i}
            className={styles.itemStr}
            style={{
              transform:`rotate(${rotate[i]}deg)`,
              fontSize: `${fz[i]}px`,
              color: `rgb(${color[i].toString()})`
            }}
          >
            {String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ))}
          </div>  
        )}
        <div className={styles.mask} onClick={this.onCode} />
      </div>
    )
  }
}

export default VCode;