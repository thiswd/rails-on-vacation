class Api::V1::EmployeesController < ApplicationController
  before_action :set_employee, only: %i[show update destroy]

  def index
    page = params[:page].to_i
    per_page = params[:per_page].to_i

    employees = PaginatedEmployeesService.new(page, per_page)

    render json: employees.to_json
  end

  def show
    employee_data = EmployeeService.new(@employee, ComputeVacationsService)

    render json: employee_data.to_json
  end

  def create
    @employee = Employee.new(employee_params)

    if @employee.save
      render json: @employee, status: :created
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
      params.require(:employee).permit(:name, :role, :hiring_date)
    end
end
