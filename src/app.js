const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app=express()
//Define path for express config
const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Yash'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About nature',
        name:'Yash'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title:'How may i help you',
        name:'Yash'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
    })
    
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'yash',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
   res.render('404',{
    title:'404',
    name:'yash',
    errorMessage:'Page not found'
   })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})