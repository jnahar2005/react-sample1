import React,{useState ,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import {Card, CardBody, Col, Button} from 'reactstrap';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { useSelector,useDispatch } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import {getCategoryAction, deleteCategoryAction} from '../../actions/Category.action';
import {CATEGORY_LIST} from '../../actions/actionTypes';

const Category =({history})=>{
  const dispatch = useDispatch();

  const categoryList = useSelector(state=>state.category.list);

  const [deleteAlert, setDeleteAlert] = useState(null);

  const getCategoryList=async()=>{
    let categoryList1 = await getCategoryAction();
    dispatch({type:CATEGORY_LIST,payload:categoryList1.data.list});
  }

  const showStatus=(cell)=>{
    if(cell===1){
      return <span className="text-success">Active</span>
    }
    else{
      return <span className="text-warning">Inactive</span>
    }
  }

  const action=(cell,row)=>{
    let statusBtn = <Button color="success" onClick={e=>changeStatus(row,1)}>Active</Button>
    if(cell===1){
      statusBtn = <Button color="warning" onClick={e=>changeStatus(row,0)}>Inactive</Button>
    }

    return (
      <Col>
        {/* {statusBtn}&nbsp; */}
        <Button color="danger" onClick={e=>setDeleteAlert(row)}>Delete</Button>&nbsp;
        <Button color="primary" onClick={e=>editCategory(row)}>Edit</Button>
      </Col>
    )
  }

  const resetCategoryList=(row,deleted=false)=>{
    let categoryList1 = [];
    for(let x in categoryList){
      let row1 = categoryList[x];
      if(row1._id === row._id){
        if(!deleted){
          row1 = row;
        }
        else{
          row1 = null;
        }
      }
      if(row1){
        categoryList1.push(row1);
      }
    }
    dispatch({type:CATEGORY_LIST,payload:categoryList1});
  }

  const changeStatus=async(row,status)=>{
    row.enabled = status;
    resetCategoryList(row);
  }

  const deleteCategory=async()=>{
    await deleteCategoryAction({categoryId:deleteAlert.categoryId});
    resetCategoryList(deleteAlert,true);
    setDeleteAlert(null);
  }

  const editCategory=async(row)=>{
    history.push({
      pathname: '/category/edit',
      state: row
    });    
  }

  useEffect(() => {
    if(!categoryList || !categoryList.length){
      getCategoryList();
    }
  }, []);

  return (
    <div>
      <Card className="text-white">
        <CardBody className="pb-0">
          <BootstrapTable
            deleteRow={false}
            data={categoryList}
            search={false}
            scrollTop={'Bottom'}
            pagination={true}
            remote={true}
          >
            <TableHeaderColumn hidden={true} tdAttr={{ 'data-attr': '_id' }} dataField='_id' dataSort={true} isKey searchable={false}>Id</TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort={true} searchable={false}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='description' dataSort={true} searchable={false}>Description</TableHeaderColumn>
            <TableHeaderColumn width='120px' dataField='enabled' dataFormat={showStatus} dataSort={true} searchable={false}>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='enabled' dataFormat={action} dataSort={true} searchable={false}>Action</TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>

      {/* Delete btn */}
      { deleteAlert &&
        <SweetAlert
          warning
          showCancel
          cancelBtnText="Cancel"
          confirmBtnText="Confirm"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={deleteCategory}
          onCancel={e=>setDeleteAlert(null)}
          focusCancelBtn
        />
      }
    </div>
  );
}

export default withRouter(Category);