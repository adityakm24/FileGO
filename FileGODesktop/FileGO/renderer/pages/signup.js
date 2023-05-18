import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import bcrypt from "bcryptjs";

function Signup() {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailID,
        password: hashedPassword,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.error) {
    
      setErrorMessage(data.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="container">
      <img src="/logo.png" alt="Logo" />
      <form onSubmit={handleSignup} className="form">
        <h1>Sign up</h1>
        <div className="input-group">
          <label htmlFor="emailID">Email ID</label>
          <input
            type="email"
            id="emailID"
            value={emailID}
            onChange={(e) => setEmailID(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="button">
          Sign up
        </button>
        <p className="form-text">
          Already have an account?{" "}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </p>
      </form>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f2f2f7;
        }

        img {
          width: 60px;
          margin-bottom: 40px;
        }

        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 350px;
          padding: 30px;
          background-color: #ffffff;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .form h2 {
          margin-bottom: 30px;
          font-size: 24px;
          font-weight: 500;
        }

        .form-control {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 20px;
        }

        label {
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 500;
          color: #0f0f0f;
        }

        input {
          width: 100%;
          padding: 10px;
          border: none;
          background-color: #f2f2f7;
          border-radius: 5px;
          font-size: 16px;
          color: #333333;
        }

        button[type="submit"] {
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          border: none;
          background-color: #007aff;
          color: #ffffff;
          border-radius: 5px;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
        }

        p {
          margin-top: 20px;
          font-size: 16px;
          color: #333333;
        }

        a {
          color: #007aff;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Signup;
