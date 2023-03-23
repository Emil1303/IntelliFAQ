const Login = () => {
    async function AuthGoogle() {    
        const res =  await fetch('/google/googleAuth');
        const redirect = await res.json();
        window.location.href = redirect.url;
    }

    async function getMessage() {
        const res =  await fetch('/google/getMail');
        const email = await res.json();
        console.log(email);
    }
   
    async function signInEmail(e) {
        e.preventDefault();
        const signUpForm = document.querySelector('.signup');
        const email = signUpForm.email.value;
        const password = signUpForm.password.value;
        
        try {
            const response = await fetch('/firebase/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const { currentEmail } = await response.json();
            localStorage.setItem("currentEmail", currentEmail);
            signUpForm.reset();            
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="signup-container">
            <form className="signup">
                <label htmlFor="email">email</label>
                <input id="email" name="email" type="email" />
                <label htmlFor="password">password</label>
                <input id="psswd" name="password" type="password" />
                <button onClick={(e) => signInEmail(e)}>Sign Up</button>
            </form>
            <button id="google-btn" onClick={() => AuthGoogle()}>signIn Google</button>
            <button id="google-btn" onClick={() => getMessage()}>Get Last Mail</button>
        </div>
    );
}
 
export default Login;