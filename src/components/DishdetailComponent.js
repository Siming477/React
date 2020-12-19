import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm>
                            <Row className='form-group'>
                            <Label className="col-12" htmlFor="rate">Rating</Label>
                                <Col className="col-12">
                                    <Control.select model=".rateType" name="rateType" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label className="col-12" htmlFor="name" >Your Name</Label>
                                <Col className="col-12">
                                    <Control.text model=".name" id="name" name="name" placeholder="Your Name" 
                                    className="form-control" 
                                    validators={{
                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className="text-danger" model=".name" show="touched" messages={{required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less'}}/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label className="col-12" htmlFor="message" >Comment</Label>
                                <Col className="col-12">
                                    <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col className="col-12">
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderDish({dish}) {
    return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );   
}

function RenderComments({comments}){
    if(comments != null)
        return (
            <div>
                {comments.map((comment) => {
                    return (
                        <div>
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        </div>
                    );
                })}
                <CommentForm />
            </div>
        );   
    else
        return(
            <div></div>
        );
}

const DishDetail =(props) => {
    if ((props.dish != null))
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>

                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <RenderComments comments={props.comments} />
                    </ul>
                    
                </div>
            </div>
        </div>
        
    ); 
    else
    return(
        <div></div>
    );
}

export default DishDetail;