class Employee < ApplicationRecord
  has_many :vacations, dependent: :destroy

  validates :name, :role, :hiring_date, presence: true

  def first_year_completed?
    first_year_completed_date <= Date.today
  end

  def whole_vacations_amount
    today = Date.today
    (today.year - hiring_date.year) - (today.month <= hiring_date.month ? 0 : 1)
  end

  private

  def first_year_completed_date
    (hiring_date + 1.year).end_of_day
  end
end
