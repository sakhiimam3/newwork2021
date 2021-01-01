import React from "react"
//  import Link from "react-router-dom"
import Button from '@material-ui/core/Button';

const Work=(props)=>{
        const goto=()=>{
                 props.history.push("Signup")
        }
        return(
                <div>
                        <h1>Welcome </h1><br />
          <Button variant="contained" onClick={goto}  color="primary">Sign Up</Button> 
              
                 
           </div>
        )
}

export default Work;