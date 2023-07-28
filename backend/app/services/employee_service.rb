class EmployeeService
  attr_reader :employee

  def initialize(employee, compute_class = ComputeVacationsService)
    @employee = employee
    @compute_class = compute_class
  end

  def to_json
    employee.attributes.merge(
      vacations: @employee.vacations,
      remaining_vacation_days: remaining_vacation_days
    )
  end

  private

  def remaining_vacation_days
    @compute_class.new(employee).remaining_vacation_days
  end
end
