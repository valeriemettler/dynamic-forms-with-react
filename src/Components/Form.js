import React, {useState} from 'react';

const formFieldsData = [ 
  {
    "tag": "input",
    "name": "first_name",
    "type": "text",
    "human_label": "First Name"
  }, {
    "tag": "input",
    "name": "last_name",
    "type": "text",
    "human_label": "Last Name"
  }, {
    "tag": "input",
    "name": "email",
    "type": "email",
    "human_label": "Email Address"
  }, {
    "tag": "input",
    "name": "phone_number",
    "type": "text",
    "human_label": "Phone Number"
  }, {
    "tag": "input",
    "name": "job_title",
    "type": "text",
    "human_label": "Job Title"
  }, {
    "tag": "input",
    "name": "date_of_birth",
    "type": "date",
    "human_label": "Date of Birth"
  }, {
    "tag": "input",
    "name": "parental_consent",
    "type": "checkbox",
    "human_label": "Parental Consent",
    "conditional": {
      "name": "date_of_birth",
      "show_if": (value) => {
        const now = new Date();
        return value >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
      }
    }
  }
];

const createInitialState = () => {
  const initialState = {};
  formFieldsData.find(item=> {
    initialState[item.name] = '';
  })
  return initialState;
};

const onSubmitHandler = e => {
  e.preventDefault();
  console.log('Submitted Form Data:');
}

const Form = () => {
  const [formState, setFormState] = useState(createInitialState());

  return (
  <form onSubmit={onSubmitHandler}>
    <h1>Create Your Account</h1>
    <button className="btn" type="submit">Create My Account</button>
  </form>
  );
};

export default Form;