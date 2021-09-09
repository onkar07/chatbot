import React, {useState, useRef} from 'react'
import { useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios'
import style from './css/style.module.css'
function Chatui() {
    
    const [storage, setStorage] = useState("")
    const [userMsg, setuserMsg] = useState();
    const [chat_data, setData] = useState([])
    const quo = useRef(null);
    const messagesEndRef = useRef(null)
    var count = 0;
    const scrollToBottom = () => {
        window.scrollTo({ 
            top: document.documentElement.scrollHeight, 
            behavior: 'auto'
          }); 
    }
    // window.addEventListener('scroll', get_data); 
    function get_data(){
        var url = quo.current.value;
        chat_data.push(url);
        var url_string =  "http://127.0.0.1:5000/?page="+url;
        axios.get(url_string)
        .then(response => chat_data.push(response.data));
        setuserMsg(null);
    }
    useEffect(()=>{
        scrollToBottom()
    },[])
    console.log("data: ",chat_data)
    return(
        <ScrollToBottom>
        <div className={style.mainChat}>
            <div className={style.menuBar}>
               <h3>Welcome to Shivaji University</h3>
               <h5>Welcome to shivaji university Chatbot Section <br /> This is prototype of real chatbot</h5>
           </div>
        
        <div className={style.chatbotBox}>
            
            {
                chat_data.map(function(msg_data, index){
                    console.log(msg_data)
                    console.log(msg_data,index)
                    if(index%2==0){
                                count++
                                return(
                                    <div className={style.user_right}>
                                        <h6>{msg_data}</h6>
                                    </div>
                                )
                            }
                            else{
                                count++
                                return(
                                    <div className={style.bot_left}  ref={messagesEndRef}>
                                        <h6>{msg_data}</h6>
                                    </div>
                                )
                            }
                })
            }


            <div className={style.operator}>
                <input type="text" ref={quo} onChange={(e) => {setStorage(e.target.value); scrollToBottom()}} value={userMsg} placeholder="ask me"/>
                <button onClick={get_data}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>
        </div>
        </div>
        </ScrollToBottom>
    )
    
}


export default Chatui