require('dotenv').config();
const PORT=process.env.PORT || 5000;
console.log(process.env.PORT);
const app=require('./app')
app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})