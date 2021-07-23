import React, {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {format} from 'timeago.js';
import axios from 'axios'
const Home = () => {
    const [notes ,setNotes] = useState([])
    const [token , setToken] = useState('')
    const getNotes= async(token)=> {
        const res = await axios.get('/api/notes', {
            headers : {Authorization : token}
        })
        setNotes (res.data)
    }
    useEffect(()=>{
        const token  = localStorage.getItem('tokenStore')
        console.log(token)
        setToken(token)
        if(token){
            getNotes(token)
        }
    },[])
    const deletenote = async  (id) => {
   let x = window.confirm("Are you sure to delete this note ?");
    if (x) {
    console.log(id)
    console.log("deletenote", token)
    try {
        if(token){
            console.log("inside try deletenote", token)
            await axios.delete(`/api/Notes/${id}`,{
                headers : {Authorization : token}
            })
            getNotes(token)
            console.log(id,'deleted')
            alert("note Will be Deleted");
        }
    } catch (error) {
        console.log("eroor in deleting")
        window.location.href = '/';
    }
  } else {
    alert("Action canceled");
  }
    }
    return (
        <div className="note-wrapper" >
            {
                notes.map(note =>
                    (
                    <div className="card" key={note._id} >
                            <h4 title={note.title} >
                               {note.title}
                            </h4>
                            <div className="text-wrapper" >
                            <p>{note.content}</p>
                            </div>
                        <p className="date">{format(note.date)}</p>
                        <div className="card-footer" >
                            {note.name}
                            <Link to={`read/${note._id}`} className="read" > Read</Link>
                            <Link to={`edit/${note._id}`} className="edit" > Edit</Link>
                        </div>
                        <button className="close" onClick={() => deletenote(note._id)} > X </button>
                    </div>
                    )
                )
            }
        </div>
    )
}
export default Home