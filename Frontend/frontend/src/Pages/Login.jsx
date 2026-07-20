import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backendApi from "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await backendApi.post(
                "/login",
                formData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login successful!");

            if (response.data.user.role === "teacher") {
                navigate("/dashboard");
            } else {
                navigate("/student-dashboard");
            }
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div>
            <h1>SmartSchool Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
