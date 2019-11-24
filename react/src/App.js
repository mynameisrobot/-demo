import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu, Icon } from 'antd';
import { Table,Divider,  DatePicker,Input, InputNumber,Button, Popconfirm, Form ,Layout} from 'antd';
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import reqwest from 'reqwest';
import moment from 'moment'

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

// const data = [];
const { RangePicker } = DatePicker;
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         age: 32,
//         address: `London Park no. ${i}`,
//     });
// }

class  Prjob extends Component{
    constructor(props) {
        super(props);
        this.state={
            dataSource:'',
            count: '',
            flag:false,
        };


    }
    componentDidMount() {
        console.log('调用')
        this.fetch();
    }

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
            url: 'http://127.0.0.1:8080/api/gettask/',
            method: 'get',
            // data: {
            //     results: 10,
            //     ...params,
            // },
            type: 'json',
        }).then(data => {
            // const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            // pagination.total = 200;
            console.log(data)
            var data1=[]
            var i
            for ( i in data) {
                console.log('i:',data[i])
              let  l={key:data[i].id}
               let p= {
                    ...data[i],
                    ...l
                }
                console.log("p:",p)
                data1.push(p)

            }

            this.setState({
                // loading: false,

                dataSource: data1,
                count: data.length,

            })
            console.log("data:",this.state.data)
        });
    };

    edit(key) {
        this.setState({ editingKey: key });
    }


    handleDelete = key => {
        console.log('key',key)
        fetch = (params = {}) => {
            console.log('params:', params);
            this.setState({ loading: true });
            reqwest({
                url: 'http://127.0.0.1:8080/api/delete/',
                method: 'post',
                data: {
                //     row,
                    id:key
                //     //     results: 10,
                //     //     ...params,
                },
                type: 'json',
            }).then(data => {
                // const pagination = { ...this.state.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                // pagination.total = 200;
                console.log("更新成功",data[0].code)
                if (data[0].code==200) {
                    const dataSource = [...this.state.dataSource];
                    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });


                }


                console.log("data:",this.state.data)
            });
        };
        fetch()

    };
    handleupdata=newdata=>{
        console.log('调用充值')
        this.setState({ dataSource: newdata, editingKey: '' });
    };

    handleAdd = () => {
        fetch = (params = {}) => {
            console.log('params:', params);
            this.setState({ loading: true });
            reqwest({
                url: 'http://127.0.0.1:8080/api/add/',
                method: 'post',
                data: {


                    //     results: 10,
                    //     ...params,
                },
                type: 'json',
            }).then(data => {
                // const pagination = { ...this.state.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                // pagination.total = 200;
                console.log("更新成功",data[0].code)
                if (data[0].code==200){


                }





                console.log("data:",this.state.data)
            });
        };
        fetch()
        console.log('添加')
        const { count, dataSource } = this.state;
        const newData = {

            title: ``,
            startime: '',
            endtime: ``,
            expire_date:'',
            isdone:'',
            priority:'',
            content:''



        };
        this.edit(newData.key)
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    changecom=()=>{
        console.log('更换形态')
    this.setState({
        flag:true
                  });

};
    beall=()=>{
        console.log('更换形态')

        this.setState({
            flag:false
        });
        this.fetch()

    };

    render() {
            return (
                <Layout>
                    <Sider><Sider1 onadd={()=>this.changecom()} onall={()=>this.beall()}/></Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>

                            {/*<Button onClick={this.handleAdd}>添加</Button> */}
                            </Header>
                        <Content>{this.state.flag?<WrappedHorizontalLoginForm/>:<EditableFormTable   updata={(newdata)=>this.handleupdata(newdata)}count={this.state.count}data={this.state.dataSource}ondelte={(key)=>this.handleDelete(key) }/>}</Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            )

    }

}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    getInput = () => {
         if(this.props.inputType === 'moment') {
             console.log("type:",typeof (this.props.inputType),this.props.inputType)
            return <DatePicker showTime placeholder="Select Time" onChange={this.props.onChange} onOk={this.props.onOk} />;
        }
        else if (this.props.inputType === 'number') {
             console.log("type:",typeof (this.props.inputType),this.props.inputType)
            return <InputNumber />;
            // return <DatePicker showTime placeholder="Select Time" onChange={this.props.onChange} onOk={this.props.onOk} />;
        }
        console.log("type:",typeof (this.props.inputType),this.props.inputType)
        return <Input />;
        // return <DatePicker showTime placeholder="Select Time" onChange={()=>this.props.onChange} onOk={()=>this.props.onOk}/>;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {




constructor(props) {
        super(props);
        this.state = { editingKey: '' };
        this.columns = [
            {
                title: '任务标题',
                dataIndex: 'title',
                width: '20%',
                editable: true,
            },
            {
                title: '任务内容',
                dataIndex: 'content',
                width: '30%',
                editable: true,
            },
            {
                title: '开始时间',
                dataIndex: 'startime',
                width: '10%',
                editable: true,
                sorter: (a, b) => new Date(Date.parse(a.startime)) - new Date(Date.parse(b.startime)),
                render:(text,record)=>{
                    return(moment(record.startime).format('YYYY-MM-DD HH:mm:ss'))
                }
                // render:()=>{
                //     return(
                //     <div>
                //         <DatePicker showTime placeholder="Select Time" onChange={this.onChange} onOk={this.onOk} />
                //         <br />
                //         {/*<RangePicker*/}
                //             {/*showTime={{ format: 'HH:mm' }}*/}
                //             {/*format="YYYY-MM-DD HH:mm"*/}
                //             {/*placeholder={['Start Time', 'End Time']}*/}
                //             {/*onChange={this.onChange}*/}
                //             {/*onOk={this.onOk}*/}
                //         {/*/>*/}
                //     </div>)
                // }
            },
            {
                title: '结束时间',
                dataIndex: 'endtime',
                width: '10%',
                editable: true,
                sorter: (a, b) =>new Date(Date.parse(a.endtime))-new Date(Date.parse( b.endtime)),
                render:(text,record)=>{
                    return(moment(record.endtime).format('YYYY-MM-DD HH:mm:ss'))
                }
            },
            {
                title: '到期时间',
                dataIndex: 'expire_date',
                width: '10%',
                editable: true,
                sorter: (a, b) => new Date(Date.parse(a.expire_date)) -new Date(Date.parse(b.expire_date)),
                render:(text,record)=>{
                    return(moment(record.expire_date).format('YYYY-MM-DD HH:mm:ss'))
                }
            },
            {
                title: '是否完成',
                dataIndex: 'isdone',
                width: '10%',
                editable: true,
                sorter: (a, b) => String(a.isdone).length - String(b.isdone).length,
                render:(text,record)=>{
                    return(String(record.isdone))
                }
            },
            {
                title: '优先级',
                dataIndex: 'priority',
                width: '5%',
                editable: true,
                sorter: (a, b) => parseInt(a.priority) - parseInt(b.priority),
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {

                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (

                        <span>
              <EditableContext.Consumer>
                {form => (
                    <a
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                    >
                        Save
                    </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>

                    ) : (
                        <span>
                        <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                            编辑
                        </a>
                            <Divider type="vertical" />
                            <a disabled={editingKey !== ''} onClick={()=>this.props.ondelte(record.key)}>
                            删除
                        </a>
                        </span>
                    );

                },

            },
        ];

    }



    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

     onOk(value) {
        console.log('onOk: ', value);
    }


    save(form, key) {
        form.validateFields((error, row) => {
            console.log("newdata",this.props.data,form,key,row)
            if (error) {
                return;
            }
            const newData = [...this.props.data];

            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                console.log("newdata",newData,item,form,key)


                row.id=key
                console.log("roe.id:",row,key)
                fetch = (params = {}) => {
                    console.log('params:', params);
                    this.setState({ loading: true });
                    reqwest({
                        url: 'http://127.0.0.1:8080/api/updata/',
                        method: 'post',
                        // body: {
                        //     ...row,
                        //     id:key
                        // //     results: 10,
                        // //     ...params,
                        // },
                        data: {
                            ...row,
                            id:key
                            //     results: 10,
                            //     ...params,
                        },
                        type: 'json',
                    }).then(data => {
                        // const pagination = { ...this.state.pagination };
                        // Read total count from server
                        // pagination.total = data.totalCount;
                        // pagination.total = 200;
                        console.log("更新成功",data[0].code,data)
                        if (data[0].code==200){
                            this.props.updata(newData);
                            // this.props.setState(newData)
                            this.setState({ editingKey: '' });
                        }




                        console.log("data:",this.state.data)
                    });
                };
                fetch()
                delete row.id

            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    components={components}
                    bordered
                    dataSource={this.props.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);



class Sider1 extends React.Component {
    handleClick = e => {
        console.log('click ', e);
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ height: '100%', borderRight: 0  }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item key="5" onClick={()=>this.props.onadd()}>添加</Menu.Item>
                <Menu.Item key="6" onClick={()=>this.props.onall()}>所有任务</Menu.Item>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
              <Icon type="setting" />
              <span>other</span>
            </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let values2={}
                values2.startime=moment(values.startime).format('YYYY-MM-DD HH:mm:ss')
                values2.endtime=moment(values.endime).format('YYYY-MM-DD HH:mm:ss')
                values2.expire_date=moment(values.expire_date).format('YYYY-MM-DD HH:mm:ss')
                let values3={
                    ...values,
                    ...values2
                }


                console.log('newtime:',values3)
                fetch = (params = {}) => {
                    console.log('params:', params);
                    this.setState({ loading: true });
                    reqwest({
                        url: 'http://127.0.0.1:8080/api/add/',
                        method: 'post',
                        data: {
                                ...values3

                            //     results: 10,
                            //     ...params,
                        },
                        type: 'json',
                    }).then(data => {
                        // const pagination = { ...this.state.pagination };
                        // Read total count from server
                        // pagination.total = data.totalCount;
                        // pagination.total = 200;
                        console.log("更新成功",data[0].code,data)
                        if (data[0].code==200){


                        }





                        console.log("data:",this.state.data)
                    });
                };
                fetch()
                console.log('添加')
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const {TextArea,}=Input
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} style={{width:256,position:'center'}}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="标题"
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <TextArea rows={4} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  type="text"
                                  placeholder="内容"/>


                        // <Input
                        //     prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        //     type="text"
                        //     placeholder="内容"
                        // />,
                    )}
                </Form.Item>
                {/*<Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>*/}
                    {/*{getFieldDecorator('startime', {*/}
                        {/*rules: [{ required: true, message: 'Please input your Password!' }],*/}
                    {/*})(*/}
                        {/*<Input*/}
                            {/*prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                            {/*type="text"*/}
                            {/*placeholder="开始时间"*/}
                        {/*/>,*/}
                    {/*)}*/}
                {/*</Form.Item>*/}


                <Form.Item >
                    {getFieldDecorator('startime', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="开始时间"/>,
                    )}
                </Form.Item>
                <Form.Item >
                    {getFieldDecorator('endtime', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间"/>,
                    )}
                </Form.Item>




                {/*<Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>*/}
                    {/*{getFieldDecorator('endtime', {*/}
                        {/*rules: [{ required: true, message: 'Please input your Password!' }],*/}
                    {/*})(*/}
                        {/*<Input*/}
                            {/*prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                            {/*type="text"*/}
                            {/*placeholder="结束时间"*/}
                        {/*/>,*/}
                    {/*)}*/}
                {/*</Form.Item>*/}
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('isdone', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            placeholder="是否完成"
                        />,
                    )}
                </Form.Item>

                <Form.Item >
                    {getFieldDecorator('expire_date', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="过期时间"/>,
                    )}
                </Form.Item>


                {/*<Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>*/}
                    {/*{getFieldDecorator('expire_date', {*/}
                        {/*rules: [{ required: true, message: 'Please input your Password!' }],*/}
                    {/*})(*/}
                        {/*<Input*/}
                            {/*prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                            {/*type="text"*/}
                            {/*placeholder="过期时间"*/}
                        {/*/>,*/}
                    {/*)}*/}
                {/*</Form.Item>*/}
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('priority', {
                        rules: [{ required: true, message: 'Please input your Password!', type:'number',max:10,min:1}],
                    })(

                        <InputNumber min={1} max={10}  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                     type='number'
                                     placeholder="优先级" />
                        // <Input
                        //     prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        //     type="text"
                        //     placeholder="优先级"
                        // />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);









function App() {
  return (
    <div className="App">
       <Prjob/>
    </div>
  );
}




export default App;
