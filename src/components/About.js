import react from "react"
// import {Link} from "react-router-dom"
import React ,{useEffect,useState} from "react"
import firebase from "../config/Firebase"
import "./Login.css"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Navi=(props)=>{
 
        const db=firebase.database();
        const  [allData,setAlldata]=useState([])
        const [name,setName]=useState('')
        const [fname,setFname]=useState('')
        const [cls,setClassnum]=useState('')
        const [address,setAddress]=useState('')

        useEffect(()=>{
     firebase.auth().onAuthStateChanged((user)=>{
     if(user){
             console.log("=>>>>>> user sign in")
               props.history.push("/About")
     } else{
              alert("user is not signed in")
              props.history.push("/Signup")
     }
        
     });

      db.ref("student").on("value", (data)=>{
          const arr =[]
          const dt=data.val();
          for(let id in dt){
                    arr.push({id,...dt[id]})
          }
         setAlldata(arr)
    
      })

        },[]);
   
        const logout=()=>{
                   firebase.auth().signOut()
                   props.history.push("/Signup")
        }
          
      
       


 const submit=()=>{
         if(name != "" &&  fname != "" && cls  != "" && address !=""){
       let  form ={
               name,
               fname,
               cls,
               address,
          }
                 db.ref("student").push(form).then(()=>{
                         
                 })

                       
                //  setName=("")
                //  setFname=('')
                //  setClassnum=('')
                //  setAddress=('')

        }
               else{
                        alert("please filled all the field")
               }  
 }


 const deleteform = (d,i) => {
        let arr = allData
        arr.splice(i, 1 )
        setAlldata([...arr])
    }


        return(  
        <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">Navbar</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <li>  <Link className="nav-link " to="/">Home </Link> </li>
                      </li>
                      <li className="nav-item">
                      <li>  <Link className="nav-link " to="/About">About </Link> </li>
                      </li>
                      <li className="nav-item">
                      <li>  <Link className="nav-link " to="/Signup">Signup </Link> </li>
                      </li>
                      <li className="nav-item">
                      <li>  <Link className="nav-link " to="/Login">Login </Link> </li>
                      </li>
                      <li className="nav-item">
                         <Button variant="contained" color="secomdary" onClick={logout}>logout</Button>
                      </li>
                    </ul>
                  </div>
                </div>
                
              </nav>
        
                <div>
              
                <div  className="container row col-sm">
                         <header className="header"> 
                         <h1>Dars Gahe kursheed Sec School </h1>
                          <h1> Admessionn form</h1>
                         </header>


                       
  
                          <form action="">
                  <label> Name   :</label> <br />  <TextField id="standard-basic" className="input" value={name}  label="Name"  onChange={(e)=> setName(e.target.value)} />  <br/>
                  <label> F.Name :</label> <br />  <TextField id="standard-basic" className="input" value={fname}  label="fname"  onChange={(e)=> setFname(e.target.value)} />  <br />
                  <label> Class  :</label> <br />  <TextField id="standard-basic" className="input" value={cls}  label="class"  onChange={(e)=> setClassnum(e.target.value)} />  <br/>
                  <label> Address :</label><br />  <TextField id="standard-basic" className="input" value={address}  label="address"  onChange={(e)=> setAddress(e.target.value)} /> <br/> <br />
                  <Button variant="contained" color="secomdary" onClick={submit}>submit</Button>
                  <Button variant="contained" color="primary" onClick={logout}>logout</Button>
                      </form>
                     </div> 
                      
                         <div className="conatiner row col-sm-12 bottom-div   ">
                       <div className="data" className="list-group card">
                             <table>
                                     <tr>
                                     <th>Name </th>       
                                     <th>f.Name </th>
                                     <th>Class </th>
                                     <th> Address </th>
                                      </tr>

                                      {allData && allData.map((d,i)=>{
                                              return(
                                                      <tr>
                                                              <td>{ d. name} </td>
                                                              <td> {d. fname} </td>
                                                              <td> {d.cls} </td>
                                                               <td> {d.address}  </td>
                                                               <td> <button  onClick={()=> deleteform(d,i)}>delete </button> </td>
                                                              </tr>
                                              )
                                      })}
                                      </table>  
                                                            
                               
                                </div>





                  
                 </div>


        
          </div>


                </div>
        
        )
}

export default Navi;