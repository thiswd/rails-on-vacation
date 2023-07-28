class Api::V1::EmployeesController < ApplicationController
  before_action :set_employee, only: %i[show update destroy]

  def index
    @employees = Employee.includes(:vacations).all

    render json: @employees, include: :vacations
  end

  def show
    employee_data = EmployeeService.new(@employee, ComputeVacationsService)

    render json: employee_data.to_json
  end

  def create
    @employee = Employee.new(employee_params)

    if @employee.save
      render json: @employee, status: :created, location: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
  end

  private

    def set_employee
      @employee = Employee.includes(:vacations).find(params[:id])
    end

    def employee_params
      params.require(:employee).permit(:name, :position, :hiring_date)
    end
end
