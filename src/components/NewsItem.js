import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}
        <span className= "visually-hidden">unread messages</span>
        </span>
        <img src={imageUrl?imageUrl:"https://images.livemint.com/img/2022/10/07/600x338/GOOGLE-INDIA--0_1665104462517_1665104462517_1665104491413_1665104491413.JPG"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className= "card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank"className="btn btn-sm btn-dark">Read more...</a> 
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
