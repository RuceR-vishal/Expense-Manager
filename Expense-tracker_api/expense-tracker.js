const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = 5000;
const cors = require('cors');
const multer = require('multer')
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: storage })

app.use(cors())
app.use(bodyparser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sql123',
    database: 'demoexpense'
});
// connection to DB
con.connect((err) => {
    if (err) throw err;
    console.log('connected')
})

//Login
app.post('/login', (req, res) => {
    let sql = `
    SELECT ID FROM users WHERE UserName = 
        ${JSON.stringify(req.body.username)} 
    AND User_Password = 
        ${JSON.stringify(req.body.password)} `

    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length == 1)
            res.send(results)
        else {
            res.send("invalid credentials")
        }
    })
})

//get category
app.get('/category/:loginid', (req, res) => {
    getCategory(req, res)
});

//post category
app.post('/addCategory/:loginid', upload.single("categoryImage"), (req, res) => {
    let sql = `
    INSERT INTO category(max_amount,image,name,userId) VALUES(
        ${req.body.max_amount},
        ${JSON.stringify(req.file.path)},
        ${JSON.stringify(req.body.categoryName)},
        ${req.params.loginid})`
    con.query(sql, (err, results) => {
        if (err) throw err;
        getCategory(req, res)
    });
})

// post maxamount
app.post('/addmaxAmount/:id', (req, res) => {
    let sql = `
    UPDATE category SET max_amount=${JSON.stringify(req.body.max_amount)} 
    WHERE id = ${req.params.id}`
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results)
    });
})

//get category-details
app.get('/category/details/:loginid/:categoryid', (req, res) => {
    getcategoryDetails(req, res)
});

//post category-details    
app.post('/addCategory/details/:loginid/:categoryid', upload.single("attachment"), (req, res) => {
    let sql = `
    INSERT INTO category_details(expense_amount,
        expense_detail, attachment, user_id, category_id, attachmentName)
        VALUES(            
            ${req.body.expense_amount},
            ${JSON.stringify(req.body.expense_detail)},
            ${req.file != undefined ? JSON.stringify(req.file.path) : null},
            ${req.params.loginid},
            ${req.params.categoryid},
            ${req.file != undefined ? JSON.stringify(req.file.originalname) : null}
        )`
    con.query(sql, (err, results) => {
        if (err) throw err;
        getcategoryDetails(req, res)
    });
})

//update category-details    
app.put('/updatedetails/:loginid/:categoryid/:detailid', upload.single("attachment"), (req, res) => {
    let sql = ""
    if (req.file != undefined) {
        sql = `
        UPDATE category_details SET expense_amount = ${req.body.expense_amount},
            expense_detail = ${JSON.stringify(req.body.expense_detail)},
            attachment = ${JSON.stringify(req.file.path)},
            attachmentName = ${JSON.stringify(req.file.originalname)} 
            WHERE id = ${req.params.detailid}`
    }
    else {
        sql = `
        UPDATE category_details SET 
            expense_amount = ${req.body.expense_amount},
            expense_detail = ${JSON.stringify(req.body.expense_detail)}
            WHERE id = ${req.params.detailid}`
    }

    con.query(sql, (err, results) => {
        if (err) throw err;
        getcategoryDetails(req, res)
    });
})

//delete expense
app.delete('/deletedetails/:loginid/:categoryid/:detailid', (req, res) => {
    let sql = `
    DELETE FROM category_details WHERE id = ${req.params.detailid}`
    con.query(sql, (err, results) => {
        if (err) throw err;
        getcategoryDetails(req, res)
    });
})

function getCategory(req, res) {
    let sql = `
    SELECT * FROM category WHERE userId = 
        ${req.params.loginid}`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

function getcategoryDetails(req, res) {
    let sql = `
    SELECT * FROM category_details WHERE user_id = 
        ${req.params.loginid} AND category_id = 
        ${req.params.categoryid}`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

app.listen(port, () => {
    console.log('Server started on port 5000...');
});