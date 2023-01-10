export const authLogin = (req, res, next) => {
    req.session.user ? next() : res.redirect("/login")
}
