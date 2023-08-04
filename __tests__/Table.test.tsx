
import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../src/component/Table';
import '@testing-library/jest-dom/extend-expect'

const columns = [
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


const data = [
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
];

test('renders table with data', () => {
  
  render(<Table columns={columns} data={data} setData={jest.fn()} />);

  
  expect(screen.getByText('First Name')).toBeInTheDocument();
  expect(screen.getByText('Last Name')).toBeInTheDocument();
  expect(screen.getByText('Gender')).toBeInTheDocument();


  const searchInput = screen.getByPlaceholderText('Search...');
  fireEvent.change(searchInput, { target: { value: 'John' } });
  expect(screen.getByText('John')).toBeVisible();
  expect(screen.queryByText('Jane Smith')).toBeNull();

});

test('renders table with data and allows deletion', () => {
  const setDataMock = jest.fn(); 

  render(<Table columns={columns} data={data} setData={setDataMock} />);

  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();

  const deleteCheckbox = screen.getByTestId('delete-checkbox-0');

  fireEvent.click(deleteCheckbox);

  expect(deleteCheckbox).toBeChecked();

  const deleteButton = screen.getByTestId('delete-button');


  fireEvent.click(deleteButton);
  expect(setDataMock).toHaveBeenCalledTimes(1);
  expect(setDataMock).toHaveBeenCalledWith([
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
  ]);

  expect(screen.getByText('Jane')).toBeInTheDocument();

});
