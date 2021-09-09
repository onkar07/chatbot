import React, {useState, useRef} from 'react'
import { useEffect } from 'react'
import style from './css/style.module.css'
function Chatbot() {
    const [userMsg, setuserMsg] = useState("")
    const [message, setmessage] = useState("")
    const [storage, setStorage] = useState("")
    useEffect(()=>{

    })
    const quo = useRef(null);
    const scrdiv = useRef(null);
    const currentB = useRef(null);

    var obj = require('./data.json')
    // var stopWords = require('./stopWords.json')
    
    var today = new Date();
    var sp;
    var count = 0;
    var esc;
    var date = today.getHours() + ':' + (today.getMinutes() + 1);
    function onSend(){
        
        var ini = quo.current;
        var inp = ini.value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
        
        let objLen = obj.length
        for (let i = 0; i < objLen; i++) {
            var len = (Object.entries(obj[i].patterns)).length;
            var word = (Object.entries(obj[i].patterns.slice()))
            for (let j = 0; j < len; j++) {
                esc = word[j][1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                let res = inp.toLowerCase().localeCompare(esc.toLocaleLowerCase());
                if (res == 0) {
                    let resp = Object.entries(obj[i].responses);
                    let count = Object.entries(obj[i].responses).length;
                    var rand = Math.floor(Math.random() * count);
                    setStorage(ini.value);
                    setmessage(resp[rand][1]);
                    setStorage(storage + "/" + message + "/" + inp);   
                    i = objLen + 1;  // this is for stopping the loop after finding the answer
                    setuserMsg("")
                    currentB.current.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    }
    
    // event Listner

    const changeBack = () =>{
        console.log(scrdiv.current.scrollTop)
        
    }
    
    sp = storage.split("/")
    sp = sp.filter(value=>{
        if(value == ""){
            return false
        }
        return true
    })

    let arr = [];
    const stopLen = Object.entries(obj).length;
    for(let i=0; i<stopLen; i++){
    arr.push(obj[i].patterns.toString())
    }

    function handleSearch(e){
        setuserMsg(e.target.value)
        // console.log(typeof(arr))
       

        // for(let i=0; i<arr.length; i++){
        //     if(arr[i].startsWith("H") == true){
        //       console.log(arr[i])
        //     }
        //   }
    }



    return (
        <div className={style.chatBox} ref={scrdiv} onScroll={changeBack}>
           <div className={style.menuBar}>
               <h3>Welcome to Shivaji University</h3>
               <h6>Welcome to shivaji university Chatbot Section <br /> This is prototype of real chatbot</h6>
           </div>
           <div className={style.downBar}></div>
           <div className={style.messageBox} >
           {   
               sp.map((msgo)=>{
                count++;
                   if(count%2==0){
                       return (
                           <div className={style.right}>
                               <h6 className={style.user}>{msgo}</h6>
                               <sub className={style.date}>{'\u00A0'}{'\u00A0'} {date} {'\u00A0'}{'\u00A0'}</sub>
                           </div>
                        
                       )
                   
                   }
                   else{
                       return(
                           <div className={style.left}>
                               <h6 className={style.bot} >{msgo}</h6>
                           </div>
                        
                       )
                    
                   }
               })
           }
           </div>
           
            
            
            {message != null? <h6 className={style.currentBot} ref={currentB}>{message}</h6>:<h5></h5>}
            <div className={style.operator}>
                <input type="text" ref={quo} value={userMsg} onChange={handleSearch} placeholder="ask me"/>
                <button onClick={onSend}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>
        </div>
    )
}

export default Chatbot



