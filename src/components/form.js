import React, { useState, } from 'react';
import './form.css'

const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setValues({
            ...values,
            [name]: newValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form data:', values);
            alert(`Form submitted successfully!\n${JSON.stringify(values, null, 2)}`);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

const validate = (values) => {
    let errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.age) {
        errors.age = 'Age is required';
    } else if (values.age <= 0) {
        errors.age = 'Age must be greater than 0';
    }
    if (values.attendingWithGuest && !values.guestName) {
        errors.guestName = 'Guest Name is required';
    }
    return errors;
};

const EventRegistrationForm = () => {
    const initialValues = {
        name: '',
        email: '',
        age: '',
        attendingWithGuest: false,
        guestName: '',
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);

    return (
        <div className="container">
            <h2>Event Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                    />
                    {errors.age && <p className="error">{errors.age}</p>}
                </div>
                <div>
                    <label>Are you attending with a guest?</label>
                    <input
                        type="checkbox"
                        name="attendingWithGuest"
                        checked={values.attendingWithGuest}
                        onChange={handleChange}
                    />
                </div>
                {values.attendingWithGuest && (
                    <div>
                        <label>Guest Name:</label>
                        <input
                            type="text"
                            name="guestName"
                            value={values.guestName}
                            onChange={handleChange}
                        />
                        {errors.guestName && <p className="error">{errors.guestName}</p>}
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;
