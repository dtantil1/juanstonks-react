import { useState, useEffect } from 'react'
import {Table} from "react-bootstrap";
import axios from 'axios';
function Promises(props){
    function ShowMe(props){
        return(
        <div>
            <Table striped bordered hover size="sm" variant="dark" >
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Close</th>
                    <th>Adjusted Close</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map((item) => (
                    <tr key={item.date}>
                        <td>{item.date}</td>
                        <td>{item.close}</td>
                        <td>{item.adjusted_close}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
        )
    }
    console.log("props.data below")
    console.log(props.data)
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    let count = 0;

    useEffect(() => {
        const loadPost = async () => {
            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);
            // Await make wait until that
            // promise settles and return its result
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts/");
            // After fetching data stored it in posts state.
            setPosts(response.data);
            // Closed the loading page
            console.log(props.data[3])

            count++;
            setPosts(props.data[0])
            console.log(posts)
            console.log("Count: "+ count)
        }
        // Call the function
        if(props.data[3]===true){
            setLoading(false);
        }
        loadPost();
    }, []);
    return (
        <div>
            {loading ?(<h4>{posts}</h4>) : (<ShowMe data={props.data} />)}

        </div>
    );
}


export default Promises;