const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false
    },
    joined_at: {
      type: Date,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    manager_id: {
      type: String,
      required: false
    }
  }
);

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
