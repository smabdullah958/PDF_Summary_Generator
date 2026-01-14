let express=require('express');
let app=express();
let dotenv=require('dotenv');
dotenv.config();

//for file upload
let upload=require("./Config/multerConfig")

let cors=require("cors");
app.use(cors())
app.use(express.json())
let SummaryRoute=require("./Route/SummaryRoute")


app.use("/SummaryRoute",upload.single("pdf"),SummaryRoute)
app.listen(process.env.Port)