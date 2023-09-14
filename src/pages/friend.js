import React from 'react';
import axios from "axios";
import { useState } from 'react';
// Component.js
import { config } from '../Constants';
import Card from 'react-bootstrap/Card';
import {Row, Col, Container, Button} from "react-bootstrap"
import signin_pic from './sigin.png'
import './grid.css'
import { BsSearch,BsCheckCircleFill,BsXCircleFill,BsFillPersonFill,BsFillPersonPlusFill } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';

var url_deploy = config.url.API_HOME;
console.log(url_deploy)
function Friend() {
  const friendArray = [
    { name: 'Tom' },
    { name: 'Cool guy' },
    { name: 'Jake' },
    { name: 'Mom' },
    { name: 'Dad' },
    { name: 'Lover' }
  ];
  const state = {
    button: 1,
    id:1
  };
  const user_ = localStorage.getItem('loginID');
  console.log(user_)
  const[Post, setPost] = useState([]); // [{friends_list: []},]
  const[Host, setHost] = useState([]);
  const baseURL = url_deploy+"/user/friends/"+encodeURIComponent(user_).replace("%22",'').replace("%22",'');
  const reqURL = url_deploy+"/user/request/"+encodeURIComponent(user_).replace("%22",'').replace("%22",'');
  console.log(baseURL);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
    }, []);
    React.useEffect(() => {
      axios.get(reqURL).then((response) => {
        setHost(response.data);
      });
      }, []);
    const onSubmit = e => {
    e.preventDefault();
    if (state.button === 1) {
      const testURL = url_deploy + '/user/'+encodeURIComponent(user_).replace("%22",'').replace("%22",'')+'/'+state.id;
      axios.delete(testURL).then(function(response) {
        window.location.reload();
        console.log(response);
      })
    }
    if (state.button === 2) { // add friend and delete request
      const url_add = url_deploy + '/user/'+encodeURIComponent(user_).replace("%22",'').replace("%22",'')+'/'+state.id;
      const url_delete = url_deploy + '/user/request/'+encodeURIComponent(user_).replace("%22",'').replace("%22",'')+'/'+state.id;
      let promises = [];
      promises.push(axios.post(url_add).then(function(response) {
        console.log("Post 1");
      }));
      promises.push(axios.put(url_add).then(function(response) {
        console.log("Put 1");
      }));
      promises.push(axios.delete(url_delete).then(function(response) {
        console.log("Delete 1");
      }));
      Promise.all(promises).then(function 
        (){
          window.location.reload();
        });
    }
    if (state.button === 3) { // ignore friend request
      const testURL = url_deploy + '/user/request/'+encodeURIComponent(user_).replace("%22",'').replace("%22",'')+'/'+state.id;
      axios.delete(testURL).then(function(response) {
        window.location.reload();
        console.log(response);
      })
    }
  };
  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    const temp = []
    for (let [key, value] of formData.entries()) {
        temp.push(value);
        console.log(key, value);
      }
    let url = url_deploy+"/user/request/"+encodeURIComponent(user_).replace("%22",'').replace("%22",'')+"/"+temp[0];
    //let url = url + "/user/"+encodeURIComponent(user_).replace("%22",'').replace("%22",'')+"/"+temp[0];
    const myInit = {
      method: 'POST',
      mode: 'no-cors',
          credentials: 'include',
          body: 'null',
          headers: {
            'Content-Type': 'application/json',
          },
    };
    const myRequest = new Request(url, myInit);
    fetch(myRequest).then(function(response) {
      return response;
    }).then(function(response) {
      window.location.reload();
      console.log(response);
    }).catch(function(e){
      console.log(e);
    });
  };

  return (
    <div style={{"background-color" :"rgb(255,255,243)"}}>

    <Container style={{
          'padding': '20px',
          'display': 'flex',
          'width': '100%',
          'justify-content': 'center',
          
    }}>

    <Card style={{ width: '28rem', 'justify-content': 'center',
    'align-content': 'center','flex-wrap': 'wrap','z-index': 0,"background-color":"#f8f9fb"
    ,"border":"1px solid blue"}}>
      <Card.Body class="grandparent">
      <div style={{ margin:10,height:25
    }}>
      <form onSubmit={handleSubmit}>
        <div  style={{left:"20%",position: "absolute","font-size":20}}>
        Add friend
        </div>
      <Form.Control type="text" name="name" placeholder="Add by email" style={{
        right: "20%",margin:5,width:150,position: "absolute",top:"0%"}} /> 
    <button type="submit" style = {{left:"80%",top:"13%",position: "absolute",
      outline: 'none',border :0,"background-color":"transparent"}}> 
    <BsFillPersonPlusFill style={{left:"50%",top:"13%",position: "absolute"}}/>
    </button>
    </form>
    </div>
  <div class="parent">
    <div class="child">
    <p class = "button-3" style = {{top:"5%"}}>Friend List</p>
    {Post.map(data => (
        <p>
          <form className="App" onSubmit={onSubmit} >
          {console.log(data)}
          <BsFillPersonFill/>
          {data.name.split(" ")[0]}
            <button
                      style = {{
                        outline: 'none',border :0,"background-color":"transparent"}}
        onClick={() => ( state.button = 1,state.id = data.email)}
        type="submit"
        name="btn1"
        value="wow"
      >
        <BsXCircleFill/>
      </button>
      </form>
        </p>
      ))
      }
    </div>
    <div class="child">
    <p class = "button-3" style = {{margin:5}}>Request List</p>
      {Host.map(data => (
        <p>
          <form className="App" onSubmit={onSubmit} >
          <BsFillPersonFill/>
          {data.name.split(" ")[0]}
          <button
          style = {{
          outline: 'none',border :0,"background-color":"transparent"}}
            onClick={() => ( state.button = 2,state.id = data.email)}
            type="submit"
            name="btn1"
            value="wow"
          >
          <BsCheckCircleFill/>
        </button>
        <button
                  style = {{
                    outline: 'none',border :0,"background-color":"transparent"}}
            onClick={() => ( state.button = 3,state.id = data.email)}
            type="submit"
            name="btn1"
            value="wow"
          >
          <BsXCircleFill/>
        </button>
          </form>
        </p>
      ))}
    </div>
  </div>
      </Card.Body>
    </Card>
    </Container>
    </div>
  );
}
export default Friend;
