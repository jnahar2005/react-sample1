import React,{useState, useEffect} from 'react';
import {Card, CardBody, Col, Button} from 'reactstrap';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { useSelector,useDispatch } from 'react-redux';

import {getInstituteAction, instituteApprovelAction} from '../../actions/Institute.action';
import {getCategoryAction} from '../../actions/Category.action';
import {CATEGORY_LIST} from '../../actions/actionTypes';

const Institute =()=>{
  const dispatch = useDispatch();

  const [instituteList,setInstituteList] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  const categoryObj = useSelector((state)=>{
    let categoryObj1 = {};
    if(state.category && state.category.list){
      state.category.list.map((item)=>{
        categoryObj1[item.categoryId] = item;
      });
    }

    return categoryObj1;
  });

  const getCategoryList=async()=>{
    if(!Object.keys(categoryObj).length){
      let categoryList = await getCategoryAction();
      dispatch({type:CATEGORY_LIST,payload:categoryList.data.list});
    }
  }

  const getInstituteList=async(page=1)=>{
    setCurrentPage(page);
    page = page-1;
    setInstituteList(await getInstituteAction({page:page}));
  }

  const showStatus=(cell,row)=>{
    if(cell===0){
      return <span className="text-warning">Pending</span>
    }
    else if(cell===1){
      
      if(row.enabled === 1){
        return (<div><span className="text-success">Approved</span><br/><span className="text-success">Active</span></div>)
      }
      else{
        return (<div><span className="text-success">Approved</span><br/><span className="text-danger">Inactive</span></div>)
      }
    }
    else if(cell===2){
      return <span className="text-danger">Unapproved</span>
    }
  }

  const action=(cell,row)=>{
    if(cell===0){
      return (<Col><Button color="success" onClick={e=>approvel(row,1)}>Approve</Button> <Button color="danger" onClick={e=>approvel(row,2)}>Unapprove</Button></Col>);
    }
    // else if(cell===1){
    //   if(row.enabled===1){
    //     return <Button block color="danger" onClick={e=>changeEnable(row,0)}>Inactive</Button>;
    //   }
    //   else{
    //     return <Button block color="success" onClick={e=>changeEnable(row,1)}>Active</Button>;
    //   }
    // }
  }

  const resetInstituteList=(row)=>{
    let instituteList1 = [];
    for(let x in instituteList.data){
      let row1 = instituteList.data[x];
      if(row1._id === row._id){
        row1 = row;
      }
      instituteList1.push(row1);
    }
    setInstituteList({
      data:instituteList1,
      total:instituteList.total
    });
  }

  const approvel=async(row,status)=>{
    let data = {
      instituteId:row.instituteId,
      status:status
    };
    await instituteApprovelAction(data);
    
    row.status = status;
    resetInstituteList(row);
  }

  const changeEnable=async(row,status)=>{
    let data = {
      instituteId:row._id,
      enabled:status
    };
    // await instituteApprovelAction(data);
    
    row.enabled = status;
    resetInstituteList(row);
  }

  const showCategories=(cell)=>{
    let categoryList = [];
    for(let x in cell){
      if(categoryObj[cell[x]]){
        categoryList.push(categoryObj[cell[x]].name);
      }
    }

    return categoryList.join(",<br>");
  }

  /* Table seetings */
  const tableOptions = {
    page:currentPage,
    sizePerPage:10,
    pageStartIndex: 1,
    onPageChange:getInstituteList,
  }

  const tableFetchInfo = {
    dataTotalSize: instituteList.total
  }
  /* /Table seetings */

  useEffect(() => {
    getCategoryList();
    getInstituteList(1);
  }, []);

  return (
    <Card className="text-white">
      <CardBody className="pb-0">
        <BootstrapTable
          deleteRow={false}
          data={instituteList.data}
          search={false}
          scrollTop={'Bottom'}
          pagination={true}
          options={tableOptions}
          fetchInfo={ tableFetchInfo}
          remote={true}
        >
          <TableHeaderColumn hidden={true} tdAttr={{ 'data-attr': '_id' }} dataField='_id' dataSort={true} isKey searchable={false}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='name' dataSort={true} searchable={false}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='email' dataSort={true} searchable={false}>Email</TableHeaderColumn>
          <TableHeaderColumn width='140px' dataField='phone' dataSort={true} searchable={false}>Phone</TableHeaderColumn>
          <TableHeaderColumn width='100px' dataField='category' dataFormat={showCategories} dataSort={true} searchable={false}>Categories</TableHeaderColumn>
          <TableHeaderColumn width='120px' dataField='status' dataFormat={showStatus} dataSort={true} searchable={false}>Status</TableHeaderColumn>
          <TableHeaderColumn dataField='status' dataFormat={action} dataSort={true} searchable={false}>Action</TableHeaderColumn>
        </BootstrapTable>
      </CardBody>
    </Card>
  );
}

export default Institute;