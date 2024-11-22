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

    cursor.execute("TRUNCATE TABLE inventory, employees, food_ingredients;")
    cursor.execute("TRUNCATE TABLE orders;")
    cursor.execute("TRUNCATE TABLE food, meal_options;")
    cursor.execute("TRUNCATE TABLE entree, side, menu, appetizer, drink, combo")

    connection.commit()

    connection.close()

except Exception as e:
    print(f"Error connecting to the database: {e}")

