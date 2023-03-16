var personid;

const express=require('express');
const app=express()

const port=5010;

//connect to server
const database=require('mysql');
const bodyParser=require('body-parser');

const data = database.createConnection(
    {




        host:"localhost",
        user:"root",
        password:"",
        database:"Invoice"
    }
)

const value=require('./data.json');
let urlencoded=bodyParser.urlencoded({extended:false})
app.use(bodyParser.json());
let jsondata=[]
for(let a=0;a<value.length;a++)
{
    jsondata.push([]);
    
       let val=Object.values(value[a]);
       for(let b=0;b<val.length;b++)
       {
        if(b==8||b==9||b==10)
        {
            jsondata[a].push(JSON.stringify(val[b]))
        }
        else
        {
        jsondata[a].push(val[b])
        }
       }
    
}

var dat;
var updating;

var personstatus;
app.set("view engine","ejs");
app.use(express.static('public'));
app.get('/first',(req,res)=>
{
    
    let answer=dat;
    let count=0;

    let send="select * from Invoicedetail";
    data.query(send,(err,result)=>
    {
        if(err)
        {
           console.log('error:' + err);
        }
        else
        {
           dat=result;
        
        }

    })
   
    res.render("first",{answer,count});
})

app.get('/profile',(req,res)=>
{
    let send="select * from Invoicedetail";
    data.query(send,(err,result)=>
    {
        if(err)
        {
           console.log('error:' + err);
        }
        else
        {
           dat=result;
        
        }

    })

    let number=Number(req.query.number);
    let choosenum=number;
    let selectele=dat[number];
   personid=selectele.id;
   personstatus=selectele.status;
    
    



   
   
   
    res.render("profile",{selectele,choosenum})
})






app.post('/profile',urlencoded,(req,res)=>
{
   
    let paid="UPDATE `Invoicedetail` SET `status`='paid' WHERE `id`='"+personid+"'";
    data.query(paid,(err,response)=>
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    console.log("hello");
                    console.log(response);
                }
            }) 
            res.redirect('/profile')

   
})


app.post('/cancelling',urlencoded,(req,res)=>
{
    console.log(req.body.giveid)
    
    let delet="DELETE FROM `Invoicedetail` WHERE `id`='"+personid+"'";
    data.query(delet,(err,response)=>
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    // console.log("hello");
                    console.log(response);
                }
            }) 
            res.redirect('/first')

   
})

var returndate;
var paymentdate;
var calctotal=0;
var updatedetail;

app.post('/demo',urlencoded,(req,res)=>
{
    console.log(personid)
    var itemlist=[];
  
    // res.sendStatus(200);
    let creating=req.body.indate;
    creating=creating.split("/");
    returndate=creating.reverse().join("-");

    let d=new Date(req.body.indate);
   let date=d.getDate()+Number(req.body.terms);
   d.setMonth(d.getMonth()+1);
   d.setDate(date);
   paymentdate=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
   let listname=[req.body.itemname];
   if(listname.flat().length>1)
   {
   for(let q=0;q<req.body.itemname.length;q++)
   {
    itemlist.push({
        "name": req.body.itemname[q],
        "quantity": Number(req.body.itemqty[q]),
        "price": Number(req.body.itemprice[q]),
        "total": Number(req.body.itemqty[q])*Number(req.body.itemprice[q])
        
    })
    calctotal+=Number(req.body.itemqty[q])*Number(req.body.itemprice[q])
  }
 }
 else
 {
    let listname=[req.body.itemname];
   let listqty=[req.body.itemqty];
   let listprice=[req.body.itemprice]
   for(let q=0;q<listname.length;q++)
   {
    itemlist.push({
        "name": listname[q],
        "quantity": Number(listqty[q]),
        "price": Number(listprice[q]),
        "total": Number(listqty[q])*Number(listprice[q])
        
    })
    calctotal=Number(listqty[q])*Number(listprice[q])
  }
 }
  console.log(req.body.itemname);
  console.log(listname);
  console.log(itemlist);
  console.log(calctotal);
  console.log(typeof calctotal);
//   console.log(req.body.itemname,req.body.itemqty)
//     console.log(itemlist);
console.log(personid)
    updatedetail={
        "id":personid,
        "createdAt":returndate,
        "paymentDue":paymentdate,
        "description":req.body.desc,
        "paymentTerms":Number(req.body.terms),
        "clientName":req.body.clname,
        "clientEmail":req.body.clemail,
        "status":personstatus,
        "senderAddress":JSON.stringify({
            "street":req.body.fromstreet,
            "city":req.body.fromcity,
            "postCode":req.body.frompostcode,
            "country":req.body.fromcountry
        }),
        "clientAddress":JSON.stringify({
            "street":req.body.tostreet,
            "city":req.body.tocity,
            "postCode":req.body.topostcode,
            "country":req.body.tocountry
        }),
        "items":JSON.stringify(itemlist),
        "total":calctotal
       
    }
   console.log(personid); 
   console.log(updatedetail)
 
            let updating="UPDATE `Invoicedetail` SET `id`='"+ updatedetail.id+"',`createdat`='"+updatedetail.createdAt+"',`paymentDue`='"+updatedetail.paymentDue+"',`description`='"+updatedetail.description+"',`paymentTerms`='"+updatedetail.paymentTerms+"',`clientName`='"+updatedetail.clientName+"',`clientEmail`='"+updatedetail.clientEmail+"',`status`='"+updatedetail.status+"',`senderAddress`='"+updatedetail.senderAddress+"',`clientAddress`='"+updatedetail.clientAddress+"',`items`='"+updatedetail.items+"',`total`='"+updatedetail.total+"' WHERE `id`='"+personid+"'";
            console.log(personid,"hello");
            data.query(updating,(err,response)=>
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    console.log("hello",response)
                }
            }) 
            res.redirect('/first');
}

)



