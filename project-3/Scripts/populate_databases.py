import psycopg2
from getpass import getpass

pwd = getpass("Enter database password: ")


try:
    connection = psycopg2.connect(
    host="csce-315-db.engr.tamu.edu",
    database="team_5c_db",
    user="team_5c",
    password=pwd
    )

    cursor = connection.cursor()

    employees_path = "CSVs/employees.csv"
    with open(employees_path, "r") as employees:
        cursor.copy_expert(f"COPY employees FROM STDIN WITH CSV", employees)

    '''ingredients_path = "CSVs/ingredients.csv"
    with open(ingredients_path, "r") as ingredients:
        cursor.copy_expert(f"COPY inventory FROM STDIN WITH CSV", ingredients)'''

    food_ingredients_path = "CSVs/food_ingredients.csv"
    with open(food_ingredients_path, "r") as food_ingredients:
        cursor.copy_expert(f"COPY food_ingredients FROM STDIN WITH CSV", food_ingredients)

    orders_path = "CSVs/orders.csv"
    with open(orders_path, "r") as orders:
        cursor.copy_expert(f"COPY orders FROM STDIN WITH CSV", orders)

    meal_options_path = "CSVs/meal_option.csv"
    with open(meal_options_path, "r") as meal_options:
        cursor.copy_expert(f"COPY meal_options FROM STDIN WITH CSV", meal_options)

    food_path = "CSVs/food.csv"
    with open(food_path, "r") as food:
        cursor.copy_expert(f"COPY food FROM STDIN WITH CSV", food)

    inventory_path = "CSVs/Inventory.csv"    
    with open(inventory_path, "r") as inventory:
        cursor.copy_expert(f"COPY inventory FROM STDIN WITH CSV", inventory)
    
    entree_path = "CSVs/Entree.csv"
    with open(entree_path, "r") as entree:
        cursor.copy_expert(f"COPY entree FROM STDIN WITH CSV", entree)
        
    side_path = "CSVs/Side.csv"
    with open(side_path, "r") as side:
        cursor.copy_expert(f"COPY side FROM STDIN WITH CSV", side)
        
    menu_path = "CSVs/Menu.csv"
    with open(menu_path, "r") as menu:
        cursor.copy_expert(f"COPY menu FROM STDIN WITH CSV", menu)
        
    appetizer_path = "CSVs/Appetizer.csv"
    with open(appetizer_path, "r") as appetizer:
        cursor.copy_expert(f"COPY appetizer FROM STDIN WITH CSV", appetizer)
    
    drink_path = "CSVs/Drink.csv"
    with open(drink_path, "r") as drink:
        cursor.copy_expert(f"COPY drink FROM STDIN WITH CSV", drink)
    
    combo_path = "CSVs/Combo.csv"
    with open(combo_path, "r") as combo:
        cursor.copy_expert(f"COPY combo FROM STDIN WITH CSV", combo)
    
    connection.commit()

    connection.close()

except Exception as e:
    print(f"Error connecting to the database: {e}")

