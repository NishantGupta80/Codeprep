import React from 'react'
const Contact = () => {
    return (
      <>
    {/*Contactuss Form*/}
    <div className="contact_form">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg--1">
            <div class="contact_form_container py-5">
            <div className="Contact_from_title">
              conatct us </div>
           <form id="contact_form">
        <div classsName="contact_from_name d-flex justify-content-between align-items-between">
          <input type="text" id="contact_form_name" className="contact_form_name input_field" placeholder="Your name" required="true"/>
          <input type="email" id="contact_form_email" className="contact_form_email input_field" placeholder="Your email" required="true"/>
          <input type="number" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Your Phone " required="true"/>

        </div>
        <div className="contact_form_text mt-4">
          <textarea className="text_field contact_form_message" placeholder="Message" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="contact_form_button">
          <button type="submit" className="button contact_submit_button">Send Message</button>
        </div>
           </form>
            </div>
          </div>
        </div>
      </div>
    </div>
     </>
    )
  }
  
  export default Contact;