
import { Link } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useState } from "react";

function Register() {

    const [userInput, setUserInput] = useState({
        username: "",
        email: "",
        password: "",

    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name]: value
        }));
    };


    //handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userInput);
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
            {/* Container */}
            <div className="w-full max-w-md bg-[#1a2536] rounded-xl shadow-lg p-8">
                {/* Header */}
                <h1 className="mb-6 items-center text-sm leading-[1px] flex justify-center flex-col">
                    <Logo />
                    <span className="mt-3 text-base font-medium">
                        Create your account
                    </span>
                </h1>

                {/* Form */}
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="text-sm font-medium mb-1 block">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Your username"
                            onChange={(e) => handleUserInput(e)}
                            name="username"

                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium mb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="you@example.com"
                            onChange={(e) => handleUserInput(e)}
                            name="email"

                        />
                    </div>



                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium mb-1 block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="********"
                            onChange={(e) => handleUserInput(e)}
                            name="password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium mb-1 block"
                        >
                            Confirm Password
                        </label>

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md transition"
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-1 border-gray-700" />
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <hr className="flex-1 border-gray-700" />
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:underline hover:text-blue-300"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
