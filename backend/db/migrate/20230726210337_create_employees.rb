class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :role
      t.date :hiring_date

      t.timestamps
    end
  end
end
