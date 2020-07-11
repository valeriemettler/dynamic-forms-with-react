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
    return initialState[item.name] = '';
  })
  return initialState;
};


const Form = () => {
  const [formState, setFormState] = useState(createInitialState());

  const onChangeHandler = e => {
    const value = 
      e.target.type === 'checkbox'
        ? e.target.checked 
        : e.target.value;

    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log('Submitted Form Data:', formState);
  }

  const inputTemplate = (form) => {
    return (
      <div className={"form-control " + (form.conditional ? 'checkbox-container' : '')} key={form.name}>
        <label htmlFor={form.name}>{form.human_label}</label>
        <input 
          type={form.type}
          id={form.name} 
          name={form.name}
          onChange={onChangeHandler}
          value={formState.name}
          checked={formState.parental_consent}
        />
      </div>
    );
  } 

  const needParentalConsent = (form) => {
    const year = formState.date_of_birth.substr(0,4);
    const month = formState.date_of_birth.substr(5,2);
    const day = formState.date_of_birth.substr(8,2);
    const birthDate = new Date(year, month, day);
    return form.conditional.show_if(birthDate);
  }

  return (
  <form onSubmit={onSubmitHandler}>
    <h1>Create Your Account</h1>
    {formFieldsData.map(form => {
      if(!form.conditional){
        return inputTemplate(form);
      } else {
        if(formState.date_of_birth && needParentalConsent(form)){
          return inputTemplate(form)
        } else {
          return null;
        }
      }
    })}
    <button className="btn" type="submit">
      Create My Account
    </button>
    <p>Form State to Demo Code Behavior</p>
      <pre>{JSON.stringify({formState}, null, 4)}</pre>
  </form>
  );
};

export default Form;