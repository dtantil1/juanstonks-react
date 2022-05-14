
import StockSearch from './StockSearch'
import money from "../money.jpg";
function Logo(){
    return (
        <div>
            <h2>Juan Stonks</h2>
            <div><img className="img-thumbnail img-fluid" src={money} height={288} width={320}  /></div><br />
            <StockSearch />
        </div>

    )
};

export default Logo;