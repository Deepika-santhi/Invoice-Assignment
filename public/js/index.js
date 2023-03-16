
function checking()
{
    let arr=[];
    let element=document.querySelectorAll(".check");
    let divelement=document.querySelectorAll(".stat");
    let val;
    for(let a=0;a<element.length;a++)
    {
        val=element[a].nextElementSibling.innerText.toLowerCase()
        if(element[a].checked)
        {
           
            console.log(val)
            arr.push(val);
            
        }
        else{
            if(arr.includes(val))
            {
            arr.splice(arr.indexOf(val),1);
            }
        }
    }
    console.log(arr);
    if(arr.length>=1)
    {
    
    for(let a=0;a<divelement.length;a++)

    {
        if(arr.includes(divelement[a].innerText))
        {
            
           divelement[a].parentNode.parentNode.style.display="block";
        }
        else{
            divelement[a].parentNode.parentNode.style.display="none";
        }
        
    }
    
}
else
{
    for(let a=0;a<divelement.length;a++)

    {
        divelement[a].parentNode.parentNode.style.display="block";
    }

}

    
}


   function back() {
    document.getElementById("second").style.display="block";
    document.getElementById("third").style.display="none";

   }

   function paid(personid)
   {
       fetch('profile',
       {method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
         },
       body: JSON.stringify({
        givenid:personid
       }),
       redirect:"follow"
        }).then(
           function(response)
           {
            window.location.reload();
            return response;
               
           }
       )
   }
   function deleting(personid)
   {
    
       fetch('/cancelling',
       {method: 'POST',
       headers: {
         'Content-Type': 'application/json;charset=utf-8'
         },
       body: JSON.stringify({
        giveid:personid
       }),
       redirect:"follow"
        }).then(
           function(response)
           {
            window.history.back();
            return response;
               
           }
       )
   }
   function discard()
   {
    document.getElementById("delmain").style.display="none";
   }


   function changetheme(ele)
   {
    let theme="dark";
    localStorage.setItem("Theme",theme);
    
   let imgpath=ele.getAttribute("src");
   console.log(imgpath);
    console.log(ele.src);
         if(imgpath=="images/icon-moon.svg")
         {
            ele.src="images/icon-sun.svg";
            $(document).ready(function(){
                $("#whole").toggleClass("theme1");
                $(".sidebig,.sidebottom,.sidemoon").toggleClass("theme2");
                $(".small,.viewtop,.viewbottom,.filterbox").toggleClass("theme3");
                $(".top,.bigbox").toggleClass("theme4");
                $(".filter,.count,.head,.ID,.date,.name,.rupee").toggleClass("theme5")
               
                $(".viewstatus,.desc,.add,.datenum,.commontext").toggleClass("theme6")
                $(".goback,.viewheading,.datenum,.info,h2").toggleClass("theme5")
                $(".orderbox,.cancelbut").toggleClass("theme7")
                $(".amountbox").toggleClass("theme8");
                $(".edit").toggleClass("theme9");
                $(".editmain").toggleClass("theme10");
                $("input,.editadd,.cancel,select,.delroot").toggleClass("theme11")
                $(".totalinp").toggleClass("theme12")
                $(".save,.sending").toggleClass("theme13")
                $(".billfrom").toggleClass("theme14")
                $(".bigbox,.whole").toggleClass("theme15")
                $(".newroot").toggleClass("theme16")
                $(".draft").toggleClass("theme17")
                 })
         }
         else{
            // window.location.reload();
            ele.src="images/icon-moon.svg";
            theme="light";
            localStorage.setItem("Theme",theme);

            $(document).ready(function(){
                $("#whole").toggleClass("theme1");
                $(".sidebig,.sidebottom,.sidemoon").toggleClass("theme2");
                $(".small,.viewtop,.viewbottom,.filterbox").toggleClass("theme3");
                $(".top,.bigbox").toggleClass("theme4");
                $(".filter,.count,.head,.ID,.date,.name,.rupee").toggleClass("theme5")
               
                $(".viewstatus,.desc,.add,.datenum,.commontext").toggleClass("theme6")
                $(".goback,.viewheading,.datenum,.info,h2").toggleClass("theme5")
                $(".orderbox,.cancelbut").toggleClass("theme7")
                $(".amountbox").toggleClass("theme8");
                $(".edit").toggleClass("theme9");
                $(".editmain").toggleClass("theme10");
                $("input,.editadd,.cancel,select,.delroot").toggleClass("theme11")
                $(".totalinp").toggleClass("theme12")
                $(".save,.sending").toggleClass("theme13")
                $(".billfrom").toggleClass("theme14")
                $(".bigbox,.whole").toggleClass("theme15")
                $(".newroot").toggleClass("theme16")
                $(".draft").toggleClass("theme17")
                 })
            
         }
    }