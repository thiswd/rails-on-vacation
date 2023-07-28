class Employee < ApplicationRecord
  has_many :vacations, dependent: :destroy

  validates :name, :role, :hiring_date, presence: true

  def whole_vacations_amount
    today = Date.today
    (today.year - hiring_date.year) - (today.month <= hiring_date.month ? 0 : 1)
  end
end
