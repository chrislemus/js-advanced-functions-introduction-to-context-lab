// Your code here
function createEmployeeRecord(employeeInfo) {
  const [firstName, familyName, title, payPerHour] = employeeInfo
  return {
    firstName,
    familyName, 
    title, 
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, clockIn) {
  const [date, hour] = clockIn.split(' ')
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    date,
    hour: parseInt(hour),
  })
  return employeeRecord
}
function createTimeOutEvent(employeeRecord, clockOut) {
  const [date, hour] = clockOut.split(' ')
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    date,
    hour: parseInt(hour),
  })
  return employeeRecord
}
function hoursWorkedOnDate(EmployeeRecord, dated) {
  const {timeInEvents, timeOutEvents} = EmployeeRecord
  const [clockIn, clockOut] = [timeInEvents, timeOutEvents].map(event => (event.find(({date}) => date == dated)).hour)
  return (clockOut - clockIn)/100
}

function wagesEarnedOnDate(cRecord, date) {
  return hoursWorkedOnDate(cRecord, date) * cRecord.payPerHour
}

function allWagesFor(cRecord) {
  return cRecord.timeInEvents.reduce((acc, {date}) => acc + wagesEarnedOnDate(cRecord, date), 0)
}

function calculatePayroll(employees) {
  return employees.reduce((acc, employee) => acc + allWagesFor(employee) , 0)
}

function findEmployeeByFirstName(employees, query) {
  return employees.find(({firstName}) => firstName === query)
}
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000]) 12 2
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// expect(hoursWorkedOnDate(cRecord, "0044-03-15")).to.equal(2)