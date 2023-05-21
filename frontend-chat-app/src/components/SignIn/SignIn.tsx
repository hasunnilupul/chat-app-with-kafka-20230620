import React, {useState} from "react";
import "./SignIn.css";

type SignInProps = {
    onSubmit: (val: string) => void
}

const SignIn = ({onSubmit}: SignInProps) => {
    const [username, setUsername] = useState("");
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);

    const handleOnClick = () => onSubmit(username);

    return (
        <div className="signin">
            <h2 className="header">Sign in</h2>
            <div className="signin-container">
                <input type="text" placeholder="Your username" className="input-username" onChange={handleOnChange}/>
                <button type="button" className="btn-signin" onClick={handleOnClick}>Signin</button>
            </div>
        </div>
    );
}
export default SignIn;