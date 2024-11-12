import pyodbc
import pymysql
import pandas as pd

# SQL Server connection details
sql_server_conn = pyodbc.connect(
    'DRIVER={SQL Server};'
    'SERVER=DESKTOP-DCKAERC;'
    'DATABASE=tlc;'          # Your SQL Server database name
    'UID=sa;'
    'PWD=123456;'
)
print("Connected to SQL Server successfully.")

# MySQL (XAMPP) connection details
mysql_conn = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='samba'          # Your MySQL database name
)
print("Connected to MySQL successfully.")

# Mapping SQL Server data types to MySQL data types
data_type_mapping = {
    'int': 'INT',
    'bigint': 'BIGINT',
    'smallint': 'SMALLINT',
    'tinyint': 'TINYINT',
    'decimal': 'DECIMAL(10,2)',
    'numeric': 'DECIMAL(10,2)',
    'float': 'FLOAT',
    'real': 'DOUBLE',
    'bit': 'BOOLEAN',
    'varchar': 'VARCHAR(255)',
    'nvarchar': 'VARCHAR(255)',
    'text': 'TEXT',
    'ntext': 'TEXT',
    'date': 'DATE',
    'datetime': 'DATETIME',
    'smalldatetime': 'DATETIME',
    'time': 'TIME',
}

# Function to fetch all table names from SQL Server
def fetch_sql_server_tables():
    query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"
    sql_cursor = sql_server_conn.cursor()
    sql_cursor.execute(query)
    tables = [row[0] for row in sql_cursor.fetchall()]
    return tables

# Function to fetch columns and their data types for a table
def fetch_columns_and_types(table_name):
    query = f"SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{table_name}'"
    sql_cursor = sql_server_conn.cursor()
    sql_cursor.execute(query)
    columns = sql_cursor.fetchall()
    column_definitions = []

    for column_name, data_type in columns:
        # Map SQL Server data type to MySQL data type
        mysql_data_type = data_type_mapping.get(data_type, 'TEXT')  # Default to TEXT if type is unknown
        column_definitions.append(f"`{column_name}` {mysql_data_type}")

    return ", ".join(column_definitions)

# Function to transfer a table from SQL Server to MySQL
def transfer_table(table_name):
    # Fetch data from SQL Server table
    sql_query = f"SELECT * FROM {table_name}"
    data = pd.read_sql(sql_query, sql_server_conn)
    
    # Create table in MySQL if not exists
    with mysql_conn.cursor() as mysql_cursor:
        # Generate MySQL table schema based on SQL Server table's schema
        columns_with_types = fetch_columns_and_types(table_name)
        create_table_query = f"CREATE TABLE IF NOT EXISTS `{table_name}` ({columns_with_types})"
        mysql_cursor.execute(create_table_query)
        
        # Insert data into MySQL
        for _, row in data.iterrows():
            placeholders = ", ".join(["%s"] * len(row))
            insert_query = f"INSERT INTO `{table_name}` VALUES ({placeholders})"
            mysql_cursor.execute(insert_query, tuple(row))
        
        mysql_conn.commit()  # Commit after each table

    print(f"Transferred table: {table_name}")

# Main process
try:
    tables = fetch_sql_server_tables()
    for table in tables:
        transfer_table(table)
    print("All tables transferred successfully.")
except Exception as e:
    print(f"Error during transfer: {e}")
finally:
    sql_server_conn.close()
    mysql_conn.close()

