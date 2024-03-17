import { useState } from "react";
const UserHistory = () => {
   const [history, setHistory] = useState([]);
   const [pending, setPending] = useState(false);
   const [error, setError] =useState(null);
   const [sortOrder, setSortOrder] = useState('asc')
   
   
   const handleDelete = (id) => {
    fetch(`https://theses-vault-3.onrender.com/get-thesis-data/clicked-history/${id}`,{
        method:'DELETE',
        headers:{ 'Content-Type': 'application/json' },
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("Error in deleting history :" +response.status)
        }
        const updatedHistory = history.filter(item => item._id !== id);
        setHistory(updatedHistory);


    })
    
   .catch(error => {
    console.error("Error in deleting history:", error);
    setError(error.message);
    // setPending(false);
    })
   }
   const fetchHistory = () => {
    const userData =JSON.parse(localStorage.getItem(`userData`));
    console.log(userData.user.id);

    // if(getUserId) {
    //     const userId = JSON.parse(getUserId);
    //     console.log(userId.user.id);
    // }
    console.log(`https://theses-vault-3.onrender.com/get-thesis-data/clicked-history?userId=${userData.user.id}`);
    setPending(true);
    
    fetch(`https://theses-vault-3.onrender.com/get-thesis-data/clicked-history?userId=${userData.user.id}`, {
        method :'GET'  ,
        headers:{ 'Content-Type': 'application/json' },
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("History Feching Error :" +response.status)
        }
        return response.json();

    })
   .then(data => {
    
    console.log(data.data);
    setHistory(data.data);
    setPending(false);
    setError(null);
   })

   .catch(error => {
    console.error("Error fetching user history:", error);
    setError(error.message);
    setPending(false);
    })
   }
   
    const handleSort = () => {
        // const title = history.map(item => item.title);
        const sortHistory = [...history].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title); 
            } else {
                return b.title.localeCompare(a.title); 
            }
        })
        setHistory(sortHistory);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
    };

    const formatDate = (dateString) => {
      let date = new Date(dateString).toLocaleString();
      return date;
    }
  
    return (
        <div className="main">
            <div className="flex-history">
             <h2 className="third-box history-title">Theses Visted</h2>
             <div className="third-box fetch-history">
              <button onClick={fetchHistory}>Fetch History</button>
             </div>
             <div className="third-box toggle-history">
              <button  onClick={handleSort}>
                Sort by Title {sortOrder === "asc" ? "(A-Z)" : "(Z-A)"}
              </button>
             </div>
            </div>
            {pending && <div className="load-error">Loading..</div>}
            {error && <div className="load-error">Error Occurred: {error}</div>}
            {!pending && !error && history.length > 0 && <div className="history-table">
                <table border={1}>
                    <thead>
                        <tr>
                            
                            <th>Thesis Title</th>
                            <th>Visted Time</th>
                            <th>Delete Any Histroy</th>
                        </tr>
                    </thead>
                    <tbody>
                     {history.map((data) => (
                      <tr key={data._id}>
                       <td>{data.title}</td>
                       <td>{formatDate(data.clickedAt)}</td> 
                       <td className="delete-history">
                        <button onClick={() => handleDelete(data._id)}>Delete</button>
                       </td>
                      </tr>
                     ))}
                     
                  </tbody>
                </table>
            </div>
}
        </div>
    );
}
 
export default UserHistory;