import React from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import {registerSchema} from '../validayion/Validayion.js'
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Register() {

    const initialValues={
        userName:'',
        email:'',
        password:'',
    };

    const handelFiledChange = (event)=>{
        formik.setFieldValue('image',event.target.files[0]);
    }

    const onSubmit = async user=>{
        const formData = new FormData()
        formData.append("userName",user.userName);
        formData.append("email",user.email);
        formData.append("password",user.password);
        formData.append("image",user.image);
        const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData)
        if(data.message == 'success'){
            formik.resetForm();
            toast.success('account created succefully , plz verify your email to login', {
                position: "bottom-left",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            
        }

     };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:registerSchema
    });


    const inputs =[
        {
            id:'username',
            type:'text',
            name:'userName',
            title:'user name',
            value:formik.values.userName,
        },
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
        },
        {
            id:'image',
            type:'file',
            name:'image',
            title:'user image',
            onChange:handelFiledChange
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
        onChange={input.onChange||formik.handleChange}
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
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                
                
                <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                   {renderInputs}  
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={!formik.isValid} >Register</button>
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
