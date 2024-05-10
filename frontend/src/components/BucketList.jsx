// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './BucketList.css'

// function BucketList() {
//     const [bucketList, setBucketList] = useState([]);
//     const [urlToAdd, setUrlToAdd] = useState('');
//     const [shortNameToAdd, setShortNameToAdd] = useState('');

//     useEffect(() => {
//         const storedBucketList = JSON.parse(localStorage.getItem('bucketList'));
//         console.log("Stored Bucket List:", storedBucketList);
//         if (storedBucketList) {
//             setBucketList(storedBucketList);
//         }
//     }, []);
    

//     useEffect(() => {
//         localStorage.setItem('bucketList', JSON.stringify(bucketList));
//     }, [bucketList]);

//     const addToBucketList = () => {
//         if (urlToAdd.trim() !== '' && shortNameToAdd.trim() !== '') {
//             const newItem = { url: urlToAdd, shortName: shortNameToAdd, showUrl: false };
//             setBucketList([...bucketList, newItem]);
//             setUrlToAdd('');
//             setShortNameToAdd('');
//             console.log("New Item Added to Bucket List:", newItem);
//         }
//     };
    
//     const copyToClipboard = (url) => {
//         navigator.clipboard.writeText(url);
//     };

//     const toggleDisplayUrl = (shortName) => {
//         console.log("Toggling display for:", shortName);
//         const updatedBucketList = bucketList.map(item => {
//             if (item.shortName === shortName) {
//                 return { ...item, showUrl: !item.showUrl };
//             }
//             return item;
//         });
//         setBucketList(updatedBucketList);
//         console.log("Updated Bucket List:", updatedBucketList);
//         const selectedItem = updatedBucketList.find(item => item.shortName === shortName);
//         if (selectedItem.showUrl) {
//             copyToClipboard(selectedItem.url);
//         }
//     };
    

//     return (
//         <div className="bucket-list-container">
//             <h2>Bucket List</h2>
//             <div className="bucket-list">
//                 {bucketList.map((item, index) => (
//                     <div key={index} className="bucket-list-item">
//                         <button onClick={() => toggleDisplayUrl(item.shortName)}>{item.shortName}</button>
//                         {item.showUrl && <span>{item.url}</span>}
//                     </div>
//                 ))}
//             </div>
//             <div className="add-to-bucket">
//                 <input type="text" value={urlToAdd} onChange={(e) => setUrlToAdd(e.target.value)} placeholder="Enter URL" />
//                 <input type="text" value={shortNameToAdd} onChange={(e) => setShortNameToAdd(e.target.value)} placeholder="Enter Short Name" />
//                 <button onClick={addToBucketList}>Add</button>
//             </div>
//         </div>
//     );
// }

// export default BucketList;



//***************************************************************************************************************** */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BucketList.css';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
function BucketList({setUrl}) {
    const [bucketList, setBucketList] = useState([]);
    const [urlToAdd, setUrlToAdd] = useState('');
    const [urlId, setUrlId] = useState('');
    const [shortNameToAdd, setShortNameToAdd] = useState('');
    const [error, setError] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    // const [link,setLink] = useState('');
    
    useEffect(() => {
        // Fetch bucket list from server on component mount
        fetchBucketList();
    }, []);

    const fetchBucketList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get_bucket_list');
            setBucketList(response.data);
        } catch (error) {
            setError('Error fetching bucket list from server.');
        }
    };

    // const addToBucketList = async () => {
    //     if (urlToAdd.trim() !== '' && shortNameToAdd.trim() !== '') {
    //         try {
    //             await axios.post('http://localhost:5000/add_to_bucket_list', {
    //                 url: urlToAdd,
    //                 shortName: shortNameToAdd
    //             });
    //             // Refresh bucket list after adding item
    //             fetchBucketList();
    //             // Clear input fields
    //             setUrlToAdd('');
    //             setShortNameToAdd('');
    //         } catch (error) {
    //             setError('Error adding to bucket list: ' + error.message);
    //         }
    //     }
    // };

    const addToBucketList = async () => {
        if (urlToAdd.trim() !== '' && shortNameToAdd.trim() !== '') {
            try {
                if (editIndex !== null) {
                    // Modify existing item
                    await axios.put(`http://localhost:5000/update_bucket_list/${urlId}`, {
                        url: urlToAdd,
                        shortName: shortNameToAdd,
                        id: urlId
                    });
                    setEditIndex(null);
                } else {
                    // Add new item
                    await axios.post('http://localhost:5000/add_to_bucket_list', {
                        url: urlToAdd,
                        shortName: shortNameToAdd
                    });
                }
                // Refresh bucket list after adding/modifying item
                fetchBucketList();
                // Clear input fields
                setUrlToAdd('');
                setShortNameToAdd('');
            } catch (error) {
                setError('Error adding to bucket list: ' + error.message);
            }
        }
    };
    

    const deleteFromBucketList = async (shortName) => {
        try {
            await axios.delete(`http://localhost:5000/delete_from_bucket_list/${shortName}`);
            // Refresh bucket list after deleting item
            fetchBucketList();
        } catch (error) {
            setError('Error deleting from bucket list: ' + error.message);
        }
    };

    const editBucketListItem = (item) => {
        setUrlToAdd(item.url);
        setShortNameToAdd(item.shortName);
        setUrlId(item._id); // Use the _id field as the identifier
        // setEditIndex(index);
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        // const copiedUrl= navigator.clipboard.writeText(url);
        // setLink(copiedUrl);
    };

    // const toggleDisplayUrl = (shortName) => {
    //     const updatedBucketList = bucketList.map(item => {
    //         if (item.shortName === shortName) {
    //             return { ...item, showUrl: !item.showUrl };
    //         }
    //         return item;
    //     });
    //     setBucketList(updatedBucketList);
    //     const selectedItem = updatedBucketList.find(item => item.shortName === shortName);
    //     if (selectedItem.showUrl) {
    //         copyToClipboard(selectedItem.url);
    //     }
    // };

    const handleSetUrl = (newUrl) => {
        setUrl(newUrl);
    };
    

    return (
        <div className="bucket-list-container">
            <h1>Bucket List</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="bucket-list">
                {bucketList.map((item, index) => (
                    <div key={index} className="bucket-list-item">
                         <div className="bucket-list-col">
                        <button onClick={() => {copyToClipboard(item.url); handleSetUrl(item.url);}}>{item.shortName}</button>
                        </div>
                        {/* {item.showUrl && <span>{item.url}</span>} */}
                        <div className="bucket-list-col">
                        <button style={{border:'none' , cursor:'pointer'}} onClick={() => editBucketListItem(item)}><FaEdit /></button>
                        <button style={{border:'none',cursor:'pointer'}} onClick={() => deleteFromBucketList(item.shortName)}><RiDeleteBin6Fill /></button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="add-to-bucket">
                <input type="text" value={urlToAdd} onChange={(e) => setUrlToAdd(e.target.value)} placeholder="Enter URL" />
                <input type="text" value={shortNameToAdd} onChange={(e) => setShortNameToAdd(e.target.value)} placeholder="Enter Short Name" />
                <button onClick={addToBucketList}>Add</button>
            </div>
        </div>
    );
}

export default BucketList;