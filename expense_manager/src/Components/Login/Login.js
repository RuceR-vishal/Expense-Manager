//import React, { Component } from 'react'
import React, { useState, useEffect } from 'react';
import classes from './Login.module.css'
import { Button, Image, Form } from 'react-bootstrap';
import logo from '../../assets/Login/EMlogo.jpg'
import LoginAction from '../../redux/Login/LoginAction'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import getDataAction from '../../redux/Category/getDataAction'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [validated, setValidated] = useState(false);
    const credentials = useSelector(state => state.login.credentials)
    const dependency = useSelector(state => state.login.dependency)
    const loginid = useSelector(state => state.login.id)
    const category_data = useSelector(state => state.category.category_data)
    const getData =  useSelector(state => state.category.getData)
    const history = useHistory()
    const dispatch = useDispatch()
    const emailChangeHandler = (e) => {
        setemail(e.target.value)
    }
    const passChangeHandler = (e) => {
        setpassword(e.target.value)
    }

    useEffect(() => {
        if (getData === "done") {
            debugger
            if (category_data.length === 0 ) {
                history.push('/categories')
            }
            else history.push('/categoriesdetails')
        }
        // eslint-disable-next-line
    }, [category_data,getData])

    const submitHandler = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            event.preventDefault()
            dispatch(LoginAction(email, password))
        }
    }

    useEffect(() => {
        if (credentials === false) {
            setemail("")
            setpassword("")
            setValidated(true);
        }
        if (credentials === true) {
            dispatch(getDataAction(loginid))
        }
        // eslint-disable-next-line
    }, [dependency])

    return (
        <div>
            <Form className={classes.divstyle} noValidate validated={validated} onSubmit={submitHandler}>
                <div style={{ textAlign: 'center' }}>
                    <Image src={logo} style={{ width: '110px', marginTop: '13px' }} roundedCircle />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                </div>
                <Form.Group className={classes.FormGroup} controlId="formBasicEmail">
                    <Form.Control type="text"
                        value={email} required
                        onChange={emailChangeHandler}
                        placeholder="Enter email" />
                    <Form.Control.Feedback type="invalid">Please Enter valid Email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={classes.FormGroup} controlId="formBasicPassword">
                    <Form.Control type="password"
                        placeholder="Password" required
                        value={password}
                        onChange={passChangeHandler} />
                    <Form.Control.Feedback type="invalid">Please Enter valid Password</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" className={classes.ButtonLogin} type="submit">
                    Submit
                </Button>
            </Form>
        </div>

    )
}


export default Login

// class Login extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             email: props.email,
//             password: props.password,
//             credentials: props.credentials
//         }
//         this.checkCredentials = props.checkCredentials
//     }
// componentWillUpdate(prevState,newState){
// console.log(prevState,newState)
// }
//     render() {
//         const emailChangeHandler = (e) => {
//             this.setState({
//                 email: e.target.value
//             })
//         }
//         const passChangeHandler = (e) => {
//             this.setState({
//                 password: e.target.value
//             })
//         }

//         const submitHandler = (e) => {
//             e.preventDefault()
//             const { email, password } = this.state
//             this.checkCredentials(email, password)
//         }
//         return (
//             <div className="text-center bg">
//                 <form className="form-signin" onSubmit={submitHandler}>
//                     <img className="mb-4" src={logo} alt="" />
//                     <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
//                     {
//                         this.state.credentials ? <h2 className="h3 mb-3 font-weight-normal">INVALID CREDENTIALS</h2> : null
//                     }
//                     <input type="email" className="form-control"
//                         placeholder="Email address"
//                         value={this.state.email}
//                         onChange={emailChangeHandler} />
//                     <input type="password" className="form-control"
//                         placeholder="Password"
//                         value={this.state.password}
//                         onChange={passChangeHandler} />
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         email: state.login.email,
//         password: state.login.password,
//         credentials: state.login.credentials
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         checkCredentials:
//             (email, password) => {
//                 dispatch(LoginAction(email, password))
//             }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)


