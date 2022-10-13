import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:6,
        category:'general'
    }
    PropTypes={
        country:PropTypes.string.isRequired,
        pageSize:PropTypes.number.isRequired,
        category:PropTypes.string.isRequired
    }
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewMonk`;
    }
    async updateNews(){
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2942a7d7856f4a4799434c774e35b818 &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
    }
    async componentDidMount(){
        this.updateNews();
    }
    handleNext=async()=>{
        this.setState({page:this.state.page+1});
        this.updateNews();
    }
    handlePrevious=async()=>
    {
        this.setState({page:this.state.page-1});
        this.updateNews();
    }
    fetchMoreData=async()=>{
        this.setState({page:this.state.page+1})
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2942a7d7856f4a4799434c774e35b818 &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
        })
    }
    render() {
    return (
      <>
        <h2 className="text-center" style={{margin:'40px'}}>NewsMonk-Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
         {this.state.loading && <Spinner/>} 
        <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
        > 
        <div className="container">
            
        
        <div className="row"> 
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                        source={element.source.name}/>
                    </div> 
                })} 
        </div>
        </div>
        </InfiniteScroll>
      </>
      
    )
  }
}

export default News
