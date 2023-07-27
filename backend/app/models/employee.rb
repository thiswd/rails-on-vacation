class Employee < ApplicationRecord
  has_many :vacations, dependent: :destroy

  validates :name, :role, :hiring_date, presence: true
end
