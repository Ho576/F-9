import React from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import {loginSchema} from '../validayion/Validayion.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Login({saveCurrentUser}) {
    const navigate = useNavigate();
    const initialValues={
        email:'',
        password:'',
    };

  

    const onSubmit = async users=>{
        const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,users)
       
        if(data.message == 'success'){
            localStorage.setItem("userToken",data.token);
            saveCurrentUser();
            toast.success('login succesfuly', {
                
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/');
            
        }

     };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:loginSchema
    });


    const inputs =[
        {
            id:'email',
            type:'email',
            name:'email',
            title:'user email',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'user password',
            value:formik.values.password,
        }
     
    ]
    const renderInputs = inputs.map( (input,index)=>
    <Input type={input.type}
     id={input.id}
      name={input.name}
       title={input.title}
       value={input.value}
        key={index}
        errors={formik.errors}
        onChange={formik.handleChange}
        touched={formik.touched}
        //setFieldTouched={formik.setFieldTouched}
        onBlur={formik.handleBlur}

        />
    )
  return (

    <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: 25}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in</p>
                
                
                <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                   {renderInputs}  
    <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={!formik.isValid} >Log in</button>
                  </div>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


                  

  )
}





