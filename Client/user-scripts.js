/* *************************
*** USER SIGNUP ***
************************** */
function userSignUp() {
     //console.log('userSignUp Function Called')

    let userUsername = document.getElementById("getUsername").value;
    let userPass = document.getElementById(pwdSignup).value;

    let newUserData = {
        user: { 
            username: userUsername,
            passwordhash: userPass
        }
    };

    console.log(`newUserData --> ${newUserData.user.username} ${newUserData.user.password}`);

    fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    })    
        .then( response => response.json())
        .then(data => {
            console.log(data);
            let token = data.sessionToken;
            localStorage.setItem('sessionToken', token);
            tokenChecker();
        })
        .catch(err => {
            console.error(err)
        })
    };   
    /* *************************
    *** USER LOGIN ***
    ************************** */
    function userLogin() {
     console.log('userLogin Function Called')
    }
    
    
    /* *************************
    *** USER LOGOUT ***
    ************************** */
    function userLogout() {
     console.log('userLogout Function Called')
    }
    
    
    /* *************************
     *** TOKEN CHECKER FUNCTION ***
    ************************** */
    function tokenChecker() {
     console.log('tokenChecker Function Called')
    }
    tokenChecker()