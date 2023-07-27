class Vacation < ApplicationRecord
  belongs_to :employee

  validates :start_date, :end_date, presence: true
  validate :vacation_duration, :vacation_overlap, :vacation_initial_period

  private

    def vacation_duration
      return if end_date.nil? || start_date.nil?

      message = "Período de férias não pode ser menor do que 10 dias."
      errors.add(:base, message) if (end_date - start_date).to_i < 10
    end

    def vacation_overlap
      return if employee.nil?

      message = "Funcionário já tem férias marcadas para o período indicado"
      overlaps = employee.vacations.where.not(id:).where("start_date <= ? AND end_date >= ?", end_date, start_date)
      errors.add(:base, message) if overlaps.exists?
    end

    def vacation_initial_period
      return if employee.nil? || start_date.nil?

      message = "Funcionário só poderá tirar férias um ano depois de sua contratação"
      errors.add(:base, message) if start_date < employee.hiring_date + 1.year
    end
end
