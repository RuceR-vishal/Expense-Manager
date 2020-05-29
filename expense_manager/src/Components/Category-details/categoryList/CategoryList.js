import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { categoryDetailsAction } from "../../../redux/CategoryDetail/categoryDetailsAction";
import { Card } from 'react-bootstrap'

const CategoryList = () => {
    const category_data = useSelector(state => state.category.category_data)
    const loginid = useSelector(state => state.login.id)
    const dispatch = useDispatch()
    const [select, setselect] = useState(
        (sessionStorage.getItem("selectedCategoryID") === (""||null) ||
            sessionStorage.getItem("selectedCategoryID").length === 0) ?
            category_data[0].id :
            JSON.parse(sessionStorage.getItem("selectedCategoryID")))
    const baseUrl = 'http://localhost:5000/'

    const listClickHandler = (id) => {
        setselect(id)
    }
    useEffect(() => {
        dispatch(categoryDetailsAction.getCategoryDetail(loginid, select, baseUrl))
        // eslint-disable-next-line
    }, [select])

    return (
        <div className="col-md-3" style={{ height: "655px" }}>
            <div className="card mb-sm-3 mb-md-0 contacts_card">
                <Card.Header>
                    <h2 style={{ textAlign: "center" }}>Category List</h2>
                </Card.Header>
                <div className="card-body contacts_body">
                    <ul className="contacts">
                        {/* active class */}
                        {
                            category_data.map(data => (
                                <li key={data.id} className={select === data.id ? "active" : ""} onClick={() => listClickHandler(data.id)}>
                                    <div className="d-flex bd-highlight">
                                        <div className="img_cont">
                                            <Image src={baseUrl + data.image}
                                                className="image user_img"
                                                roundedCircle />
                                        </div>
                                        <div className="user_info">
                                            <span>{data.name}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="card-footer"></div>
            </div>
        </div>
    )
}

export default CategoryList
