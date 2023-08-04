import React from "react";
import Table from "../component/Table";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import localforage from 'localforage';

interface Column {
  header: string;
  key: string;
}

interface DataEntry {
  [key: string]: string | number;
}
const Dashboard = () => {
  const navigate = useNavigate();
  const columns: Column[] = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Preferred Name', key: 'preferredName' },
    { header: 'Date of Birth', key: 'dob' },
    { header: 'Gender', key: 'gender' },
    { header: 'Marital Status', key: 'maritalStatus' },
    { header: 'Mobile Number', key: 'mobileNumber' },
    { header: 'Home E-mail', key: 'homeEmail' },
    { header: 'Office E-mail', key: 'officeEmail' },
    { header: 'Home Address', key: 'homeAddress' },
    { header: 'Office Address', key: 'officeAddress' },
  ];

  const initialData: DataEntry[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      preferredName: 'Johnny',
      dob: '1990-05-15',
      gender: 'Male',
      maritalStatus: 'Single',
      mobileNumber: '123-456-7890',
      homeEmail: 'john.doe@example.com',
      officeEmail: 'j.doe@example.com',
      homeAddress: '123 Main Street, City',
      officeAddress: '456 Business Avenue, Town',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      preferredName: 'Janie',
      dob: '1988-12-10',
      gender: 'Female',
      maritalStatus: 'Married',
      mobileNumber: '987-654-3210',
      homeEmail: 'jane.smith@example.com',
      officeEmail: 'j.smith@example.com',
      homeAddress: '789 Park Road, Village',
      officeAddress: '321 Corporate Lane, City',
    },
    {
      firstName: 'Mike',
      lastName: 'Johnson',
      preferredName: 'Mikey',
      dob: '1985-09-22',
      gender: 'Male',
      maritalStatus: 'Divorced',
      mobileNumber: '456-789-0123',
      homeEmail: 'mike.johnson@example.com',
      officeEmail: 'm.johnson@example.com',
      homeAddress: '567 Maple Street, Town',
      officeAddress: '444 Industrial Drive, City',
    },
    {
      firstName: 'John1',
      lastName: 'Doe',
      preferredName: 'Johnny',
      dob: '1990-05-15',
      gender: 'Male',
      maritalStatus: 'Single',
      mobileNumber: '123-456-7890',
      homeEmail: 'john.doe@example.com',
      officeEmail: 'j.doe@example.com',
      homeAddress: '123 Main Street, City',
      officeAddress: '456 Business Avenue, Town',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      preferredName: 'Janie',
      dob: '1988-12-10',
      gender: 'Female',
      maritalStatus: 'Married',
      mobileNumber: '987-654-3210',
      homeEmail: 'jane.smith@example.com',
      officeEmail: 'j.smith@example.com',
      homeAddress: '789 Park Road, Village',
      officeAddress: '321 Corporate Lane, City',
    },
    {
      firstName: 'Mike',
      lastName: 'Johnson',
      preferredName: 'Mikey',
      dob: '1985-09-22',
      gender: 'Male',
      maritalStatus: 'Divorced',
      mobileNumber: '456-789-0123',
      homeEmail: 'mike.johnson@example.com',
      officeEmail: 'm.johnson@example.com',
      homeAddress: '567 Maple Street, Town',
      officeAddress: '444 Industrial Drive, City',
    },
    {
      firstName: 'John2',
      lastName: 'Doe',
      preferredName: 'Johnny',
      dob: '1990-05-15',
      gender: 'Male',
      maritalStatus: 'Single',
      mobileNumber: '123-456-7890',
      homeEmail: 'john.doe@example.com',
      officeEmail: 'j.doe@example.com',
      homeAddress: '123 Main Street, City',
      officeAddress: '456 Business Avenue, Town',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      preferredName: 'Janie',
      dob: '1988-12-10',
      gender: 'Female',
      maritalStatus: 'Married',
      mobileNumber: '987-654-3210',
      homeEmail: 'jane.smith@example.com',
      officeEmail: 'j.smith@example.com',
      homeAddress: '789 Park Road, Village',
      officeAddress: '321 Corporate Lane, City',
    },
    {
      firstName: 'Mike',
      lastName: 'Johnson',
      preferredName: 'Mikey',
      dob: '1985-09-22',
      gender: 'Male',
      maritalStatus: 'Divorced',
      mobileNumber: '456-789-0123',
      homeEmail: 'mike.johnson@example.com',
      officeEmail: 'm.johnson@example.com',
      homeAddress: '567 Maple Street, Town',
      officeAddress: '444 Industrial Drive, City',
    },
  ];
  const [data, setData] = React.useState<DataEntry[]>(initialData);

  const handleLogout =  () => {
    console.log("TEST ")
    localforage.removeItem('authToken').then(() => {
      navigate("/");
    });
   
  };

  return (
      <>
        <Header onLogout={handleLogout} />
        <Table columns={columns} data={data} setData={setData} />
      </>
  )
};

export default Dashboard;
