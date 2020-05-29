import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Col, Modal } from 'react-bootstrap'
import './details.css'
import logo from '../../../assets/Category/plus.jpg'
import attachment from '../../../assets/category-details/attachment.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCheckCircle, faSyncAlt, faPlusCircle, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { categoryDetailsAction } from "../../../redux/CategoryDetail/categoryDetailsAction";
import LogoutAction from "../../../redux/Login/LogoutAction";
import { useHistory } from 'react-router-dom'
const baseUrl = 'http://localhost:5000/'

const CategoryExpenseDetails = () => {

    // ************************************useselector & usedispatch********************************************
    const categoryId = useSelector(state => state.categorydetails.selectedCategoryID || [])
    const categoryDetails = useSelector(state => state.categorydetails.categoryDetailsData || [])
    const category_data = useSelector(state => state.category.category_data)
    const loginId = useSelector(state => state.login.id)
    const dispatch = useDispatch()
    const history = useHistory()
    // **********************************************usestate***********************************************
    const [maxAmount, setmaxAmount] = useState("")
    const [editMode, seteditMode] = useState({ edit: false, budgetEditorDelete: faEdit, expenseEditorDelete: "Add Expense" })
    const [remainingAmount, setremainingAmount] = useState("")
    const [cost, setcost] = useState("")
    const [Imagefile, setImage] = useState({ file: "", path: logo })
    const [validated, setValidated] = useState(false);
    const [description, setdescription] = useState("")
    const [Delete, setDelete] = useState({ del: false })
    const [selectedCategory, setselectedCategory] = useState("")
    const [maxValueValidation, setmaxValueValidation] = useState(false)
    const [budgetvalidation, setbudgetvalidation] = useState(false)

    //************************************************functions******************************************** */ 
    const reaminingAmountHandler = (DetailsData, ListData) => {
        setremainingAmount("")
        if (DetailsData.length !== 0) {
            debugger
            DetailsData.length > 1 ?
                setremainingAmount(
                    ListData[0].max_amount - DetailsData.reduce((a, b) => a + b.expense_amount, 0)
                ) : setremainingAmount(ListData[0].max_amount - DetailsData[0].expense_amount)
        }
    }
    const editMaxAmountHandler = () => {
        if (editMode.budgetEditorDelete === faEdit) {
            document.getElementById("budget").readOnly = false
            document.getElementById("budget").focus()
            seteditMode({ edit: false, budgetEditorDelete: faCheckCircle, expenseEditorDelete: "Add Expense" })
        }
        else {
            if (!budgetvalidation) {
                document.getElementById("budget").readOnly = true
                seteditMode({ edit: false, budgetEditorDelete: faEdit, expenseEditorDelete: "Add Expense" })
                dispatch(categoryDetailsAction.SetMaxAmount(maxAmount, categoryId, category_data))
            }
        }
    }
    const maxAmountChangeHandler = (e) => {
        setmaxAmount(e.target.value)
        let expense = categoryDetails.reduce((a, b) => a + b.expense_amount, 0)
        if (e.target.value >= expense) {
            setbudgetvalidation(false)
            selectedCategory[0].max_amount = e.target.value
            reaminingAmountHandler(categoryDetails, selectedCategory)
        }
        else {
            setbudgetvalidation(true)
        }
    }
    const costChangeHandler = (e) => {
        setcost(e.target.value)
        if (editMode.edit) {
            e.target.value > (editMode.maxAmount + remainingAmount) ? setmaxValueValidation(true) : setmaxValueValidation(false)
        }
        else {
            e.target.value > parseInt(remainingAmount) ? setmaxValueValidation(true) : setmaxValueValidation(false)
        }
    }
    const editExpenseClickHandler = (data) => {
        seteditMode({ edit: true, budgetEditorDelete: faEdit, expenseEditorDelete: "Update Expense", id: data.id, maxAmount: data.expense_amount })
        data.attachment ?
            setImage({ file: baseUrl + data.attachment, path: baseUrl + data.attachment }) :
            setImage({ file: "", path: logo })
        document.getElementById("attachment").value = ""
        setdescription(data.expense_detail)
        setcost(data.expense_amount)
    }
    const deleteClickHandler = () => {
        dispatch(categoryDetailsAction.deleteDataAction(loginId, categoryId, Delete.delId))
        setDelete({ del: false })
    }
    const imageChangeHandler = (e) => {
        const img = window.URL.createObjectURL(e.target.files[0])
        setImage({ file: e.target.files[0], path: img })
    }
    const cancleEditModeHandler = () => {
        setValidated(false)
        seteditMode({ edit: false, budgetEditorDelete: faEdit, expenseEditorDelete: "Add Expense" })
        setImage({ file: "", path: logo })
        document.getElementById("attachment").value = ""
        setdescription("")
        setcost("")
    }
    const updateScrollHandler = () => {
        var element = document.getElementById("cardbody");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
    const addExpenseHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        let formData = new FormData();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        else {
            formData.append('attachment', Imagefile.file);
            formData.set('expense_amount', cost);
            formData.set('expense_detail', description);
            setImage({ file: "", path: "" })
            setdescription("")
            setcost("")
            document.getElementById("attachment").value = ""
            seteditMode({ edit: false, budgetEditorDelete: faEdit, expenseEditorDelete: "Add Expense" })
            editMode.edit
                ? dispatch(categoryDetailsAction.updateDataAction(formData, loginId, categoryId, editMode.id))
                : dispatch(categoryDetailsAction.postDataAction(formData, loginId, categoryId))
        }
    }
    const filterData = (array) => {
        return array === "" ? [] : array.filter(data => data.id === categoryId)
    }
    const logout = () => {
        dispatch(LogoutAction())
        history.push('/')
    }
    const addCategoryHandler = () => {
        history.push('/categories')
    }
    // *********************************************use-effect****************************************************
    useEffect(() => {
        setImage({ file: "", path: logo })
        setdescription("")
        setcost("")
        setValidated(false)
        setmaxValueValidation(false)
        document.getElementById("attachment").value = ""
        seteditMode({ edit: false, budgetEditorDelete: faEdit, expenseEditorDelete: "Add Expense" })
        const ListData = filterData(category_data, "id")
        setselectedCategory(ListData)
        reaminingAmountHandler(categoryDetails, ListData)
        if (ListData.length !== 0) {
            setmaxAmount(ListData[0].max_amount)
            //setblurState(ListData[0].max_amount)
        }
        updateScrollHandler()
        // eslint-disable-next-line
    }, [categoryId, categoryDetails])

    return (
        <div className="col-md-8 col-xl-9 ">
            <Card.Header className="Card_Header">
                <div className="d-flex m-auto">
                    <div className="d-flex" style={{ width: "50rem" }}>
                        <div className="d-flex">
                            <div className="budget d-flex">
                                <div>Remaining Amount:</div>
                                <Form.Control id="remaining"
                                    type="number" className="max_amount" placeholder="No cost"
                                    readOnly value={remainingAmount} />
                            </div>
                        </div>
                        <div className="budget d-flex">
                            <div>Budget:</div>
                            <div>
                                <Form.Control id="budget"
                                    type="number" className="max_amount" placeholder="Enter budget" readOnly
                                    value={maxAmount} onChange={maxAmountChangeHandler}
                                    isInvalid={budgetvalidation}
                                />
                                <Form.Control.Feedback type="invalid">Budget cannot be less than expense</Form.Control.Feedback>
                            </div>
                            <FontAwesomeIcon icon={editMode.budgetEditorDelete}
                            style={{ width: "25px", height: "25px" }} onClick={editMaxAmountHandler} className="m-1 FontAwesomeIcon" />
                        </div>

                    </div>
                    <div style={{width:"140px" }}>
                    <span style={{float: "right"}}>
                            <FontAwesomeIcon icon={faPowerOff} onClick={logout} style={{ width: "34px", height: "34px" }} className="m-1 FontAwesomeIcon" />
                            {/* <Button variant="success" onClick={logout}>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Button> */}
                        </span>
                        <span className="budget" style={{float: "right",marginRight:"13px"}}>
                            <FontAwesomeIcon icon={faPlusCircle} onClick={addCategoryHandler} style={{ width: "34px", height: "34px" }} className="m-1 FontAwesomeIcon" />
                            {/* <Button variant="primary" onClick={addCategoryHandler}>Add Category</Button> */}
                        </span>
                       
                    </div>
                </div>
            </Card.Header>
            <Card.Body className="d-flex card_padding" >
                <div className="w-100">
                    <Card className="bg-white">
                        <Card.Body id="cardbody" className="scroller">
                            {
                                categoryDetails.map((data) => (
                                    <Card style={{ width: '18rem' }} className="h-auto mb-1" key={data.id}>
                                        {/* expense */}
                                        <Card.Header>
                                            Expense : {data.expense_amount}
                                            <span style={{ float: "right" }}>
                                                <FontAwesomeIcon icon={faEdit}
                                                    onClick={() => editExpenseClickHandler(data)}
                                                    className="m-1 FontAwesomeIcon" />
                                                <FontAwesomeIcon icon={faTrash}
                                                    onClick={() => setDelete({ del: true, delId: data.id })}
                                                    className="m-1 FontAwesomeIcon" />
                                            </span>
                                        </Card.Header>
                                        {/* description */}
                                        <Card.Body>
                                            <Card.Title>Description</Card.Title>
                                            <Card.Text>
                                                {data.expense_detail}
                                            </Card.Text>
                                            {/* attachment */} {data.attachmentName ?
                                                <a href={baseUrl + data.attachment} target="_blank" rel="noopener noreferrer" className="attachmentcard" style={{ textDecoration: "none" }}>
                                                    <img src={attachment} style={{ height: 50, width: 50 }} alt="" />
                                                    <span className="attachmentcardInfo">{data.attachmentName}</span>
                                                </a> : null}
                                        </Card.Body>
                                    </Card>))
                            }
                        </Card.Body>
                    </Card>
                </div>
                <div className="add_expense" >
                    <Form noValidate validated={validated} onSubmit={addExpenseHandler}>
                        <Card style={{ width: '18rem' }} className="text-center bg-white">
                            <Card.Header>
                                <h4 style={{ textAlign: "center" }}>Expense</h4>
                            </Card.Header>
                            <Card.Body>
                                <div className="float-right">
                                    <FontAwesomeIcon icon={faSyncAlt} onClick={cancleEditModeHandler} className="m-1 FontAwesomeIcon" />
                                </div>
                                <Card.Img variant="top" onClick={()=>document.getElementById("attachment").click()}
                                 id="attachPreview" src={Imagefile.path}
                                 className="m-3" style={{ width: "130px", height: " 130px" }} />
                                <Form.Group as={Col}>
                                    <Form.Control type="number" placeholder="Enter cost"
                                        value={cost} onChange={costChangeHandler}
                                        required isInvalid={maxValueValidation} />
                                    <Form.Control.Feedback type="invalid">cost cannot be "0" or ">" than status</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                <textarea className="form-control" rows="5" id="comment"
                                placeholder="description" required
                                value={description} onChange={(e) => setdescription(e.target.value)}
                                ></textarea>
                                    <Form.Control.Feedback type="invalid">Description cannot be empty</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Control type="file" name="attachment"
                                        id="attachment" onChange={imageChangeHandler} />
                                </Form.Group>
                             
                           
                            </Card.Body>
                            <Card.Footer>
                                {editMode.edit ? <Button variant="secondary" onClick={cancleEditModeHandler}>Cancle</Button> : null}
                                {'  '}<Button type="submit">{editMode.expenseEditorDelete}</Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </div>
            </Card.Body>

            <Modal size="sm" centered
                show={Delete.del}
                onHide={() => setDelete({ del: false })}
                aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Alert!
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDelete({ del: false })}>Close</Button>
                    <Button variant="danger" onClick={deleteClickHandler}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>


    )
}
export default CategoryExpenseDetails