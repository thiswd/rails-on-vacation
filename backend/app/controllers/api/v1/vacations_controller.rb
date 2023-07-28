class Api::V1::VacationsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  before_action :set_vacation, only: %i[show update destroy]

  def index
    @vacations = Vacation.all

    render json: @vacations
  end

  def show
    render json: @vacation
  end

  def create
    @vacation = Vacation.new(vacation_params)

    if @vacation.save
      render json: @vacation, status: :created
    else
      render json: error_messages, status: :unprocessable_entity
    end
  end

  def update
    if @vacation.update(vacation_params)
      render json: @vacation
    else
      render json: error_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @vacation.destroy
  end

  private

    def set_vacation
      @vacation = Vacation.find(params[:id])
    end

    def set_employee
      @employee = Employee.find(params[:employee_id])
    end

    def vacation_params
      params.require(:vacation).permit(:start_date, :end_date, :employee_id)
    end

    def record_not_found
      render json: { errors: ['Record not found'] }, status: :not_found
    end

    def error_messages
      { errors: @vacation.errors.full_messages }
    end
end
