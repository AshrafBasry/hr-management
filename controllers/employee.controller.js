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

exports.getEmployees = async (req, res) => {
  const employees = await EmployeeModel.find({});

  employees.map((employee) => {
    if (employee.manager_id) {
      const manager = employees.find((item) => item._id.toString() === employee.manager_id.toString());
      employee.manager_name = manager.name;
    }
  });

  return res.json({ data: employees });
}

exports.getEmployeeWithId = async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);  
  if (!employee) {
    return res.status(400).json({ message: 'Employee not found.' });
  }

  if (employee.manager_id) {
    const manager = await EmployeeModel.findById(employee.manager_id);
    employee.manager_name = manager.name;
  }
  return res.json({ data: employee });
}

exports.updateEmployee = async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  if (!employee) {
    return res.status(400).json({ message: 'Employee not found.' });
  }

  if (req.body.manager_id) {
    const getManager = await EmployeeModel.findOne({ _id: req.body.manager_id });
    if (!getManager) {
      return res.status(400).json({ message: 'Manager not found.' });
    }
  }

  EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, employee) => {
    if (err) {
      return res.status(400).json({ message: 'Something went wrong.' });
    }
    return res.json({ data: employee });
  });
}

exports.deleteEmployee = async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  if (!employee) {
    return res.status(400).json({ message: 'Employee not found.' });
  }

  EmployeeModel.findByIdAndDelete(req.params.id, (err, employee) => {
    if (err) {
      return res.status(400).json({ message: 'Something went wrong.' });
    }
    return res.json({ message: 'Employee deleted successfully.' });
  });
}
