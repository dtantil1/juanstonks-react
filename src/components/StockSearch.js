import { useState } from 'react'
import {Table} from "react-bootstrap";
import axios from 'axios';

import React from 'react';
const average = (array) => array.reduce((a, b) => a + b) / array.length;

let count = 0;
let close_price = [];
let adjusted_close = [];
let dates = []

function StockSearch(){
    let counter = 0;
    function ShowMe(props){
        return(
            <div >
                <p hidden>{counter = 1}</p>
                <Table striped bordered hover table-sm variant="dark" >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Close($)</th>
                        <th>Adjusted($)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.data.map((item) => (
                        <tr key={item.date}>
                            <td>{counter++}</td>
                            <td>{item.date}</td>
                            <td>{item.close} </td>
                            <td>{item.adjusted_close}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }
    //const [searchTicker,setSearchTicker] = React.useState('');
    //const [message,setMessage] = React.useState('');
    function dateMaker(date){
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yy = date.getFullYear();
        return yy + '-' + mm + '-' + dd;
    }
    let today_date = dateMaker(new Date());
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate()-7);
    let past_date = dateMaker(dateObj);

    let stock = [
        {
            ticker:'',
            date1:new Date(),
            date2: new Date(),
        }
    ];
    const handleSubmit = (event) => {
        event.preventDefault();
        stock.ticker = event.target.elements.ticker.value.toUpperCase();
        stock.date1 = event.target.elements.day1.value
        stock.date2 = event.target.elements.day2.value
        //setMessage(stock.ticker + " from " + stock.date1 + " to " + stock.date2)

        let data = [];
        data.push(stock.ticker, stock.date1, stock.date2, true)
        //setSearchTicker(data)
        loadPost(data);

    }
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [avg, setAvg] = useState('');
    const[avgAdj, setAvgAdj]=useState('');
    //other data
    const[name, setName]=useState('');
    const[exchange, setExchange]=useState('');
    const[industry, setIndustry]=useState('');
    const[logo, setLogo]=useState('');
    const[ipo, setIPO]=useState('');
    const[url, setUrl]=useState('');


    const loadPost = async (data) => {
        // Till the data is fetch using API
        // the Loading page will show.
        setLoading(true);
        // Await make wait until that
        // promise settles and return its result
        const response = await axios.get(
            //"https://jsonplaceholder.typicode.com/posts/");
            "https://eodhistoricaldata.com/api/eod/"+data[0]+
            ".US?api_token=625cdb1c39d9f5.23708719&period=d&fmt=json&from="+data[1]+"&to="+data[2]);
        // After fetching data stored it in posts state.
        setPosts(response.data);

        // Closed the loading page
        setLoading(false)
        count++;
        let info = response.data;
        close_price = []
        adjusted_close = []
        dates = []
        info.forEach(stock => {
            close_price.push(stock.close);
            adjusted_close.push(stock.adjusted_close);
            dates.push(stock.date)
        })

        //GET STOCK DATA
        const response2 = await axios.get("https://finnhub.io/api/v1/stock/profile2?symbol="
            +data[0]+ "&token=c9ei572ad3iff7bjsb80");
        console.log(response2.data)
        setName(response2.data.name)
        setExchange(response2.data.exchange)
        setLogo(response2.data.logo)
        setIPO(response2.data.ipo)
        setIndustry(response2.data.finnhubIndustry)
        setUrl(response2.data.weburl)


        console.log("LOAD POST! Count: "+ count)
        console.log(dates)
        setAvg(average(close_price).toFixed(2))
        setAvgAdj(average(adjusted_close).toFixed(2));
    }


    return(
        <div >
        <div >
        <form onSubmit={handleSubmit}>
            <div className="form-row align-items-center">
                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInput">Input Stock Ticker</label>
                    <input type="text" className="form-control mb-2" id="inlineFormInput" name="ticker" defaultValue="RIVN" required/>
                </div>
                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">From &nbsp;</label>
                    <input  id="day1" name="day1" type="date" defaultValue={String(past_date)} max={today_date} required />
                    <label className="sr-only" htmlFor="inlineFormInputGroup">&nbsp;To &nbsp;</label>
                    <input id="day2" name="day2" type="date" defaultValue={String(today_date)} max={today_date} required />
                </div>
                <div className="col-auto">
                    <div className="form-check mb-2">
                    </div>
                </div>
                <div className="col-auto">
                    <button type="submit"  className="btn btn-outline-primary mb-2">Submit</button>
                </div>
            </div>
        </form>


        </div>
            {loading ?(<div></div>) : (
                <div>
                    <br />

                    <ul className="list-group">
                        <li className="list-group-item list-group-item-dark">
                            <a href={url}><img alt="logo" width={128} height={128} src={logo}/></a></li>
                        <li className="list-group-item list-group-item-dark"><strong>{name}</strong></li>
                        <li className="list-group-item list-group-item-dark">Average price <b>${avg}</b></li>
                        <li className="list-group-item list-group-item-dark">The average <strong>adjusted price </strong>
                            was <b>${avgAdj}</b></li>
                        <li className="list-group-item list-group-item-dark">{exchange}</li>
                        <li className="list-group-item list-group-item-dark">Industry: {industry}</li>
                        <li className="list-group-item list-group-item-dark">IPO: {ipo}</li>
                    </ul><br />

                <ShowMe data={posts} /></div>) }
        </div>
    )
}

export default StockSearch;