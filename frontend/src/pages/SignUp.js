import { useState } from "react"
import { useSignup } from "../hooks/useSignup";


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Email:</label>
        <input type="email" onChange={(event) => {
            setEmail(event.target.value);
        }} value={email}/>

        <label>Password:</label>
        <input type="password" onChange={(event) => {
            setPassword(event.target.value);
        }} value={password}/>

        <button disabled={isLoading}>Signup</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp;