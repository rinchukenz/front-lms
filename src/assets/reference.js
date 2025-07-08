import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // <- add this
import axios from "axios"; // install axios if not yet

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { role, user } = res.data;

      setAuth({
        isLoggedIn: true,
        role,
        user,
      });

      // Redirect based on role
      switch (role) {
        case "student":
          navigate("/student");
          break;
        case "instructor":
          navigate("/instructor");
          break;
        case "orgadmin":
          navigate("/orgadmin");
          break;
        case "superadmin":
          navigate("/superadmin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <CustomInput
        label="Email"
        type="email"
        placeholder="Enter your email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        label="Password"
        type="password"
        placeholder="***********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton
        text="Sign in"
        className="cursor-pointer w-full bg-violet-500 text-white py-2 rounded-lg"
      />
    </form>
  );
}





@PostMapping("/api/auth/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    User user = userService.findByEmailAndPassword(request.getEmail(), request.getPassword());

    if (user != null) {
        return ResponseEntity.ok(Map.of(
            "role", user.getRole(), // "student", "instructor", etc.
            "user", user
        ));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}




superadmin@skyllx.com




<div className="flex gap-4 mb-6 text-white">
        <button className="border px-2 py-1 bg-violet-500 rounded-md">
          New Recorded course
        </button>
        <button className="border px-2 py-1 bg-violet-500 rounded-md">
          New Cohort-Based Course (CBC)
        </button>
      </div>