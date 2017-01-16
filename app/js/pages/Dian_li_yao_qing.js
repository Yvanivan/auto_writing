import React from 'react';
import {
  Container,
  Input,
  ButtonToolbar,
  Tabs,
  DateTimeInput,
  Button,
  ModalTrigger,
} from 'amazeui-react';

import {Editor, EditorState} from 'draft-js';

import { withRouter } from 'react-router'
import { myConfig } from '../components/config.js';
import {post} from '../components/Call'
import View from '../components/View'

var Dian_li_yao_qing  =  withRouter(React.createClass( {
    getInitialState(){
        return {
                parms:{
                p1:'北京信息科技大学',
                p2:'2016-11-15 09:00',
                p3:'报告厅',
                p4:'计算机学院',
                type:'Ceremony',
                },
                form_data:{},
                showModal: false,
            }
  },
   close() {
    this.setState({showModal: false,form_data:{}});
  },
  open() {
    this.setState({showModal: true});
  },
  is_good(str){
      if(str.length>0){
          return 'success'
      }
      return 'error'
  },
    validation_all(){
        var a = this.state.parms
        for (let k in a ){
            if(this.is_good(a[k])=='error'){
                return false
            }
        }
        return true
    },
    handle_submit(e){
        e.preventDefault();
        if (this.validation_all()){
            var form1 = new FormData()
            for(let k in this.state.parms){
                form1.append(k,this.state.parms[k])
            }
            this.setState({form_data:form1},()=>{
                this.open()
            })
        }else{
            this.forceUpdate()
        }
    },
    render() {
        
        return (
                <Container>
                <form className="am-form" id = 'myform'>
                <Input type="text" label="学校名称"  placeholder={this.state.parms['p1']} onChange = {(e)=>{this.state.parms['p1']=e.target.value}} validation = {this.is_good(this.state.parms['p1'])} />
                <Input type="text" label="毕业典礼时间"  placeholder={this.state.parms['p2']} onChange = {(e)=>{this.state.parms['p2']=e.target.value}} validation = {this.is_good(this.state.parms['p2'])} />
                <Input type="text" label="毕业典礼地点"  placeholder={this.state.parms['p3']} onChange = {(e)=>{this.state.parms['p3']=e.target.value}} validation = {this.is_good(this.state.parms['p3'])} />
                <Input type="text" label="落款"  placeholder={this.state.parms['p4']} onChange = {(e)=>{this.state.parms['p4']=e.target.value}} validation = {this.is_good(this.state.parms['p4'])} />
                <ButtonToolbar>
                    <Input  type = "submit" value="提交" standalone onClick={this.handle_submit} />
                    <Input type="reset" value="重置" amStyle="danger" standalone />
                </ButtonToolbar>
                </form>
                
                <ModalTrigger
                modal={<View title = {this.props.title} api_path='sc' form_data = {this.state.form_data} start_run = {this.state.showModal}/>}
                show={this.state.showModal}
                onClose={this.close}
                />
                </Container>
        )
    }
})
)
export default Dian_li_yao_qing