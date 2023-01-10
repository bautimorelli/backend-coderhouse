import express from "express"

const authRoute = express.Router()

authRoute.get("/login",(req,res)=> {
    res.render("login")
})

authRoute.post("/login",(req,res)=> {
    const {name} = req.body
    req.session.user = name
    res.redirect("/home")
})

authRoute.get("/logout",(req,res)=> {
    const user = req.session.user
    req.session.destroy(error => {
        if(error) return res.redirect("/home")
    })
    res.render("logout", {user: user})
})

export {authRoute}