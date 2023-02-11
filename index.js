import express from "express"

let app = express()
app.use(express.static("./public"))
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port", process.env.PORT || 3000)
    console.log("Ctrl+C to end")
})