import React,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Row, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { useForm } from "react-hook-form";
import {userLoginAction} from '../../actions/User.action';
import toaster from "../../../_Common/toaster";
import {FormError, ShowFormErrors} from "../../../_Common/formError";

const Login=({ history })=>{
  const [formData,setForm] = useState({userType:101});

  const { handleSubmit, register, errors } = useForm();

  const [formErrors,setFormErrors] = useState({});

  const formHandler = (e,field)=>{
    let formData1 = formData;
    formData1[field] = e.target.value;
    setForm(formData1);
  }

  const submitForm = async()=>{
    let res = await userLoginAction(formData);

    if(res.success){
      toaster.show({message: "Login successfully.",intent: "success"});
      localStorage.setItem("firstName",res.data.name.firstName);
      localStorage.setItem("lastName",res.data.name.lastName);
      localStorage.setItem("email",res.data.email);
      localStorage.setItem("userType",res.data.userType);
      localStorage.setItem("jwtToken",res.jwtToken);

      setTimeout(function(){
        toaster.clear();
        history.push('/');
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

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit(submitForm)}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={e=>formHandler(e,'email')} type="text" name="email" placeholder="Username" autoComplete="username" 
                              innerRef={register({
                                required: 'Required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Invalid email address"
                                }
                              })}
                            />
                          </InputGroup>
                          <span className="text-danger">{ShowFormErrors(errors,formErrors,'email')}</span>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={e=>formHandler(e,'password')} name="password" type="password" placeholder="Password" autoComplete="current-password" 
                              innerRef={register({
                                required: 'Required'
                              })}
                            />
                          </InputGroup>
                          <span className="text-danger">{ShowFormErrors(errors,formErrors,'password')}</span>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default withRouter(Login);