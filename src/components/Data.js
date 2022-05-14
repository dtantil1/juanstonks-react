import {Table} from "react-bootstrap";

let data = [];
let count = 0;
function Data(props){


    async function gather(){
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data1 = await response.json();
        console.log(data1)
        data = data1
       // setStockTable(data1)
        count++;
        console.log(count)
    }
    //gather();
    //const [stockTable,setStockTable] = React.useState([]);
   let stockTable = [
        {
            id:1,
            data:23,
            title: "time to crush",
            body:"get some",
        }
    ]
    return (
        <div>
            <Table striped bordered hover size="sm" variant="dark" >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                {stockTable.map((item) => (
                        <tr key={data.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default Data;