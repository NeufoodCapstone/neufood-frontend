import React, { useState } from 'react';
import './userGuide.css';
import logo from "./logo-no-text.png";

const Section = ({ title, content, imageSrc }) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="section-content">
        <ul className="bullet-list">
          {content.split('\n').map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {imageSrc && <img src={imageSrc} alt={`Section ${title}`} />}
      </div>
    </div>
  );

  const UserGuide = () => {
    return (
    <div className='userguide-page'>
      <div className="user-guide-container">
        <div className="header-container">
          <div className="logo-title-container">
            <img className="img-logo-position" src={logo} alt="Logo" />
            <h1>User Guide</h1>
          </div>
        </div>

        <hr className="divider" />

        <Section
          title="Create an Account"
          content="You can use an existing Google Account so create a Neufood account, or sign up with Neufood with any valid email of your choice"
        //   imageSrc="" -- here for future use
         
        />
        <br></br>
        <hr />
        <Section
          title="Adding a Pantry "
          content={`Navigate to the ‘Pantry’ Tab
          Click ‘Add Pantry’
          Fill out Name and Collaborators
          Collaborators is anyone you wish to share your pantry with, enter a valid email and an invitation will be sent to their inbox
          Once completed, click ‘Save’ and you have your first pantry`}
        //   iimageSrc="" -- here for future use
        />
        <br></br>
        <hr />

        <Section
          title="Adding a Friend"
          content={`Navigate to the ‘Profile’ Tab
          Scroll down to see the section named ‘Friends’
          Click the ‘+’ to enter a valid email, this will be sent to your friends inbox
          Once they have accepted your invitation to Neufood, they will appear in your ‘Friends’ section in your profile
          A collaborator will not show up in your ‘Friends’ section on your profile unless you send them a friend invite`}
        //   imageSrc="" -- here for future use
        />

        <br></br>
        <hr />

        <Section
          title="Adding an Ingredient"
          content={`Navigate to the ‘Ingredients’ Tab
          Make sure you are under the right Pantry
          If you are in a different pantry, scroll to the right or left until you are in your desired pantry
          Click ‘Add Ingredients’
          It will prompt you to add: Name, Price, Quantity, and a drop down menu for Category
          Categories have defaulted expiration dates and images
          Click ‘Add’ and it will be added to your Ingredient list!`}
        //   imageSrc="" -- here for future use
         
        />
        <br></br>
        <hr />

        <Section
          title="Using an Ingredient"
          content={`Actions on Ingredient Card: Like, Use, Delete
          Use: will decrease the quantity number of the ingredient
          Delete: will delete the ingredient from your pantry
          Get Info (icon in the right hand corner of each card): Click the Info icon and it will flip the card over to see more information about the ingredient. Information such as Add Date (when ingredient entered into the system), Expiration Date (predicted from our database), Quantity (how many of the item you have), Owner, and Price
          If you want to change any of the info of the Ingredient, click ‘Edit’ and make your changes. Don’t forget to save!`}
        //  imageSrc="" -- here for future use
         
        />
      <br></br>

      <p >Still stuck? Help is a mail away!</p>
   
     <a href="mailto:neufoodcapstone@gmail.com">
        <button class="help-btn">Send a Message</button> 
      </a>

      </div>
      </div>
    );
  };
  
  export default UserGuide;