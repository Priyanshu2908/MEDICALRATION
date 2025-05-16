'use client';   
// This is a client component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";

const roles = ["Donor", "Receiver", "NGO"];

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  role: Yup.string().oneOf(roles, "Invalid role").required("Required"),
});

const Login = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Login");
  const [role, setRole] = useState(roles[0]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: roles[0],
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          if (result.data?.token && result.data?.user) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
            toast.success('Login Successful');
            resetForm();
            router.push('/');
          } else {
            toast.error('Login failed - invalid response from server');
          }
        }).catch((err) => {
          toast.error(err.response?.data?.message || 'Login Failed');
          setSubmitting(false);
        });
    },

  });

  // Sync role state with formik
  React.useEffect(() => {
    formik.setFieldValue("role", role);
    // eslint-disable-next-line
  }, [role]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5fafd]">
      <div className="bg-white shadow-xl p-8 w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-8">
          <div className="mr-3">
            <img src="/images/Logo.jpeg" alt="Logo" className="h-12 w-12 object-contain rounded-2xl" />
          </div>
          <span className="text-4xl font-semibold text-gray-800">
            <span className="font-normal">MediRation</span>
          </span>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-[#f2f8f4] rounded-xl overflow-hidden">
          <button
            className={`flex-1 py-2 text-lg font-medium transition ${
              activeTab === "Sign Up"
                ? "bg-white text-green-700"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("Sign Up")}
            type="button"
          >
            Sign Up
          </button>
          <button
            className={`flex-1 py-2 text-lg font-medium transition ${
              activeTab === "Login"
                ? "bg-white text-green-700"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("Login")}
            type="button"
          >
            Login 
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            if (activeTab === "Sign Up") {
              e.preventDefault();
              toast.info("Sign Up functionality is not implemented yet.");
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 text-lg"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 text-lg"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <div className="flex bg-[#f2f8f4] rounded-xl overflow-hidden">
              {roles.map((r) => (
                <button
                  type="button"
                  key={r}
                  className={`flex-1 py-2 text-lg font-medium transition ${
                    role === r
                      ? "bg-white text-green-700"
                      : "text-gray-600"
                  }`}
                  onClick={() => setRole(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm">{formik.errors.role}</div>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-green-600 text-white text-lg font-medium shadow hover:bg-green-700 transition"
            disabled={formik.isSubmitting}
          >
            {activeTab === "Sign Up" ? "Sign Up" : "Login"}
          </button>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 mt-2 rounded-xl border border-gray-200 bg-white text-lg font-medium shadow-sm hover:bg-gray-50 transition"
          >
            <svg width="24" height="24" viewBox="0 0 48 48">
              <g>
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.3 0-13.5 4.1-17 10.7z"/>
                <path fill="#FBBC05" d="M24 44c5.6 0 10.5-1.8 14.3-4.9l-6.6-5.4C29.7 35.9 27 37 24 37c-6.1 0-10.7-2.9-13.7-7.1l-7 5.4C7.5 39.9 15.1 44 24 44z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-4.7 0-8.5-3.8-8.5-8.5s3.8-8.5 8.5-8.5c2.1 0 4 .7 5.5 2.1l6.1-6.1C37.9 10.1 31.7 7 24 7c-8.9 0-16.3 7.2-16.3 16.3S15.1 39 24 39c7.7 0 13.9-3.1 17.5-8.1l-7-5.4C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9
export default Login;