var createdetail;

app.post('/create',urlencoded,(req,res)=>
{
    var newlist=[];
    var newid="";
    console.log(req);
    var alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var letter=alphabet.split("");
    for(let a=0;a<6;a++)
    {
        if(a<=1)
        {
            newid+=letter[Math.floor(Math.random()*letter.length)]
        }
        else
        {
            newid+=Math.floor(Math.random()*9);
        }
    }
    console.log(newid);

// console.log(req.body.createdate);
let d=new Date(req.body.createdate);
   let date=d.getDate()+Number(req.body.paydate);
   d.setMonth(d.getMonth()+1);
   d.setDate(date);
  let payment=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
console.log(payment);
console.log(req.body.fstreet,req.body.fcity,req.body.fpostcode,req.body.fcountry);
console.log(req.body.tstreet,req.body.tcity,req.body.tpostcode,req.body.tcountry);

let listname=[req.body.newname];
if(listname.flat().length>1)
{
for(let q=0;q<req.body.newname.length;q++)
{
 newlist.push({
     "name": req.body.newname[q],
     "quantity": Number(req.body.newqty[q]),
     "price": Number(req.body.newprice[q]),
     "total": Number(req.body.newqty[q])*Number(req.body.newprice[q])
     
 })
 calctotal+=Number(req.body.newqty[q])*Number(req.body.newprice[q])
}
}
else
{
 let listname=[req.body.newname];
let listqty=[req.body.newqty];
let listprice=[req.body.newprice]
for(let q=0;q<listname.length;q++)
{
 newlist.push({
     "name": listname[q],
     "quantity": Number(listqty[q]),
     "price": Number(listprice[q]),
     "total": Number(listqty[q])*Number(listprice[q])
     
 })
 calctotal+=Number(listqty[q])*Number(listprice[q])
}
}
// console.log(newlist);
// console.log(calctotal);
console.log(req.body.newstatus);
if(req.body.newstatus == "Save as Draft")
{
    req.body.newstatus="draft";
}
else{
    req.body.newstatus="pending";
}


     createdetail=
     {
        "id":newid,
        "createdAt":(req.body.createdate).toString(),
        "paymentDue":payment,
        "description":req.body.newdesc,
        "paymentTerms":Number(req.body.paydate),
        "clientName":req.body.newclient,
        "clientEmail":req.body.newemail,
        "status":req.body.newstatus,
        "senderAddress":JSON.stringify(
            {
                "street": req.body.fstreet,
                 "city": req.body.fcity,
                 "postCode": req.body.fpostcode,
                 "country":req.body.fcountry
            }
        ),
        "clientAddress":JSON.stringify(
            {
                "street": req.body.tstreet,
                 "city": req.body.tcity,
                 "postCode": req.body.tpostcode,
                 "country":req.body.tcountry
            }
        ),
        "items":JSON.stringify(newlist),
        "total":Number(calctotal)
     }
    
    var creating="INSERT INTO `Invoicedetail`(`id`, `createdat`, `paymentDue`, `description`, `paymentTerms`, `clientName`, `clientEmail`, `status`, `senderAddress`, `clientAddress`, `items`, `total`) VALUES ('"+createdetail.id+"','"+createdetail.createdAt+"','"+createdetail.paymentDue+"','"+createdetail.description+"','"+createdetail.paymentTerms+"','"+createdetail.clientName+"','"+createdetail.clientEmail+"','"+createdetail.status+"','"+createdetail.senderAddress+"','"+createdetail.clientAddress+"','"+createdetail.items+"','"+createdetail.total+"')"

    data.query(creating,(err,result)=>
            {
                if(err)
                {
                   console.log('error:' + err);
                }
                else
                {
                   console.log(result);
                 
                }

            })
            res.redirect("/first");
}
)
data.connect((err)=>
    {
        if(err)
        {
            console.log(error);
        }
        else
        {
           
            let send="select * from Invoicedetail";
            data.query(send,(err,result)=>
            {
                if(err)
                {
                   console.log('error:' + err);
                }
                else
                {
                   dat=result;
                //  console.log(dat);
                }

            })
            
        }
    })
app.listen(port,()=>console.log("I am listen"));


