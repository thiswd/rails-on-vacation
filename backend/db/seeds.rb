require 'faker'

Employee.create!(
  name: Faker::Name.name,
  role: Faker::Job.title,
  hiring_date: Date.today
)

Employee.create!(
  name: Faker::Name.name,
  role: Faker::Job.title,
  hiring_date: Date.today - 6.months
)

Employee.create!(
  name: Faker::Name.name,
  role: Faker::Job.title,
  hiring_date: Date.today - 1.year
)

10.times do
  employee = Employee.create!(
    name: Faker::Name.name,
    role: Faker::Job.title,
    hiring_date: Faker::Date.between(from: 5.years.ago, to: Date.today - 1.year)
  )

  vacation_start = employee.hiring_date + 1.year + rand(1..30).days
  Vacation.create!(
    employee: employee,
    start_date: vacation_start,
    end_date: vacation_start + rand(10..30).days
  )

  # Férias adicionais, que podem ou não ser válidas
  rand(0..2).times do
    vacation_start = Faker::Date.between(from: 2.years.ago, to: Date.today + 1.year)
    Vacation.create(
      employee: employee,
      start_date: vacation_start,
      end_date: vacation_start + rand(10..30).days
    )
  end
end
