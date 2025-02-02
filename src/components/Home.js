import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
        <h1>Shipyaari Assignment</h1>
        <div className="container d-flex flex-column align-items-center">
                    <div className="col-md-6 mt-3">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                            <th scope="col">Index</th>
                            <th scope="col">Tasks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td> <Link to="/counter">Implement a Click Counter </Link> </td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td><Link to="/users">Fetch and Display Data from API </Link></td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td><Link to="/search">Build a Debounced Search Bar </Link></td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                            <td><Link to="/virtual-list">Implement a React Virtualized List </Link></td>
                            </tr>
                            <tr>
                            <th scope="row">5</th>
                            <td><Link to="/kanban">Build a Drag-and-Drop Kanban Board </Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h3 className="mt-3"> Personal Details</h3>
                    <h5>Name: Vachaspati Annaldas</h5>
                    <h5>Phone No.: 7020270105</h5>
                    <h5>Email: annaldasvachaspati@gmail.com</h5>
                </div>
        </div>
        
    </div>
  );
}

export default Home;