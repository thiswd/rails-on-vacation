class PaginatedEmployeesService
  attr_reader :page, :per_page

  def initialize(page, per_page)
    @page = page
    @per_page = per_page
  end

  def to_json
    {
      current_page: page,
      total_pages: total_pages,
      total: total,
      employees: employees
    }
  end

  private

  def employees
    offset = (page - 1) * per_page
    Employee.order(:name).limit(per_page).offset(offset)
  end

  def total
    @total ||= Employee.count
  end

  def total_pages
    (total / per_page.to_f).ceil
  end
end
