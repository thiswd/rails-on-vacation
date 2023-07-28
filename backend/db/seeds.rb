require 'faker'

20.times do
  employee = Employee.create(
    name: Faker::Name.name,
    role: Faker::Job.position,
    hiring_date: Faker::Date.between(from: '2019-01-01', to: '2022-12-31')
  )

  next if !employee.first_year_completed?

  years_of_service = employee.whole_vacations_amount

  years_of_service.times do |i|
    remaining_days = 30
    vacation_duration = [10, 15, 30].sample

    start_date = employee.hiring_date + i.years
    end_date = start_date + vacation_duration.days

    if (years_of_service == i + 1)
      Vacation.create(
        employee_id: employee.id,
        start_date: start_date,
        end_date: end_date
      )
    else
      (remaining_days / vacation_duration).times do |j|
        vacation = Vacation.new(
          employee_id: employee.id,
          start_date: start_date,
          end_date: end_date
        )

        unless vacation.save
          puts vacation.errors.full_messages.to_sentence
        end

        start_date = start_date + vacation_duration.days + ((j + 1 ) * 5).days
        end_date = start_date + vacation_duration.days
      end
    end
  end
end
