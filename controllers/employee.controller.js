const EmployeeModel = require('../models/employee.modal');

exports.createEmployee = async (req, res) => {
  const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(req.body);
  if (!validateEmailRegex.test(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email.' });
  }
  
  const getManager = await EmployeeModel.findOne({ _id: req.body.manager_id });
  if (!getManager) {
    return res.status(400).json({ message: 'Manager not found.' });
  }

  const checkJoinedAt = new Date(req.body.joined_at);
  const checkCurrentDate = new Date();
  if (checkJoinedAt > checkCurrentDate) {
    return res.status(400).json({ message: 'Joined at must be less than current date.' });
  }

  const employeeData = {
    name: req.body.name,
    title: req.body.title,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    joined_at: req.body.joined_at,
    salary: req.body.salary,
    department: req.body.department,
    manager_id: req.body.manager_id
  }

  const employee = await EmployeeModel.create(employeeData);

  return res.json({
    data: employee,
    message: 'Employee created successfully.'
  });
}
