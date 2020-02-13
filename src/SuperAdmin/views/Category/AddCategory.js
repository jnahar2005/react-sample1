import React,{useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import {CardBody, Card, CardHeader, Row, Col, Label, Form, Input, Button, FormGroup} from 'reactstrap';
import { useForm } from "react-hook-form";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { useDispatch } from 'react-redux';

import toaster from "../../../_Common/toaster";
import {FormError, ShowFormErrors} from "../../../_Common/formError";

import {addEditCategoryAction} from '../../actions/Category.action';
import {CATEGORY_LIST} from '../../actions/actionTypes';

const AddCategory =({history})=>{
  const dispatch = useDispatch();

  const [formData,setForm] = useState({});

  const { handleSubmit, register, errors } = useForm();

  const [formErrors,setFormErrors] = useState({});

  const [formTitle,setFormTitle] = useState("Add Category");

  const submitForm = async()=>{
    const res = await addEditCategoryAction(formData);
    if(res.success){
      dispatch({type:CATEGORY_LIST,payload:[]});
      toaster.show({message: res.msg,intent: "success"});

      setTimeout(function(){
        toaster.clear();
        history.push('/category/list');
      },1000);
    }
    else{
      if(res.err && res.err.length > 0){
        setFormErrors(FormError(res.err));
      }
      else if(res.msg){
        toaster.show({message: res.msg,intent: "danger"});
      }
    }
  }

  const formHandler = (e,field)=>{
    let formData1 = formData;
    formData1[field] = e.target.value;
    setForm(formData1);
  }

  useEffect(() => {
    if(history.location.state){
      setFormTitle("Edit Category");
      setForm(history.location.state);
    }
  }, []);

  return (
    <Row>
      <Col xs="12" md="6">
        <Card>
          <CardHeader>
            <strong>{formTitle}</strong>
          </CardHeader>
          <CardBody className="pb-0">
            <Form onSubmit={handleSubmit(submitForm)}>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input defaultValue={formData.name} onChange={e=>formHandler(e,'name')} type="text" name="name" placeholder="Name"
                    innerRef={register({
                      required: 'Required'
                    })} />
                    <span className="text-danger" xs="12" md="6">{ShowFormErrors(errors,formErrors,"name")}</span>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="name">Description</Label>
                    <Input defaultValue={formData.description} onChange={e=>formHandler(e,'description')} type="textarea" name="description" placeholder="Description" 
                      innerRef={register({
                        required: 'Required'
                      })}
                    />
                    <span className="text-danger" xs="12" md="6">{ShowFormErrors(errors,formErrors,"description")}</span>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup row>
                <Col sm="12">
                  <Button color="primary" className="pull-right">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default withRouter(AddCategory);