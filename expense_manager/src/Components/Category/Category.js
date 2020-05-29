import React, { useState, useEffect } from 'react'
import './Category.css'
import { useDispatch, useSelector } from 'react-redux'
import addCategoryImg from '../../assets/Category/plus.jpg'
import { Button, Modal, Image, Form } from 'react-bootstrap';
import postDataAction from '../../redux/Category/postDataAction'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPowerOff } from '@fortawesome/free-solid-svg-icons'
import LogoutAction from "../../redux/Login/LogoutAction";

const Category = () => {
    const dispatch = useDispatch()
    //*******************************INITIAL FECTING OF DATA**************************************
    const loginid = useSelector(state => state.login.id)
    const history = useHistory()
    const category_data = useSelector(state => state.category.category_data)

    const [allCategories, setallCategories] = useState(useSelector(state => state.category.category_data))
    const [show, setShow] = useState(false);
    const [Continue, setContinue] = useState(false)
    const [validated, setValidated] = useState(false);
    const [categoryName, setcategoryName] = useState("")
    const [file, setfile] = useState('')
    const [maxAmount, setmaxAmount] = useState("")
    const baseImageUrl = 'http://localhost:5000/'

    //*************************EVERYTIME DATA CHANGE IT IS CALLED*********************************
    useEffect(() => {
        setallCategories(category_data)
    }, [category_data])

    const handleClose = () => {
        setfile("")
        setcategoryName("")
        setmaxAmount("")
        setValidated(false)
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const continueHandler = () => {
        if (category_data.length === 0) setContinue(true)
        else history.push('/categoriesdetails')
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let formData = new FormData();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            event.preventDefault();
            formData.append('categoryImage', file);
            formData.set('max_amount', maxAmount);
            formData.set('categoryName', categoryName);
            dispatch(postDataAction(formData, loginid))
            handleClose()
        }
    };
    const nameChangeHandler = (e) => {
        setcategoryName(e.target.value)
    }
    const imageUploadHandler = (e) => {
        setfile(e.target.files[0])
    }
    const amountChangeHandler = (e) => {
        setmaxAmount(e.target.value)
    }
    const logout = () => {
        dispatch(LogoutAction())
        history.push('/')
    }
    return (
        <>
        <div style={{
            position: "absolute",
            top: "15px",
            right: "15px"
        }}>
        <FontAwesomeIcon icon={faPowerOff} style={{ width: "34px", height: "34px" }} onClick={logout} className="m-1 FontAwesomeIcon" />
        </div>
            <div className="divstyle">
                <div className="griddiv">
                    {allCategories && allCategories.map((data) => (
                        <div key={data.id}>
                            <Image src={baseImageUrl + data.image}
                                roundedCircle className="imagecategory"/>
                            <div className="textalign">{data.name}</div>
                        </div>
                    ))
                    }
                    <div>
                        <button className="btnCategory"
                            style={{ backgroundImage: `url(${addCategoryImg})` }}
                            onClick={handleShow}>
                        </button>
                        <div className="textalign">Add Category</div>
                    </div>
                </div>

            </div>
            <div className="continuediv">
                <Button variant="primary" style={{ width: '32rem' }} onClick={continueHandler}>Continue</Button>
            </div>
            {/*++++++++++++++++++++++++++++++++ on click of continue category button modal will open ++++++++++++++++++++++++++++++++++++++++*/}
            <Modal size="sm"
                show={Continue}
                onHide={() => setContinue(false)}
                aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Alert!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Please Add atleast one category</Modal.Body>
            </Modal>
            {/*++++++++++++++++++++++++++++++++ on click of add category button modal will open ++++++++++++++++++++++++++++++++++++++++*/}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text"
                                value={categoryName}
                                onChange={nameChangeHandler}
                                placeholder="Category Name" required />
                            <Form.Control.Feedback type="invalid">Please Enter Category Name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="number"
                                value={maxAmount}
                                onChange={amountChangeHandler}
                                placeholder="Please Enter budget" required />
                            <Form.Control.Feedback type="invalid">Please Enter budget</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control type="file" placeholder="Category Name" name="categoryImage" onChange={imageUploadHandler} required />
                            <Form.Control.Feedback type="invalid">Please Upload Category Image</Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" style={{ float: "right" }} variant="primary">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Category


// import React, { useState, useEffect } from 'react'
// import  './Category.css'
// import { useDispatch, useSelector } from 'react-redux'
// import addCategoryImg from '../../assets/Category/plus.jpg'
// import { Button, Modal, Image, Form } from 'react-bootstrap';
// import getDataAction from '../../redux/Category/getDataAction'
// import postDataAction from '../../redux/Category/postDataAction'
// import categoryDetailAction from "../../redux/Category/categoryDetailAction";
// import { useHistory } from 'react-router-dom'

// const Category = () => {
//     const dispatch = useDispatch()
//     //*******************************INITIAL FECTING OF DATA**************************************
//      const loginid = useSelector(state => state.login.id)
//     // useEffect(() => {
//     //     dispatch(getDataAction(loginid))
//     //     // eslint-disable-next-line
//     // }, [])
//     const history = useHistory()
//     const category_data = useSelector(state => state.category.category_data)

//     const [allCategories, setallCategories] = useState([])
//     const [show, setShow] = useState(false);
//     const [Continue, setContinue] = useState(false)
//     const [validated, setValidated] = useState(false);
//     const [categoryName, setcategoryName] = useState("")
//     const [file, setfile] = useState('')
//     const [maxAmount, setmaxAmount] = useState("")
//     const [selectedCategory, setselectedCategory] = useState([])
//     const baseImageUrl = 'http://localhost:5000/'

//     //*************************EVERYTIME DATA CHANGE IT IS CALLED*********************************
//     useEffect(() => {
//         setallCategories(category_data)
//     }, [category_data])

//     const handleClose = () => {
//         setfile("")
//         setcategoryName("")
//         setmaxAmount("")
//         setValidated(false)
//         setShow(false);
//     }
//     const handleShow = () => setShow(true);
//     const continueHandler = () => {
//         if (selectedCategory.length === 0) {
//             setContinue(true)
//         }
//         else{
//             dispatch(categoryDetailAction(selectedCategory))
//             history.push('/categoriesdetails')
//         }

//     }
//     const handleSubmit = (event) => {
//         const form = event.currentTarget;
//         let formData = new FormData();
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//             setValidated(true);
//         }
//         else {
//             event.preventDefault();
//             formData.append('categoryImage', file);
//             formData.set('max_amount', maxAmount);
//             formData.set('categoryName', categoryName);
//             dispatch(postDataAction(formData, loginid))
//             handleClose()
//         }
//     };
//     const nameChangeHandler = (e) => {
//         setcategoryName(e.target.value)
//     }
//     const imageUploadHandler = (e) => {
//         setfile(e.target.files[0])
//     }
//     const amountChangeHandler = (e) => {
//         setmaxAmount(e.target.value)
//     }
//     const imgClickHandler = (newSelectedItem) => {
//         if (selectedCategory.indexOf(newSelectedItem) === -1) {
//             setselectedCategory((prevState) => [...prevState, newSelectedItem])
//         }
//         else {
//             const value = selectedCategory.filter(
//                 (id) => id !== newSelectedItem)
//             setselectedCategory(value)
//         }
//     }
//     return (
//         <>
//             <div className="divstyle">
//                 <div className="griddiv">
//                     {allCategories && allCategories.map((data) => (
//                             <div key={data.id}>
//                                 <Image src={baseImageUrl + data.image}
//                                     roundedCircle 
//                                     onClick={() => imgClickHandler(data.id)}
//                                     className={(selectedCategory.indexOf(data.id) > -1) ?"selectedimage imagecategory": "imagecategory"} />

//                                 <div className="textalign">{data.name}</div>
//                             </div>
//                         ))
//                     }
//                     <div>
//                         <button className="btnCategory"
//                             style={{ backgroundImage: `url(${addCategoryImg})` }}
//                             onClick={handleShow}>
//                         </button>
//                         <div className="textalign">Add Category</div>
//                     </div>
//                 </div>

//             </div>
//             <div className="continuediv">
//                 <Button variant="primary" style={{ width: '32rem' }} onClick={continueHandler}>Continue</Button>
//             </div>
//             {/*++++++++++++++++++++++++++++++++ on click of continue category button modal will open ++++++++++++++++++++++++++++++++++++++++*/}
//             <Modal size="sm"
//                 show={Continue}
//                 onHide={() => setContinue(false)}
//                 aria-labelledby="example-modal-sizes-title-sm">
//                 <Modal.Header closeButton>
//                     <Modal.Title id="example-modal-sizes-title-sm">
//                         Alert!
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Please select atleast one category</Modal.Body>
//             </Modal>
//             {/*++++++++++++++++++++++++++++++++ on click of add category button modal will open ++++++++++++++++++++++++++++++++++++++++*/}
//             <Modal show={show} onHide={handleClose} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Category</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                         <Form.Group>
//                             <Form.Control type="text"
//                                 value={categoryName}
//                                 onChange={nameChangeHandler}
//                                 placeholder="Category Name" required />
//                             <Form.Control.Feedback type="invalid">Please Enter Category Name</Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Control
//                                 type="number"
//                                 value={maxAmount}
//                                 onChange={amountChangeHandler}
//                                 placeholder="Please Enter budget" required />
//                             <Form.Control.Feedback type="invalid">Please Enter budget</Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Control type="file" placeholder="Category Name" name="categoryImage" onChange={imageUploadHandler} required />
//                             <Form.Control.Feedback type="invalid">Please Upload Category Image</Form.Control.Feedback>
//                         </Form.Group>

//                         <Button type="submit" style={{ float: "right" }} variant="primary">Save Changes</Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     )
// }

// export default Category

