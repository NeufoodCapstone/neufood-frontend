// import React from "react";

// import logo from "./logo-transparent.png";

// import Container from "react-bootstrap/Container";
// import BouncingArrow from "../components/BouncingArrow";
// import "./about.css";
// import account from "../imgs/about/account.png";
// import network from "../imgs/about/network.png";
// import recipe from "../imgs/about/recipe.png";
// import time from "../imgs/about/time.png";

// import { Link, animateScroll as scroll } from 'react-scroll';




// const FAQ = () => {
//   const scrollToTop = () => {
//     scroll.scrollToTop();
//   };



//       return (
//         <div className="faq-item">
//           <div className={`faq-question ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
//             {question}
//           </div>
//           {isOpen && <div className="faq-answer">{answer}</div>}
//         </div>
//       );
//     };
    
//     const FAQPage = () => {
//       const faqData = [
//         { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
//         { question: 'How to install React?', answer: 'You can install React using npm or yarn.' },
//         // Add more FAQ items as needed
//       ];
    
//       return (
//         <div className="faq-page">
//           <h1>Frequently Asked Questions</h1>
//           {faqData.map((faq, index) => (
//             <FAQItem key={index} question={faq.question} answer={faq.answer} />
//           ))}
//         </div>
//       );
//     };
  

// export default FAQ;

// import React, { useState } from 'react';

// const FAQItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="faq-item">
//       <div className={`faq-question ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
//         {question}
//       </div>
//       {isOpen && <div className="faq-answer">{answer}</div>}
//     </div>
//   );
// };

// const FAQ = () => {
//   const faqData = [
//     { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
//     { question: 'How to install React?', answer: 'You can install React using npm or yarn.' },
//     // Add more FAQ items as needed
//   ];

//   return (
//     <div className="faq-page">
//       <h1>Frequently Asked Questions</h1>
//       {faqData.map((faq, index) => (
//         <FAQItem key={index} question={faq.question} answer={faq.answer} />
//       ))}
//     </div>
//   );
// };

// export default FAQ;

import React, { useState } from 'react';
import './faq.css'; // Import the stylesheet

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={toggleAccordion}>
        <div className="question-text">{question}</div>
        <div className={`icon ${isOpen ? 'minus' : 'plus'}`}></div>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    { question: 'What is Neufood’s purpose?', answer: 'Neufood is focused on minimizing food waste by offering a visual way to track ingredients and their expiration dates in your pantry. ' },
    { question: 'Who is Neufood for?', answer: 'Neufood is for anyone who wants to make a difference by reducing their food waste! We are focused on younger adults who live in shared households, as we believe our collaborative features are very beneficial. ' },
    { question: 'How do I set expiration dates for my ingredients?', answer: 'Upon selecting an ingredient category it is assigned an estimated expiration date. You can adjust these by editing the date on the Ingredient card itself.'}, 
   {question: 'What is a pantry?' , answer: 'Pantries provide users a way to collaborate with their friends/roommates by allowing ingredients and their information to be shared. Simply create a pantry, add your friends, add your ingredients, and you’re set!   '},
   {question: 'How do I add a friend on Neufood? ' , answer: 'Navigate Profile > Friends and click the + button. Then, type in the email associated with your friend’s Neufood account and send your request.'},
   
    // Add more FAQ items as needed
  ];

  return (
    <div className='faq-bg'>
    <div className="faq-page">
        <br></br>
      <h1>Neufood FAQ's</h1>
      <br></br>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
      <br></br>
      <br></br>
      <p >Still stuck? Help is a mail away!</p>
   
    <button class="faq-btn">Send a Message</button> 
       
    </div>
    </div>
  );
};

export default FAQ;