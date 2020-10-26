import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
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

    renderComments(comments){
        if(comments != null)
            return (
                comments.map((comment) => {
                    return (
                    <div>  
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {comment.date}</li>
                    </div>
                    );
                })
            );   
        else
            return(
                <div></div>
            );
    }

    render(){
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {this.renderComments(this.props.dish.comments)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default DishDetail;