class ComputeVacationsService
  attr_reader :employee, :vacations

  VACATION_DAYS = 30.freeze

  def initialize(employee)
    @employee = employee
    @vacations = employee.vacations
  end

  def remaining_vacation_days
    return unless first_year_completed?
    all_vacation_days_amount - taken_vacation_days
  end

  private

  def first_year_completed?
    first_year_completed_date <= Date.today
  end

  def first_year_completed_date
    (employee.hiring_date + 1.year).end_of_day
  end

  def all_vacation_days_amount
    employee.whole_vacations_amount * VACATION_DAYS
  end

  def taken_vacation_days
    vacations.sum { |vacation| vacation.days_amount }.to_i
  end

end
