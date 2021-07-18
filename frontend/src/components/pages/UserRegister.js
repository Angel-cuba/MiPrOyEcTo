import React from 'react'
import '../pages/css/register.css';
import { useHistory } from 'react-router-dom';

//Importando Formik
import { Formik, Form } from 'formik'
import Input from '../../Small-Components/Input'

import { formikSubmit } from '../../lib/formikSubmit'


const UserRegister = () => {
// const btn = document.getElementById('btn')
// if(!formikSubmit){
//      btn.disabled = true
// }

     // btn.disabled = false

 
 return (
      <>
      <div className="pages">
           <Formik {...formikSubmit}>
               {formik => (
               <div className="register">
                    <h1>Usando el Formik</h1>
                         {/* {console.log(formik.values)} */}
                         <Form>
                              <Input label="First Name" name="first_name" placeholder="First Name" className="register_firstname"/>
                              <Input label="Last Name" name="last_name" placeholder="Last Name" className="register_lastname"/>
                              <Input label="Email" name="email" placeholder="Email" className="register_email"/>
                              <Input label="Password" name="password" placeholder="Password" className =" register_password"/>
                              <Input label="Confirm Password" name="confirmpassword" placeholder="Confirm your password" className =" register_password"/>
                              {/* {formikSubmit ? () : ""} */}
                              <button id="btn" type ="submit" className ="register_btn">Register</button>
                          </Form>  
                    </div> 
                 ) 
                   }              
          </Formik>
     </div>   
     </>
        
     )
}

export default UserRegister
