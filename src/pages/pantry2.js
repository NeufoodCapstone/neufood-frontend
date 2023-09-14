// import React from 'react';
// import axios from "axios";
// //import { useState } from 'react';
// import { useState,useEffect } from 'react';
// import signin_pic from './no_food.jpg';
// import Card from 'react-bootstrap/Card';
// import {Container} from "react-bootstrap"
// import Form from 'react-bootstrap/Form';
// import {
//     usePopupState,
//     bindTrigger, 
//     bindMenu,
// } from 'material-ui-popup-state/hooks'
// import Collapsible from 'react-collapsible';
// // Component.js
// import { config } from '../Constants';
// var url = config.url.API_HOME;
// console.log(url)

// function Pantry(){
//     //add images to card
//     const img = {
//         url:""
//     };
//     //adds date to card 
//     let today = new Date();
//     let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
//     console.log(date)
    
//     const axios = require('axios').default;
//     const state = {
//       button: 1,
//       id:1,
//     };
//     const user = localStorage.getItem('loginID');
//     const pantry_id = localStorage.getItem('pantry');
//     const[post, setPost] = useState([{id: 1, name: "", quantity: ""},]);
//     //const[post, setPost] = useState([]);
//     console.log(user)

    
//     const baseURL = url +  "/pantry/ingredients/" + pantry_id;
//     console.log(baseURL);
//     React.useEffect(() => {
//         axios.get(baseURL).then((response) => {
//           setPost(response.data);
//           console.log(response.data)
//         });
//         }, []);
    
//         console.log("post",post)
//         if (!post) return null;
//         const pantry = post

//         const onSubmit = e => {
//             e.preventDefault();
//             if (state.button === 1) {
//               const formData = new FormData(e.currentTarget);
//               const tempAn = []
//               for (let [key, value] of formData.entries()) {
//                 console.log(key, value);
//                 tempAn.push(value)
//               }
//               console.log("Edit clicked!");
//               console.log(state.id);
//               const testURL = url + '/ingredients/'+state.id+'/'+tempAn[0];
//               axios.put(testURL,'hellowolrd').then(function(response) {
//                 window.location.reload();
//                 console.log(response);
//               })
              
//               //this.props.nextStep();
//             }
//         };
    
//     return(
//         <div className="cards"
//         style={{        "background-color" :"rgb(255,255,243)"}}
//         >


//             {pantry.map(data => (



//                 <form className="App" onSubmit={onSubmit}>



// <Container style={{
//           'padding': '20px',
//           'display': 'flex',
//           'width': '100%',
//           'justify-content': 'center',
//     }}>

//     <Card style={{ width: '400', 'justify-content': 'center',
//     'align-content': 'center','flex-wrap': 'wrap','z-index': 0
//     }}>
      
//       <Card.Body>
//       <img src = {data.image==""?signin_pic:data.image} style = {{ "width": 240}}></img>
//       <div className="h5">{data.name}</div>
//                 <div className="h5">Owner: {data.owner}</div>
//                 <div style={{margin:20}}>
//             <div style = {{left:0}}>
//                 :
//                 </div>
//                 <div style = {{top:"73%",left:6,"position":"absolute"}}>
//                 Quantity:
//                 </div>
//                 <Form.Control type="text"name="member"
//                 style = {{"position":"absolute",left:"20%",top: "70%",width:180,margin:5}}placeholder={data.quantity} />  
//                 <button class="button-3"
//                 style = {{"position":"absolute",left:"75%",top: "70%",margin:5}}
//                         onClick={() => (state.button = 1,state.id = data._id)}
//                         type="submit"
//                         name="btn4"
//                         va lue="oh yes"
//                     > 
//                     Edit
//                     </button>
//                     </div>
//                 <div className="h5">Purchased Date: {date}</div>      
//       </Card.Body>
//     </Card>
//     </Container>

//             </form>
//             ))}
            
//         </div>
        
//     );
    
// }
// export default Pantry;

// /* 
// Resource: 
// https://mui.com/material-ui/react-card/ 
// https://stackoverflow.com/questions/50381466/reactjs-add-multiple-card-in-a-row 
// */


