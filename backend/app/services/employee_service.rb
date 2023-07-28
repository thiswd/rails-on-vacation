class EmployeeService
  attr_reader :employee, :compute_class

  def initialize(employee, compute_class = ComputeVacationsService)
    @employee = employee
    @compute_class = compute_class.new(employee)
  end

  def to_json
    employee.attributes.merge(
      vacations: vacations_with_days,
      remaining_days: remaining_days
    )
  end

  private

  def remaining_days
    compute_class.remaining_vacation_days
  end

  def vacations_with_days
    compute_class.vacations_with_days_amount
  end

end
