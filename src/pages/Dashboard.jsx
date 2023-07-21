import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { currentStock } from "../inventoryData";

const Dashboard = () => {
  const navigator = useNavigate();

  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <header>
        <div className="d-flex justify-content-between py-3 header">
          <div className="logo mx-3 .logo">Stock Inventory</div>
          <div className="d-flex justify-content-around align-items-center w-25">
            <div className="account">UserName</div>

            <button
              onClick={handelLogout}
              className="btn logout"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <div className="main">
        <h4>Welcome , User</h4>

        <h3 className="text-center">Current Stock Details</h3>
        <table className="table table-border table-dark table-striped">
          <thead>
            <tr className="text-center">
              <th>Product Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {currentStock.map((data, idx) => {
              const {productName,Category,Description,Price,quantity,Notes} =data
              return (
                <tr key={idx} className="text-center">
                  <td>{productName}</td>
                  <td>{Category}</td>
                  <td>{Description}</td>
                  <td>{Price}</td>
                  <td>{quantity}</td>
                  <td>{Notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
