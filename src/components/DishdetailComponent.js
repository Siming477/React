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
        return (
            comments.map((comment) => {
                return (
                <div>  
                    <li>{comment.comment}</li>
                    <br />
                    <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    <br />
                </div>
                );
            })
        );   
    }

    render(){
        if ((this.props.dish === null) || (this.props.dish === undefined))
            return(
                <div></div>
            );
        else
            return (
                <div className="container">
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
                </div>
                
            ); 
    }
}

export default DishDetail;