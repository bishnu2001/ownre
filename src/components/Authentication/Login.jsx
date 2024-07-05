import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../DATA/category'; // Ensure this import is correct for your project
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { signinstart,signInFailure,signInSuccess } from "../../redux/user/useSlice";

const Login = () => {
  const navigate=useNavigate()
  const [error, setError] = useState('');
  const dispatch=useDispatch()
  const {currentUser}=useSelector((state)=>state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        // Dispatch any actions related to login start (if using Redux)
        // For example: dispatch(signinstart());
        dispatch(signinstart())
        const response = await axios.post(`${BASE_URL}/users/signin`, {
          email,
          password,
        });

        const userinfo = response.data.data.user;
        dispatch(signInSuccess(userinfo))
        console.log(userinfo)
        if(userinfo.role==='admin'){
          navigate('/adminchat')
        }else{
          navigate('/userchat')
        }
        const token = response.data.data.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        // Handle navigation based on user role if needed
        // Example navigation logic
        // if (userinfo.role === "ADMIN") {
        //   navigate("/dashboard");
        // } else if (userinfo.role === "APPLICANT") {
        //   navigate("/applicantprofile");
        // }

        // Reset form and error state after successful login
        formik.resetForm();
        setError('');
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error.message);
        } else {
          console.log("Error: Unable to send request");
        }
      }
    },
  });

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`mt-1 block w-full px-3 py-2 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`mt-1 block w-full px-3 py-2 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
