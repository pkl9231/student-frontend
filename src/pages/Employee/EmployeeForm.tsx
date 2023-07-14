import { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { UseForm, Form } from '../../components/UseForm';
import * as employeeService from "../../service/employeeService";


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    name: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    className: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm(props: any) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues: any = values) => {
        let temp: any = { ...errors }
        if ('name' in fieldValues)
            temp.fullName = fieldValues?.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues?.mobile?.length > 9 ? "" : "Minimum 10 numbers required."
        if ('className' in fieldValues)
            temp.departmentId = fieldValues?.departmentId?.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = UseForm(initialFValues, true, validate);

    console.log("getting values", values);

    const handleSubmit = (e:any) => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Full Name"
                        value={values?.name}
                        onChange={handleInputChange}
                        // error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values?.email}
                        onChange={handleInputChange}
                        // error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values?.mobile}
                        onChange={handleInputChange}
                        // error={errors.mobile}
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values?.city}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values?.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="className"
                        label="Department"
                        value={values?.className}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        // error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values?.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values?.isPermanent}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
