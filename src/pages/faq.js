 
import React, { useState } from 'react';
import './faq.css'; // Import the stylesheet
import logo from "./logo-no-text.png";

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
      <div className="header-container">
        <div className="logo-title-container">
          <img className="img-logo-position" src={logo} alt="Logo" />
          <h1>Neufood FAQ's</h1>
        </div>
      </div>


      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
      <br></br>
      <br></br>

      <p >Still stuck? Help is a mail away!</p>
  
      <a href="mailto:neufoodcapstone@gmail.com">
        <button class="help-btn">Send a Message</button> 
      </a>
       
    </div>
    </div>
  );
};

export default FAQ;